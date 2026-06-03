import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

// simple in-memory rate limit (MVP)
const ipMap = new Map<string, { count: number; last: number }>();

function rateLimit(ip: string) {
  const now = Date.now();
  const windowMs = 60_000; // 1 min
  const limit = 5;

  const record = ipMap.get(ip);

  if (!record) {
    ipMap.set(ip, { count: 1, last: now });
    return true;
  }

  if (now - record.last > windowMs) {
    ipMap.set(ip, { count: 1, last: now });
    return true;
  }

  if (record.count >= limit) return false;

  record.count++;
  record.last = now;

  return true;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const { name, email, message, company } = await req.json();

    // honeypot trap (silent ignore bots)
    if (company) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // 1) send to owner
    await resend.emails.send({
      from: "AI Betting <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Contact form: ${name}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    // 2) auto-reply to user
    await resend.emails.send({
      from: "AI Betting <onboarding@resend.dev>",
      to: email,
      subject: "We received your message",
      text: `
Hi ${name},

We received your message and will respond shortly.

— AI Betting Team
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// In-memory rate limiting per container instance
const ipMap = new Map<string, { count: number; last: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60_000; // 1 min window
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

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid payload format" },
        { status: 400 }
      );
    }

    const { name, email, message, company } = body;

    // Honeypot trap: silently accept bots
    if (typeof company === "string" && company.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid form field types" },
        { status: 400 }
      );
    }

    // Strip carriage returns and line feeds from name to prevent email header injection
    const cleanName = name.replace(/[\r\n]+/g, " ").trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    if (!cleanName || !cleanEmail || !cleanMessage) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (cleanName.length > 100) {
      return NextResponse.json(
        { error: "Name must not exceed 100 characters" },
        { status: 400 }
      );
    }

    if (cleanEmail.length > 254 || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    if (cleanMessage.length > 5000) {
      return NextResponse.json(
        { error: "Message must not exceed 5000 characters" },
        { status: 400 }
      );
    }

    if (!resend) {
      console.warn("[contact] RESEND_API_KEY is not configured on server.");
      return NextResponse.json(
        { error: "Email service temporarily unavailable" },
        { status: 503 }
      );
    }

    const targetRecipient =
      process.env.CONTACT_EMAIL || "contact@matchsignal.pro";

    // Send contact notification to site operator
    await resend.emails.send({
      from: "MatchSignal Contact <onboarding@resend.dev>",
      to: targetRecipient,
      subject: `Contact Form: ${cleanName}`,
      replyTo: cleanEmail,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Submission error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
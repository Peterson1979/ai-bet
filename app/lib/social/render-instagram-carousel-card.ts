import fs from "fs/promises";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import type { CarouselSlide } from "./build-instagram-carousel";

function esc(v: string) {
  return String(v)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function formatUtc(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });
}

function riskColor(risk: string) {
  if (risk === "Low") return "#22c55e";
  if (risk === "Medium") return "#f59e0b";
  return "#ef4444";
}

function renderSlideHtml(slide: CarouselSlide, slideNumber: number, totalSlides: number) {
  const badge = `<div style="font-size:18px;color:#7dd3fc;font-weight:700;letter-spacing:1px;">MATCHSIGNAL</div>`;
  const pager = `<div style="font-size:16px;color:#94a3b8;">${slideNumber}/${totalSlides}</div>`;

  if (slide.type === "cover") {
    return `
      <div style="height:100%;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="display:flex;justify-content:space-between;align-items:start;">${badge}${pager}</div>
        <div>
          <div style="font-size:24px;color:#93c5fd;">${esc(slide.date)}</div>
          <div style="margin-top:18px;font-size:86px;font-weight:800;line-height:0.95;">${esc(slide.title)}</div>
          <div style="margin-top:24px;font-size:34px;color:#cbd5e1;line-height:1.2;">${esc(slide.subtitle)}</div>
        </div>
        <div style="font-size:20px;color:#64748b;">Swipe for today’s top AI picks</div>
      </div>
    `;
  }

  if (slide.type === "sport-pick") {
    return `
      <div style="height:100%;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="display:flex;justify-content:space-between;align-items:start;">
          <div>
            ${badge}
            <div style="margin-top:18px;font-size:22px;color:#93c5fd;text-transform:uppercase;">${esc(slide.sport)}</div>
            <div style="margin-top:10px;font-size:20px;color:#94a3b8;">${esc(slide.league)}</div>
          </div>
          ${pager}
        </div>

        <div>
          <div style="font-size:48px;font-weight:800;line-height:1.08;">${esc(slide.match)}</div>
          <div style="margin-top:26px;display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:20px;">
              <div style="font-size:16px;color:#94a3b8;">Pick</div>
              <div style="font-size:28px;font-weight:800;margin-top:8px;">${esc(slide.pick)}</div>
            </div>
            <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:20px;">
              <div style="font-size:16px;color:#94a3b8;">Odds</div>
              <div style="font-size:28px;font-weight:800;margin-top:8px;">${slide.odds.toFixed(2)}</div>
            </div>
            <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:20px;">
              <div style="font-size:16px;color:#94a3b8;">Market</div>
              <div style="font-size:24px;font-weight:700;margin-top:8px;">${esc(slide.market)}</div>
            </div>
            <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:20px;">
              <div style="font-size:16px;color:#94a3b8;">Value Signal</div>
              <div style="font-size:28px;font-weight:800;margin-top:8px;color:#22c55e;">+${slide.valueDiff.toFixed(2)}%</div>
            </div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:end;">
          <div>
            <div style="font-size:18px;color:#94a3b8;">Start: ${esc(formatUtc(slide.startTime))} UTC</div>
          </div>
          <div style="font-size:20px;font-weight:700;color:${riskColor(slide.confidence)};">${esc(slide.confidence)} Risk</div>
        </div>
      </div>
    `;
  }

  if (slide.type === "best-overall") {
    return `
      <div style="height:100%;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="display:flex;justify-content:space-between;align-items:start;">${badge}${pager}</div>
        <div>
          <div style="font-size:24px;color:#93c5fd;">Top edge today</div>
          <div style="margin-top:18px;font-size:72px;font-weight:800;line-height:0.98;">${esc(slide.title)}</div>
          <div style="margin-top:20px;font-size:34px;color:#e2e8f0;line-height:1.15;">${esc(slide.match)}</div>
          <div style="margin-top:28px;font-size:30px;font-weight:700;">${esc(slide.pick)} @ ${slide.odds.toFixed(2)}</div>
          <div style="margin-top:18px;font-size:22px;color:#cbd5e1;line-height:1.35;">${esc(slide.reason || "Highest-ranked pick from today’s active board.")}</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:end;">
          <div style="font-size:18px;color:#64748b;">AI-ranked from today’s board</div>
          <div style="font-size:20px;font-weight:700;color:${riskColor(slide.confidence)};">${esc(slide.confidence)} Risk</div>
        </div>
      </div>
    `;
  }

  if (slide.type === "summary") {
    return `
      <div style="height:100%;display:flex;flex-direction:column;justify-content:space-between;">
        <div style="display:flex;justify-content:space-between;align-items:start;">${badge}${pager}</div>
        <div>
          <div style="font-size:72px;font-weight:800;line-height:1;">${esc(slide.title)}</div>
          <div style="margin-top:36px;display:flex;flex-direction:column;gap:18px;">
            ${slide.bullets
              .map(
                (bullet) => `
              <div style="background:#111827;border:1px solid #334155;border-radius:18px;padding:22px 24px;font-size:28px;color:#e2e8f0;">
                ${esc(bullet)}
              </div>`
              )
              .join("")}
          </div>
        </div>
        <div style="font-size:18px;color:#64748b;">Updated from the current MatchSignal predictions</div>
      </div>
    `;
  }

  return `
    <div style="height:100%;display:flex;flex-direction:column;justify-content:space-between;">
      <div style="display:flex;justify-content:space-between;align-items:start;">${badge}${pager}</div>
      <div>
        <div style="font-size:82px;font-weight:800;line-height:0.95;">${esc(slide.title)}</div>
        <div style="margin-top:24px;font-size:32px;color:#cbd5e1;line-height:1.25;">${esc(slide.subtitle)}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:end;">
        <div style="font-size:28px;color:#7dd3fc;font-weight:700;">${esc(slide.handle)}</div>
        <div style="font-size:18px;color:#64748b;">More picks every day</div>
      </div>
    </div>
  `;
}

export async function renderInstagramCarouselCard(
  slide: CarouselSlide,
  outputPath: string,
  slideNumber: number,
  totalSlides: number
) {
  if (typeof (chromium as any).setGraphicsMode === "function") {
    (chromium as any).setGraphicsMode(false);
  }

  const executablePath = await chromium.executablePath();

  process.env.LD_LIBRARY_PATH = executablePath
    ? executablePath.split("/").slice(0, -1).join("/")
    : process.env.LD_LIBRARY_PATH;

  const browser = await playwright.launch({
    args: chromium.args,
    executablePath,
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1080, height: 1080 },
    deviceScaleFactor: 1,
  });

  const html = `
  <html>
    <body style="margin:0;background:#0b1220;font-family:Arial,sans-serif;">
      <div style="width:1080px;height:1080px;background:linear-gradient(180deg,#0b1220,#111827);color:#fff;padding:64px;box-sizing:border-box;">
        ${renderSlideHtml(slide, slideNumber, totalSlides)}
      </div>
    </body>
  </html>`;

  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({
    path: outputPath,
    type: "jpeg",
    quality: 92,
  });

  await browser.close();
  await fs.access(outputPath);
}
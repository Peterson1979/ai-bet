import fs from "fs/promises";
import chromium from "@sparticuz/chromium";
import { chromium as playwright } from "playwright-core";
import type { Candidate } from "./types";

function esc(v: string) {
  return v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function getPrimaryOdds(pick: Candidate): number | null {
  if (isFiniteNumber(pick.bestOdds)) return pick.bestOdds;
  if (isFiniteNumber(pick.partnerOffer?.odds)) return pick.partnerOffer.odds;
  if (isFiniteNumber(pick.partnerOdds)) return pick.partnerOdds;
  return null;
}

function getPrimaryValue(pick: Candidate): number | null {
  if (isFiniteNumber(pick.estimatedValuePct)) return pick.estimatedValuePct;
  if (isFiniteNumber(pick.valueDiff)) return pick.valueDiff;
  return null;
}

function formatOdds(value: number | null): string {
  return isFiniteNumber(value) ? value.toFixed(2) : "—";
}

function formatPercent(value: number | null, withPlus = false): string {
  if (!isFiniteNumber(value)) return "—";
  const prefix = withPlus && value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}%`;
}

export async function renderCard(pick: Candidate, outputPath: string) {
  const dt = new Date(pick.startTime).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

  const primaryOdds = getPrimaryOdds(pick);
  const primaryValue = getPrimaryValue(pick);

  chromium.setGraphicsMode = false;

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
      <div style="width:1080px;height:1080px;background:linear-gradient(180deg,#0b1220,#111827);color:#fff;padding:64px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="font-size:28px;color:#7dd3fc;font-weight:700;letter-spacing:1px;">MATCHSIGNAL</div>
          <div style="margin-top:24px;font-size:22px;color:#93c5fd;">${esc(pick.league)}</div>
          <div style="margin-top:18px;font-size:56px;font-weight:800;line-height:1.05;">${esc(pick.homeTeam)}</div>
          <div style="font-size:34px;color:#94a3b8;margin:10px 0;">vs</div>
          <div style="font-size:56px;font-weight:800;line-height:1.05;">${esc(pick.awayTeam)}</div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:24px;">
            <div style="font-size:18px;color:#94a3b8;">Pick</div>
            <div style="font-size:34px;font-weight:800;margin-top:8px;">${esc(pick.prediction)}</div>
          </div>
          <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:24px;">
            <div style="font-size:18px;color:#94a3b8;">Odds</div>
            <div style="font-size:34px;font-weight:800;margin-top:8px;">${formatOdds(primaryOdds)}</div>
          </div>
          <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:24px;">
            <div style="font-size:18px;color:#94a3b8;">Value Signal</div>
            <div style="font-size:34px;font-weight:800;margin-top:8px;color:#22c55e;">${formatPercent(primaryValue, true)}</div>
          </div>
          <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:24px;">
            <div style="font-size:18px;color:#94a3b8;">Risk Tier</div>
            <div style="font-size:34px;font-weight:800;margin-top:8px;">${esc(pick.riskTier)}</div>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:end;">
          <div>
            <div style="font-size:22px;color:#cbd5e1;">${esc(pick.market)}</div>
            <div style="font-size:20px;color:#94a3b8;margin-top:8px;">${esc(dt)} UTC</div>
          </div>
          <div style="font-size:18px;color:#64748b;">Free AI betting analysis</div>
        </div>
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

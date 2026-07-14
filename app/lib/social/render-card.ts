import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";
import type { Candidate } from "./types";

function esc(v: string) {
  return v
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export async function renderCard(pick: Candidate, outputPath: string) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1080 } });

  const dt = new Date(pick.startTime).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  });

  const html = `
  <html>
    <body style="margin:0;background:#0b1220;font-family:Inter,Arial,sans-serif;">
      <div style="width:1080px;height:1080px;background:linear-gradient(180deg,#0b1220,#111827);color:#fff;padding:64px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="font-size:28px;color:#7dd3fc;font-weight:700;letter-spacing:1px;">MATCHSIGNAL</div>
          <div style="margin-top:24px;font-size:22px;color:#93c5fd;">${esc(pick.league)}</div>
          <div style="margin-top:18px;font-size:56px;font-weight:800;line-height:1.05;">${esc(
            pick.homeTeam
          )}</div>
          <div style="font-size:34px;color:#94a3b8;margin:10px 0;">vs</div>
          <div style="font-size:56px;font-weight:800;line-height:1.05;">${esc(
            pick.awayTeam
          )}</div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:24px;">
            <div style="font-size:18px;color:#94a3b8;">Pick</div>
            <div style="font-size:34px;font-weight:800;margin-top:8px;">${esc(
              pick.prediction
            )}</div>
          </div>
          <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:24px;">
            <div style="font-size:18px;color:#94a3b8;">Odds</div>
            <div style="font-size:34px;font-weight:800;margin-top:8px;">${pick.bestOdds.toFixed(
              2
            )}</div>
          </div>
          <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:24px;">
            <div style="font-size:18px;color:#94a3b8;">Value Signal</div>
            <div style="font-size:34px;font-weight:800;margin-top:8px;color:#22c55e;">+${pick.valueDiff.toFixed(
              2
            )}%</div>
          </div>
          <div style="background:#111827;border:1px solid #334155;border-radius:20px;padding:24px;">
            <div style="font-size:18px;color:#94a3b8;">Risk Tier</div>
            <div style="font-size:34px;font-weight:800;margin-top:8px;">${esc(
              pick.riskTier
            )}</div>
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

  await page.setContent(html, { waitUntil: "networkidle" });
 await page.screenshot({ path: outputPath, type: "jpeg", quality: 92 });
  await browser.close();

  await fs.access(path.resolve(outputPath));
}
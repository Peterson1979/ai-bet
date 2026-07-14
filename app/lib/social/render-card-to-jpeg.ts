import puppeteer from "puppeteer";

export async function renderCardToJpeg(url: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setViewport({
      width: 1200,
      height: 1200,
      deviceScaleFactor: 2,
    });

    await page.goto(url, {
      waitUntil: "networkidle0",
      timeout: 60_000,
    });

    const jpegBuffer = await page.screenshot({
      type: "jpeg",
      quality: 90,
      fullPage: false,
    });

    return jpegBuffer;
  } finally {
    await browser.close();
  }
}
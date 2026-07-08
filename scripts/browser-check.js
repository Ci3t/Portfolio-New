const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");

const CHROME_PATH = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE_URL = "http://localhost:3000";

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: CHROME_PATH,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const messages = [];

  page.on("console", (msg) => {
    const text = msg.text();
    messages.push({ type: msg.type(), text });
    if (msg.type() === "error" || /hydrat/i.test(text) || /did not match/i.test(text)) {
      console.log("CONSOLE:", msg.type(), text.substring(0, 400));
    }
  });

  page.on("pageerror", (err) => {
    messages.push({ type: "pageerror", text: err.message });
    console.log("PAGE ERROR:", err.message);
  });

  const outputDir = path.join(__dirname, "..", "tmp");
  fs.mkdirSync(outputDir, { recursive: true });

  // Desktop
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(BASE_URL, { waitUntil: "networkidle2" });
  await page.screenshot({ path: path.join(outputDir, "desktop.png"), fullPage: false });

  // Scroll through sections
  const navIds = ["#about", "#projects", "#experience", "#stack", "#contact", "#hero"];
  for (const id of navIds) {
    await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
    }, id);
    await new Promise((r) => setTimeout(r, 300));
  }

  // Mobile
  await page.setViewport({ width: 375, height: 667 });
  await page.reload({ waitUntil: "networkidle2" });
  await page.screenshot({ path: path.join(outputDir, "mobile.png"), fullPage: false });

  await browser.close();

  const hydrationIssues = messages.filter(
    (m) =>
      /hydrat/i.test(m.text) ||
      /did not match/i.test(m.text) ||
      (/server/i.test(m.text) && /client/i.test(m.text))
  );

  console.log("\n=== Browser check complete ===");
  console.log("Total console messages:", messages.length);
  console.log("Hydration-related messages:", hydrationIssues.length);

  if (hydrationIssues.length > 0) {
    console.log("\nHydration issues:");
    hydrationIssues.forEach((m) => console.log(`[${m.type}] ${m.text.substring(0, 400)}`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

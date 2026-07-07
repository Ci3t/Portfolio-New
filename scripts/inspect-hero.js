const puppeteer = require("puppeteer-core");

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle2" });

  const info = await page.evaluate(() => {
    const el = document.querySelector('p[class*="text-headline-lg"]');
    if (!el) return null;
    const style = window.getComputedStyle(el);
    const parent = el.parentElement;
    const pStyle = parent ? window.getComputedStyle(parent) : null;
    return {
      text: el.textContent,
      whiteSpace: style.whiteSpace,
      overflow: style.overflow,
      width: style.width,
      fontSize: style.fontSize,
      parentWidth: pStyle ? pStyle.width : null,
      parentMinWidth: pStyle ? pStyle.minWidth : null,
      gridTemplateColumns: pStyle ? pStyle.gridTemplateColumns : null,
    };
  });

  console.log(info);
  await browser.close();
})();

import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";
import { getPublicRoutes } from "./routes.js";

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;
const DIST_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");

function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = async () => {
      try {
        const res = await fetch(url);
        if (res.ok || res.status < 500) return resolve();
      } catch {
        // server chưa sẵn sàng, thử lại
      }

      if (Date.now() - start > timeoutMs) {
        return reject(new Error(`Server không sẵn sàng sau ${timeoutMs}ms`));
      }

      setTimeout(check, 300);
    };

    check();
  });
}

function outputPathFor(routePath) {
  if (routePath === "/") return join(DIST_DIR, "index.html");
  return join(DIST_DIR, routePath, "index.html");
}

async function main() {
  const routes = getPublicRoutes();

  const previewProcess = spawn(
    "npx",
    ["vite", "preview", "--port", String(PORT), "--strictPort"],
    { stdio: "pipe" },
  );

  previewProcess.on("error", (err) => {
    console.error("Không khởi động được vite preview:", err);
    process.exit(1);
  });

  try {
    await waitForServer(BASE_URL);

    const browser = await puppeteer.launch({ headless: true });

    try {
      for (const route of routes) {
        const page = await browser.newPage();
        await page.goto(`${BASE_URL}${route.path}`, { waitUntil: "networkidle0" });
        const html = `<!doctype html>\n${await page.content()}`;
        const outputPath = outputPathFor(route.path);

        mkdirSync(dirname(outputPath), { recursive: true });
        writeFileSync(outputPath, html);
        console.log(`Đã prerender ${route.path} → ${outputPath.replace(DIST_DIR, "dist")}`);

        await page.close();
      }
    } finally {
      await browser.close();
    }
  } finally {
    previewProcess.kill();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

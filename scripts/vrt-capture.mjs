import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

const URL_BASE = process.env.VRT_URL ?? "http://localhost:6006";
const OUT_DIR = "__screenshots__";
const SERVER_READY_TIMEOUT_MS = 60_000;
const STORY_RENDER_TIMEOUT_MS = 30_000;

const DEFAULT_SCREENSHOT = {
  viewports: {
    sp: { width: 375, height: 667 },
    pc: { width: 1280, height: 800 },
  },
  fullPage: false,
  delay: 200,
};

async function waitForServer(url, timeoutMs) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error(`Server did not become ready within ${timeoutMs}ms: ${url}`);
}

function startServer() {
  const proc = spawn(
    "npx",
    ["http-server", "storybook-static", "-p", "6006", "--silent"],
    { stdio: "inherit" },
  );
  proc.on("error", (err) => {
    console.error("[vrt] http-server failed to start:", err);
  });
  proc.on("exit", (code, signal) => {
    if (code !== 0) {
      console.error(
        `[vrt] http-server exited with code ${code} (signal: ${signal})`,
      );
    }
    console.log("[vrt] http-server stopped");
  });
  return proc;
}

async function extractScreenshotParams(page) {
  return page.evaluate(async () => {
    const preview = /** @type {any} */ (window).__STORYBOOK_PREVIEW__;
    if (!preview) return null;
    try {
      if (typeof preview.ready === "function") await preview.ready();
      const story =
        preview.currentRender?.story ?? preview.storyRenders?.[0]?.story;
      return story?.parameters?.screenshot ?? null;
    } catch {
      return null;
    }
  });
}

function mergeScreenshotParams(perStory) {
  if (!perStory) return DEFAULT_SCREENSHOT;
  return {
    viewports: perStory.viewports ?? DEFAULT_SCREENSHOT.viewports,
    fullPage: perStory.fullPage ?? DEFAULT_SCREENSHOT.fullPage,
    delay: perStory.delay ?? DEFAULT_SCREENSHOT.delay,
  };
}

async function captureStory(context, story) {
  const page = await context.newPage();
  try {
    await page.goto(
      `${URL_BASE}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story`,
      { waitUntil: "load" },
    );

    // Disable animations for stable screenshots.
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }`,
    });

    await page.waitForFunction(
      () => {
        const root =
          document.getElementById("storybook-root") ||
          document.getElementById("root");
        return !!root && root.children.length > 0;
      },
      { timeout: STORY_RENDER_TIMEOUT_MS },
    );

    const perStory = await extractScreenshotParams(page);
    const { viewports, fullPage, delay } = mergeScreenshotParams(perStory);

    for (const [vpName, vpSize] of Object.entries(viewports)) {
      await page.setViewportSize(vpSize);
      if (delay > 0) await page.waitForTimeout(delay);

      const filePath = join(
        OUT_DIR,
        story.title,
        `${story.name}_${vpName}.png`,
      );
      await mkdir(dirname(filePath), { recursive: true });
      await page.screenshot({ path: filePath, fullPage });
      console.log(`[vrt] captured ${filePath}`);
    }
  } finally {
    await page.close();
  }
}

async function main() {
  await rm(OUT_DIR, { recursive: true, force: true });
  await mkdir(OUT_DIR, { recursive: true });

  const server = startServer();

  try {
    await waitForServer(`${URL_BASE}/index.json`, SERVER_READY_TIMEOUT_MS);

    const index = await (await fetch(`${URL_BASE}/index.json`)).json();
    const entries = Object.values(index.entries ?? {}).filter(
      (e) => e.type === "story",
    );

    if (entries.length === 0) {
      throw new Error("No stories found in /index.json");
    }
    console.log(`[vrt] found ${entries.length} stories`);

    const browser = await chromium.launch();
    const context = await browser.newContext({ deviceScaleFactor: 1 });

    console.log("[vrt] starting capture...");

    try {
      for (const story of entries) {
        console.log(
          `[vrt] ▶ capturing: ${story.title} - ${story.name} (${story.id})`,
        );
        await captureStory(context, story);
      }
    } finally {
      await context.close();
      await browser.close();
    }
  } finally {
    server.kill("SIGTERM");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

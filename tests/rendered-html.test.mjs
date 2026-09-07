import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the GhostCam web surface", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /class="ghostcam-app"/);
  assert.match(html, /Ghost<span>Cam<\/span>/);
  assert.match(html, /사진 업로드/);
});

test("keeps platform boundaries explicit", async () => {
  const [page, upload, storage, shared, appReadme, appEntry, appHome, appPubspec, appTest] = await Promise.all([
    readFile(new URL("web/app/page.tsx", root), "utf8"),
    readFile(new URL("web/lib/upload.ts", root), "utf8"),
    readFile(new URL("web/lib/result-storage.ts", root), "utf8"),
    readFile(new URL("shared/ghostcam.ts", root), "utf8"),
    readFile(new URL("app/README.md", root), "utf8"),
    readFile(new URL("app/lib/main.dart", root), "utf8"),
    readFile(new URL("app/lib/pages/home_page.dart", root), "utf8"),
    readFile(new URL("app/pubspec.yaml", root), "utf8"),
    readFile(new URL("app/test/widget_test.dart", root), "utf8"),
  ]);

  assert.match(page, /from "\.\.\/lib\/upload"/);
  assert.match(page, /from "\.\.\/lib\/result-storage"/);
  assert.doesNotMatch(page, /async function optimizeForUpload/);
  assert.match(upload, /export async function optimizeForUpload/);
  assert.match(storage, /export function saveResult/);
  assert.match(shared, /export interface GenerateImageResponse/);
  assert.match(appReadme, /Flutter 모바일 앱/);
  assert.match(appEntry, /class GhostCamApp/);
  assert.match(appHome, /LIVE SCAN/);
  assert.match(appPubspec, /assets\/ghost-selfie-hero\.png/);
  assert.match(appTest, /GhostCam home screen renders/);

  await access(new URL("web/public/assets/ghostcam-hero-reference.png", root));
  await access(new URL("app/assets/ghost-selfie-hero.png", root));
  await access(new URL("worker/index.ts", root));
});

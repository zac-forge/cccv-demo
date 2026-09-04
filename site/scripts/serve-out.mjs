// Serves the static export the way Cloudflare's auto-trailing-slash will:
// /about -> about.html, /new/know-jesus -> new/know-jesus.html, misses -> 404.html.
//
//   npm run build && npm run preview     # http://localhost:4173
//
// No dependencies. `next start` does not work with output: 'export', and
// python's http.server does not resolve clean URLs.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
const root = process.argv[2];
const port = Number(process.argv[3] ?? 4173);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".woff2": "font/woff2", ".xml": "application/xml", ".txt": "text/plain", ".json": "application/json", ".ico": "image/x-icon" };
http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(root, p);
  const cands = [file, file + ".html", path.join(file, "index.html")];
  let hit = cands.find((f) => fs.existsSync(f) && fs.statSync(f).isFile());
  let status = 200;
  if (!hit) { hit = path.join(root, "404.html"); status = 404; }
  res.writeHead(status, { "content-type": types[path.extname(hit)] ?? "application/octet-stream" });
  fs.createReadStream(hit).pipe(res);
}).listen(port, () => console.log("serving", root, "on", port));

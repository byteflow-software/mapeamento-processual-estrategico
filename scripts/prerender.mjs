import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "..", "dist");

const serverEntry = resolve(distDir, "server", "entry-server.js");
const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = render();

const template = await readFile(resolve(distDir, "index.html"), "utf8");
const output = template.replace("<!--app-html-->", appHtml);

await writeFile(resolve(distDir, "index.html"), output, "utf8");
console.log("Pre-render complete: dist/index.html");

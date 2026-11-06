// Generates the responsive variants served by src/lib/images/loader.js.
// Run with `node scripts/resize-images.mjs` after adding or replacing an image.
import { readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const WIDTHS = [640, 1080];
const DIRS = ["public/assets/product", "public/industries"];

for (const dir of DIRS) {
  for (const file of readdirSync(dir)) {
    if (!file.endsWith(".webp") || /-\d+\.webp$/.test(file)) continue;
    for (const width of WIDTHS) {
      const out = join(dir, file.replace(/\.webp$/, `-${width}.webp`));
      await sharp(join(dir, file)).resize({ width }).webp({ quality: 78 }).toFile(out);
    }
  }
}

await sharp("public/assets/xura-logo.png")
  .resize({ width: 128 })
  .png({ compressionLevel: 9, palette: true })
  .toFile("public/assets/xura-logo-128.png");

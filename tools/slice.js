/**
 * Slice a tall full-page screenshot into readable chunks.
 *   node slice.js <tall.png> <outDir> [sliceHeight]
 * Capturing the whole page in one very tall viewport means every element is
 * "in view" on load, so the GSAP reveals all fire and nothing is caught
 * mid-animation or still hidden.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const [src, outDir, sliceArg] = process.argv.slice(2);
const SLICE = Number(sliceArg) || 1100;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const meta = await sharp(src).metadata();
  console.log(`source ${meta.width}x${meta.height}, slices of ${SLICE}`);
  let i = 0;
  for (let y = 0; y < meta.height; y += SLICE, i++) {
    const h = Math.min(SLICE, meta.height - y);
    if (h < 40) break;
    const out = path.join(outDir, `s${String(i).padStart(2, "0")}.png`);
    await sharp(src)
      .extract({ left: 0, top: y, width: meta.width, height: h })
      .png({ compressionLevel: 9 })
      .toFile(out);
    console.log(`  ${path.basename(out)}  y=${y}..${y + h}`);
  }
})();

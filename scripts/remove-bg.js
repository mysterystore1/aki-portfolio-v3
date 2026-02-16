const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'public', 'images', 'hero-mascot-raw.png');
const dest = path.join(root, 'public', 'images', 'hero-mascot-transparent.png');

const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const jpegData = fs.readFileSync(src);
const rawImage = jpeg.decode(jpegData, { useTArray: true });
const w = rawImage.width;
const h = rawImage.height;

// Step 1: alpha マップ（黒=透過、それ以外=不透明。境界だけ少しフェード）
const alphaMap = new Uint8Array(w * h);
const threshold = 35;
const fade = 20;

for (let i = 0; i < rawImage.data.length; i += 4) {
  const r = rawImage.data[i];
  const g = rawImage.data[i + 1];
  const b = rawImage.data[i + 2];
  const brightness = Math.max(r, g, b);
  const idx = i / 4;

  if (brightness <= threshold) {
    alphaMap[idx] = 0;
  } else if (brightness < threshold + fade) {
    alphaMap[idx] = Math.round(((brightness - threshold) / fade) * 255);
  } else {
    alphaMap[idx] = 255;
  }
}

// Step 2: alpha だけ軽くぼかし（1パス、radius 1）でギザギザ防止
const blurred = new Uint8Array(alphaMap.length);
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    let sum = 0, count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          sum += alphaMap[ny * w + nx];
          count++;
        }
      }
    }
    blurred[y * w + x] = Math.round(sum / count);
  }
}

// Step 3: トリミング（不透明ピクセルだけの範囲を切り出す）
let topY = 0, bottomY = h - 1, leftX = 0, rightX = w - 1;
outer1: for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (blurred[y * w + x] > 20) { topY = y; break outer1; }
outer2: for (let y = h - 1; y >= 0; y--) for (let x = 0; x < w; x++) if (blurred[y * w + x] > 20) { bottomY = y; break outer2; }
outer3: for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) if (blurred[y * w + x] > 20) { leftX = x; break outer3; }
outer4: for (let x = w - 1; x >= 0; x--) for (let y = 0; y < h; y++) if (blurred[y * w + x] > 20) { rightX = x; break outer4; }

const cw = rightX - leftX + 1;
const ch = bottomY - topY + 1;
const png = new PNG({ width: cw, height: ch });

for (let cy = 0; cy < ch; cy++) {
  for (let cx = 0; cx < cw; cx++) {
    const srcX = leftX + cx;
    const srcY = topY + cy;
    const si = (srcY * w + srcX) * 4;
    const di = (cy * cw + cx) * 4;
    // RGB はそのまま（色味を変えない）
    png.data[di] = rawImage.data[si];
    png.data[di + 1] = rawImage.data[si + 1];
    png.data[di + 2] = rawImage.data[si + 2];
    png.data[di + 3] = blurred[srcY * w + srcX];
  }
}

const buf = PNG.sync.write(png);
fs.writeFileSync(dest, buf);
console.log('OK: ' + cw + 'x' + ch);

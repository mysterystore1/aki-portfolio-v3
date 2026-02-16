const fs = require('fs');
const path = require('path');

const ASSETS_BASE = path.join(
  process.env.USERPROFILE || '',
  '.cursor', 'projects', 'c-work-projects', 'assets',
  'c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_ebd972bf67edc4812b8228dba5469352_images'
);
const GALLERY_DIR = path.join(__dirname, '..', 'public', 'images', 'gallery');

const SOURCES = [
  'G6SytO5akAAqaiV-d87681ee-3e04-43f1-bf2c-c66d9164c0a1.png',
  'G5zzufxXsAAAmtN-0d20dd68-80ab-448f-ac58-2a695064fa0a.png',
  'G4LdM78XUAAT5Tp-cbb423dd-3467-4431-89d7-3f0cdbda39c6.png',
  'G21TaduagAARXzt-e9c54ee4-d38d-4421-bc6c-dbcf3493233d.png',
  'GyfIJIPaMAEN8Ym-f88cc4dd-3a90-42f0-afa0-e3b9cdc53408.png',
  'G1_6ZoBbIAAMSxy-ee864cc5-ba58-41ea-96e6-9e3c5040a167.png',
  'G2Z9VA-aEAEFCZU-62a1e5f2-6e85-4d57-9867-c5dcc67b2bbc.png',
  'G4mSwfnbUAAheL5-ce45d5ce-2bcb-4d67-aef3-5cd7b1b93e14.png',
  'G8NsXE0aMAEu4sb-01f49978-a507-4964-9ee6-fc16cd14dc0d.png',
  'G8cnmuna0AA8B-8-7df89b04-2910-40cf-8df2-84136477967e.png',
  'G-DGhmnacAAunAR-1074b351-d589-40d7-b58d-2f1d1b43916e.png'
];

if (!fs.existsSync(GALLERY_DIR)) {
  fs.mkdirSync(GALLERY_DIR, { recursive: true });
}

let copied = 0;
for (let i = 0; i < 12; i++) {
  const srcIndex = i < SOURCES.length ? i : 0;
  const srcFile = path.join(ASSETS_BASE, SOURCES[srcIndex]);
  const destFile = path.join(GALLERY_DIR, `activity-${String(i + 1).padStart(2, '0')}.png`);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    copied++;
    console.log('Copied', path.basename(destFile));
  } else {
    console.warn('Skip (not found):', srcFile);
  }
}
console.log('Done. Copied', copied, 'files to', GALLERY_DIR);

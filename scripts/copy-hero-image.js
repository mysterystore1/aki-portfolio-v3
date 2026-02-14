const fs = require('fs');
const path = require('path');

const src = process.env.HERO_IMAGE_SRC || path.join(
  process.env.USERPROFILE || '',
  '.cursor', 'projects', 'c-work-projects', 'assets',
  'c__Users_taikan_AppData_Roaming_Cursor_User_workspaceStorage_ebd972bf67edc4812b8228dba5469352_images_image-b244b6e8-f8c0-4830-8747-d689174dcf4c.png'
);
const dest = path.join(__dirname, '..', 'public', 'images', 'hero-profile.png');

const dir = path.dirname(dest);
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log('OK: hero-profile.png');
} else {
  console.log('SKIP: source not found. Copy the image manually to public/images/hero-profile.png');
}

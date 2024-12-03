const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ICON_SIZES = [
  16, 32, 72, 96, 128, 144, 152, 167, 180, 192, 384, 512
];

const SPLASH_SCREENS = [
  { width: 1125, height: 2436 }, // iPhone X
  { width: 1170, height: 2532 }, // iPhone 12/13 Pro
  { width: 1179, height: 2556 }, // iPhone 14 Pro
  { width: 1284, height: 2778 }, // iPhone 12/13 Pro Max
  { width: 1290, height: 2796 }, // iPhone 14 Pro Max
];

const SOURCE_LOGO = path.join(__dirname, '..', 'public', 'images', 'albums', 'logo.webp');
const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');

async function generateIcons() {
  // Create icons directory if it doesn't exist
  if (!fs.existsSync(ICONS_DIR)) {
    fs.mkdirSync(ICONS_DIR, { recursive: true });
  }

  // Generate favicon and app icons
  for (const size of ICON_SIZES) {
    console.log(`Generating ${size}x${size} icon...`);
    
    await sharp(SOURCE_LOGO)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .toFile(path.join(ICONS_DIR, `icon-${size}x${size}.png`));

    // Generate Apple touch icons
    if ([152, 167, 180].includes(size)) {
      await sharp(SOURCE_LOGO)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 234, g: 88, b: 12, alpha: 1 } // #ea580c
        })
        .toFile(path.join(ICONS_DIR, `apple-icon-${size}x${size}.png`));
    }

    // Generate Microsoft tile icons
    if ([70, 150, 310].includes(size)) {
      await sharp(SOURCE_LOGO)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 234, g: 88, b: 12, alpha: 1 } // #ea580c
        })
        .toFile(path.join(ICONS_DIR, `ms-icon-${size}x${size}.png`));
    }
  }

  // Generate splash screens
  const headerImage = path.join(__dirname, '..', 'public', 'images', 'albums', 'header.webp');
  
  for (const screen of SPLASH_SCREENS) {
    console.log(`Generating ${screen.width}x${screen.height} splash screen...`);
    
    await sharp(headerImage)
      .resize(screen.width, screen.height, {
        fit: 'cover',
        position: 'center'
      })
      .composite([{
        input: await sharp(SOURCE_LOGO)
          .resize(Math.floor(screen.width * 0.4), Math.floor(screen.width * 0.4), {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .toBuffer(),
        gravity: 'center'
      }])
      .toFile(path.join(ICONS_DIR, `apple-splash-${screen.width}-${screen.height}.png`));
  }

  // Generate favicon.ico (16x16 and 32x32)
  console.log('Generating favicon.ico...');
  
  // Create 16x16 and 32x32 versions
  const favicon16 = await sharp(SOURCE_LOGO)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const favicon32 = await sharp(SOURCE_LOGO)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  // Write individual files
  await sharp(favicon16).toFile(path.join(ICONS_DIR, 'favicon-16x16.png'));
  await sharp(favicon32).toFile(path.join(ICONS_DIR, 'favicon-32x32.png'));

  // Create ICO file containing both sizes
  const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
  fs.writeFileSync(faviconPath, favicon32); // Use 32x32 as default favicon

  console.log('PWA icons generated successfully!');
}

generateIcons().catch(console.error);
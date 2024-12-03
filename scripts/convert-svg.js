const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SOURCE_LOGO = path.join(__dirname, '..', 'public', 'images', 'albums', 'logo.webp');
const OUTPUT_PNG = path.join(__dirname, '..', 'public', 'logo.png');

async function convertWebpToPng() {
  try {
    // Convert WEBP to PNG with high resolution
    await sharp(SOURCE_LOGO)
      .resize(1024, 1024) // Create a large base image
      .png()
      .toFile(OUTPUT_PNG);

    console.log('Logo converted to PNG successfully!');
  } catch (error) {
    console.error('Error converting logo to PNG:', error);
    process.exit(1);
  }
}

convertWebpToPng();
#!/usr/bin/env node

/**
 * Script to convert team member photos to base64 and update teamPhotos.ts
 * Usage: node scripts/convertTeamPhotos.js
 * 
 * Expected folder structure:
 * public/team-photos/
 *   ├── masalah.(jpg|png)         # Problem/Issue illustration
 *   ├── andika.(jpg|png)          # Andika Bella Pratama Putra
 *   ├── syahrul.(jpg|png)         # Syahrul Ramdhani
 *   └── nur-abdullah.(jpg|png)    # Nur Abdullah Kholiq
 */

const fs = require('fs');
const path = require('path');

const TEAM_MAPPING = {
  'masalah': 'masalah',
  'andika': '231030790839',
  'syahrul': '231030791114',
  'nur-abdullah': '231030790829',
  'nur_abdullah': '231030790829',
};

const PHOTO_DIR = path.join(__dirname, '../public/team-photos');
const OUTPUT_FILE = path.join(__dirname, '../src/data/teamPhotos.ts');

function findPhotoFile(namePrefix) {
  if (!fs.existsSync(PHOTO_DIR)) {
    console.warn(`⚠️  Photo directory not found: ${PHOTO_DIR}`);
    return null;
  }

  const files = fs.readdirSync(PHOTO_DIR);
  const photoFile = files.find((f) => {
    const baseName = path.basename(f, path.extname(f)).toLowerCase();
    return baseName === namePrefix.toLowerCase() || baseName.includes(namePrefix.toLowerCase());
  });

  return photoFile ? path.join(PHOTO_DIR, photoFile) : null;
}

function imageToBase64(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64 = imageBuffer.toString('base64');
    const ext = path.extname(imagePath).toLowerCase().slice(1);
    const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;
    return `data:${mimeType};base64,${base64}`;
  } catch (err) {
    console.error(`❌ Failed to convert ${imagePath}:`, err.message);
    return null;
  }
}

function main() {
  console.log('🖼️  Converting team photos to base64...\n');

  const photos = {};
  let converted = 0;
  let skipped = 0;

  Object.entries(TEAM_MAPPING).forEach(([namePrefix, nim]) => {
    const photoPath = findPhotoFile(namePrefix);
    
    if (photoPath) {
      const base64 = imageToBase64(photoPath);
      if (base64) {
        photos[nim] = base64;
        console.log(`✅ Converted: ${namePrefix} (${path.basename(photoPath)})`);
        converted++;
      } else {
        console.log(`⏭️  Skipped: ${namePrefix} (conversion failed)`);
        skipped++;
      }
    } else {
      console.log(`⏭️  Skipped: ${namePrefix} (file not found)`);
      skipped++;
    }
  });

  console.log(`\n📊 Results: ${converted} converted, ${skipped} skipped\n`);

  if (converted === 0) {
    console.error('❌ No photos were converted. Check if files exist in:', PHOTO_DIR);
    process.exit(1);
  }

  // Generate TypeScript file
  const tsContent = `/**
 * Team Member Photos - Embedded as Base64 Data URLs
 * Generated automatically by scripts/convertTeamPhotos.js
 * Photos are locked/read-only after upload
 */

export const TEAM_PHOTOS: Record<string, string> = {
${Object.entries(photos)
  .map(([nim, base64]) => {
    const preview = base64.substring(0, 50) + '...';
    return `  // ${nim}\n  '${nim}': '${base64}',`;
  })
  .join('\n')}
};
`;

  try {
    fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf8');
    console.log(`✅ Updated: ${OUTPUT_FILE}`);
    console.log(`\n🚀 Next steps:`);
    console.log(`   1. npm run dev (or bun run dev)`);
    console.log(`   2. Open "Tentang Ruang Obat" modal`);
    console.log(`   3. Check Tim Pengembang section - photos should appear!\n`);
  } catch (err) {
    console.error(`❌ Failed to write ${OUTPUT_FILE}:`, err.message);
    process.exit(1);
  }
}

main();

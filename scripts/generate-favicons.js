const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

const publicDir = path.join(__dirname, '..', 'public');
const source = path.join(publicDir, 'logo.png');

if (!fs.existsSync(source)) {
  console.error('Source logo not found at', source);
  process.exit(1);
}

async function run() {
  const sizes = [16, 32, 192, 512, 180];
  const outputs = [];

  for (const s of sizes) {
    const filename = s === 180 ? 'apple-touch-icon.png' : `favicon-${s}x${s}.png`;
    const out = path.join(publicDir, filename);
    outputs.push(out);
    await sharp(source)
      .resize(s, s, { fit: 'contain' })
      .toFile(out);
    console.log('Generated', filename);
  }

  // create favicon.ico from 16 and 32
  try {
    const png16 = path.join(publicDir, 'favicon-16x16.png');
    const png32 = path.join(publicDir, 'favicon-32x32.png');
    const icoBuffer = await pngToIco([png16, png32]);
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
    console.log('Generated favicon.ico');
  } catch (err) {
    console.error('Failed to generate favicon.ico', err);
  }

  console.log('All done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
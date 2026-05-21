import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';
import https from 'https';

const jsonPath = 'C:/Users/PC/.gemini/antigravity/brain/e0f87ffe-58c0-4f61-b0c7-f0bbddad43ae/.system_generated/steps/26/output.txt';
const outputDir = path.join(process.cwd(), 'stitch_exports');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fsSync.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        reject(new Error(`Failed to download, status code: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  try {
    const data = await fs.readFile(jsonPath, 'utf8');
    const screensData = JSON.parse(data);
    const screens = screensData.screens;

    await fs.mkdir(outputDir, { recursive: true });

    for (const screen of screens) {
      if (screen.htmlCode && screen.htmlCode.downloadUrl) {
        const safeTitle = screen.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filename = `${safeTitle}.html`;
        const dest = path.join(outputDir, filename);
        console.log(`Downloading ${screen.title} to ${filename}...`);
        await download(screen.htmlCode.downloadUrl, dest);
        console.log(`Downloaded ${filename}`);
      }
    }
    console.log('All downloads completed.');
  } catch (err) {
    console.error('Error:', err);
  }
}

run();

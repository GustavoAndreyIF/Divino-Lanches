const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/frontend');
const destDir = path.join(__dirname, '../dist/frontend');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  fs.readdirSync(src).forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);

    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyDir(srcDir, destDir);
console.log('Frontend files were copied to dist/frontend');
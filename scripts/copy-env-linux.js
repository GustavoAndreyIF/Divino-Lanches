const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../src/backend/config/.env');
const dest = path.join(__dirname, '../dist/backend/config/.env');

fs.copyFile(src, dest, (err) => {
  if (err) throw err;
  console.log('.env file was copied to dist/backend/config');
});
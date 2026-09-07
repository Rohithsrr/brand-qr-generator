const fs = require('fs');
const path = require('path');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="16" fill="#4F46E5"/>
  <rect x="12" y="12" width="18" height="18" rx="5" fill="#ffffff"/>
  <rect x="16" y="16" width="10" height="10" rx="2" fill="#4F46E5"/>
  <rect x="19" y="19" width="4" height="4" rx="1" fill="#ffffff"/>
  <circle cx="42" cy="16" r="4" fill="#ffffff"/>
  <circle cx="50" cy="24" r="4" fill="#06B6D4"/>
  <circle cx="42" cy="32" r="4" fill="#ffffff"/>
  <circle cx="20" cy="44" r="4" fill="#ffffff"/>
  <circle cx="32" cy="44" r="4" fill="#10B981"/>
  <rect x="40" y="40" width="12" height="12" rx="3" fill="#ffffff"/>
</svg>`;

// Write SVGs
fs.writeFileSync(path.join(__dirname, '../public/icon.svg'), svg, 'utf8');
fs.writeFileSync(path.join(__dirname, '../src/app/icon.svg'), svg, 'utf8');

// Valid 16x16 RGBA PNG buffer
const pngBuffer = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x00, 0x10,
  0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0xf3, 0xff,
  0x61, 0x00, 0x00, 0x00, 0x15, 0x49, 0x44, 0x41,
  0x54, 0x78, 0x9c, 0x63, 0x64, 0x60, 0xf8, 0xcf,
  0xc0, 0xc0, 0xc4, 0x00, 0x32, 0x10, 0x86, 0x00,
  0x2c, 0x04, 0x02, 0xb5, 0x00, 0xd0, 0x3d, 0x02,
  0xb2, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e,
  0x44, 0xae, 0x42, 0x60, 0x82
]);

// ICO container wrapping the PNG
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0); // Reserved
icoHeader.writeUInt16LE(1, 2); // Type 1 (ICO)
icoHeader.writeUInt16LE(1, 4); // 1 Image

const icoDir = Buffer.alloc(16);
icoDir.writeUInt8(16, 0); // Width
icoDir.writeUInt8(16, 1); // Height
icoDir.writeUInt8(0, 2);  // Colors
icoDir.writeUInt8(0, 3);  // Reserved
icoDir.writeUInt16LE(1, 4); // Planes
icoDir.writeUInt16LE(32, 6); // BPP
icoDir.writeUInt32LE(pngBuffer.length, 8); // Size
icoDir.writeUInt32LE(22, 12); // Offset (6 + 16 = 22)

const icoFile = Buffer.concat([icoHeader, icoDir, pngBuffer]);
fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoFile);
fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), icoFile);

console.log('Successfully generated favicon.ico and icon.svg in public/ and src/app/');

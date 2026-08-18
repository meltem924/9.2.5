import fs from 'fs';
import path from 'path';

const dist = './dist';

// dist klasörünü temizle ve oluştur
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

// Kopyalanacak tekil dosyalar
const filesToCopy = [
  'index.html',
  'styles.css',
  'scorm-api-wrapper.js',
  'imsmanifest.xml'
];

// Kopyalanacak dizinler
const dirsToCopy = ['img', 'js'];

for (const file of filesToCopy) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(dist, file));
  }
}

for (const dir of dirsToCopy) {
  if (fs.existsSync(dir)) {
    fs.cpSync(dir, path.join(dist, dir), { recursive: true });
  }
}

// GitHub Pages için Jekyll işlemesini devre dışı bırak
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

console.log('Build successfully completed for dist/.');

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cria pasta se não existir
const pastaUploads = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(pastaUploads)) {
  fs.mkdirSync(pastaUploads, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pastaUploads);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });

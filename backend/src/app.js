import express from 'express';
import cors from 'cors';

import usuarioRoutes from './routes/usuarioRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import logger  from 'morgan';

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/', usuarioRoutes);
app.use('/admin', adminRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..','public', 'uploads')));


export default app;

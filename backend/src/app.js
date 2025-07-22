import express from 'express';
import cors from 'cors';

import cookieParser from 'cookie-parser';

import usuarioRoutes from './routes/usuarioRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';
import logger  from 'morgan';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cookieParser());
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

import express from 'express';
import { getUsuarios, loginUsuario, cadastroUsuario } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', getUsuarios);

router.post('/login', loginUsuario);

router.post('/cadastro', cadastroUsuario);

export default router;
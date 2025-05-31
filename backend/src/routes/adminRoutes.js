import express from 'express';
import { loginAdmin, getUsuarios, getCategorias, getnovaCategoria, postnovaCategoria, getatualizarCategoria, postAtualizarCategoria, excluirCategoria } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/usuarios', getUsuarios);
router.get('/categorias', getCategorias);
router.get('/nova-categoria', getnovaCategoria);
router.post('/nova-categoria', postnovaCategoria);
router.get('/atualizar-categoria/:id', getatualizarCategoria);
router.post('/atualizar-categoria/:id', postAtualizarCategoria);
router.get('/excluir-categoria/:id', excluirCategoria);

export default router;

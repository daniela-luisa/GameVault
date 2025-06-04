import express from 'express';
import { loginAdmin, getUsuarios, getCategorias, getnovaCategoria, postnovaCategoria, getatualizarCategoria, postAtualizarCategoria, excluirCategoria, getNovoUsuario, postNovoUsuario, excluirUsuario } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);

router.get('/categorias', getCategorias);
router.get('/nova-categoria', getnovaCategoria);
router.post('/nova-categoria', postnovaCategoria);
router.get('/atualizar-categoria/:id', getatualizarCategoria);
router.post('/atualizar-categoria/:id', postAtualizarCategoria);
router.get('/excluir-categoria/:id', excluirCategoria);

router.get('/usuarios', getUsuarios);
router.get('/novo-usuario',getNovoUsuario);
router.post('/novo-usuario', postNovoUsuario);
router.get('/excluir-usuario/:id', excluirUsuario);


export default router;

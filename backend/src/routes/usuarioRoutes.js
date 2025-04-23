import express from 'express';
import { getUsuarios, loginUsuario, cadastroUsuario, getCategorias, salvarCategorias, getUsu_categ_pref} from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/login', loginUsuario);
router.post('/cadastro', cadastroUsuario);
router.get('/categorias', getCategorias);
router.post('/salvar-categorias', salvarCategorias);
router.get('/categorias_usuario', getUsu_categ_pref );

export default router;
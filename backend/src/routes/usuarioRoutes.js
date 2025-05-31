import express from 'express';
import { getUsuarios, loginUsuario, cadastroUsuario, getCategorias, salvarCategorias} from '../controllers/usuarioController.js';
import { getUsu_categ_pref, getUsuario, getJogos } from '../controllers/usuarioController.js';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/login', loginUsuario);
router.post('/cadastro', cadastroUsuario);
router.get('/categorias', getCategorias);
router.post('/salvar-categorias', salvarCategorias);
router.get('/categorias_usuario', getUsu_categ_pref );
router.get('/perfil/:id', getUsuario);
router.get('/jogos', getJogos);

export default router;
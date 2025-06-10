import express from 'express';
import { loginUsuario, cadastroUsuario, getCategorias, salvarCategorias, uploadPerfil} from '../controllers/usuarioController.js';
import { getUsu_categ_pref, getUsuario, getJogos, verificarLogin} from '../controllers/usuarioController.js';
import { upload } from '../multer.js';
const router = express.Router();

router.post('/login',loginUsuario);
router.post('/cadastro', cadastroUsuario);
router.get('/categorias', verificarLogin,  getCategorias);
router.post('/salvar-categorias', salvarCategorias);
router.get('/categorias_usuario',  getUsu_categ_pref );
router.get('/perfil/:id',verificarLogin, getUsuario);
router.post('/perfil/:id/foto', upload.single('foto'), uploadPerfil);
router.get('/jogos',verificarLogin,  getJogos);

export default router;
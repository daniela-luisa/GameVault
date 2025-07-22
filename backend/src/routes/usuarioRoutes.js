import express from 'express';
import { loginUsuario, cadastroUsuario, salvarCategorias, uploadPerfil, logOut, home, getFavoritos, postFavoritar, getDeletarFavorito} from '../controllers/usuarioController.js';
import { getUsu_categ_pref, getUsuario} from '../controllers/usuarioController.js';
import { upload } from '../multer.js';
const router = express.Router();
const app = express();
app.use('/uploads', express.static('uploads'));

import { verificarToken } from '../../middleware/auth.js';

router.post('/login',loginUsuario);
router.get('/logout', logOut);
router.post('/cadastro', cadastroUsuario);
router.post('/salvar-categorias', salvarCategorias);
router.get('/categorias_usuario',  getUsu_categ_pref );

router.get('/home/:id', verificarToken, home);
router.post('/favoritar', postFavoritar)
router.get('/excluir-favorito/:id_usuario/:id_jogo', getDeletarFavorito)

router.get('/perfil/:id',verificarToken, getUsuario);
router.post('/perfil/:id/foto', upload.single('foto'), uploadPerfil);

router.get('/favoritos/:id', getFavoritos);

export default router;
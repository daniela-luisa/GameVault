import express from 'express';
import { loginAdmin, getUsuarios, getCategorias, getnovaCategoria, postnovaCategoria, getatualizarCategoria, postAtualizarCategoria, excluirCategoria, getNovoUsuario, postNovoUsuario, excluirUsuario, getAtualizarUsuario, postAtualizarUsuario, getPreferencias, getNovaPreferencia, postNovaPreferencia, excluirPreferencia, getJogos, getNovoJogo, postNovoJogo, getAtualizarJogo, postAtualizarJogo, excluirJogo, getCategoriasJogo, getNovaCategoriaJogo, postNovaCategoriaJogo, excluirCategoriaDoJogo} from '../controllers/adminController.js';
import { upload } from '../multer.js';

const router = express.Router();

router.post('/login', loginAdmin);

//Categorias
router.get('/categorias', getCategorias);//testado
router.get('/nova-categoria', getnovaCategoria);//testado
router.post('/nova-categoria', postnovaCategoria);// testado
router.get('/atualizar-categoria/:id', getatualizarCategoria);// testado
router.post('/atualizar-categoria/:id', postAtualizarCategoria);// testado
router.get('/excluir-categoria/:id', excluirCategoria);// nn consegui, comentado

//Usuarios
router.get('/usuarios', getUsuarios);//testado
//----
router.get('/novo-usuario',getNovoUsuario);//testado
router.post('/novo-usuario', postNovoUsuario);//testado
router.get('/atualizar-usuario/:id', getAtualizarUsuario);//testado, menos o tratamento de erro
router.post('/atualizar-usuario/:id', postAtualizarUsuario);
router.get('/excluir-usuario/:id', excluirUsuario);
//---
router.get('/preferencias/:id', getPreferencias);//testado, com o erro nn aprovado no teste
router.get('/nova-preferencia/:id', getNovaPreferencia);
router.post('/nova-preferencia/:id', postNovaPreferencia);
router.get('/excluir-preferencia/:id_usuario/:id_categoria', excluirPreferencia);

//Jogos
router.get('/jogos', getJogos);
//----
router.get('/novo-jogo',getNovoJogo);
router.post('/novo-jogo', upload.single('capa'), postNovoJogo);
router.get('/atualizar-jogo/:id', getAtualizarJogo);
router.post('/atualizar-jogo/:id',upload.single('capa'), postAtualizarJogo);
router.get('/excluir-jogo/:id', excluirJogo);
//----
router.get('/categorias-jogo/:id', getCategoriasJogo);
router.get('/nova-categoria-jogo/:id', getNovaCategoriaJogo);
router.post('/nova-categoria-jogo/:id', postNovaCategoriaJogo);
router.get('/excluir-categoria-jogo/:id_jogo/:id_categoria', excluirCategoriaDoJogo);


export default router;

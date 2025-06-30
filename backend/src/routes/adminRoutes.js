import express from 'express';
import { loginAdmin, getUsuarios, getCategorias, getnovaCategoria, postnovaCategoria, getatualizarCategoria, postAtualizarCategoria, excluirCategoria, getNovoUsuario, postNovoUsuario, excluirUsuario, getAtualizarUsuario, postAtualizarUsuario, getPreferencias, getNovaPreferencia, postNovaPreferencia, excluirPreferencia, getJogos, getNovoJogo, postNovoJogo, getAtualizarJogo, postAtualizarJogo, excluirJogo} from '../controllers/adminController.js';

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
router.post('/novo-jogo', postNovoJogo);
router.get('/atualizar-jogo/:id', getAtualizarJogo);
router.post('/atualizar-jogo/:id', postAtualizarJogo);
router.get('/excluir-jogo/:id', excluirJogo);
//----



export default router;

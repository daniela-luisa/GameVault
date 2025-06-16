import express from 'express';
import { loginAdmin, getUsuarios, getCategorias, getnovaCategoria, postnovaCategoria, getatualizarCategoria, postAtualizarCategoria, excluirCategoria, getNovoUsuario, postNovoUsuario, excluirUsuario, getAtualizarUsuario, postAtualizarUsuario, getPreferencias, getNovaPreferencia, postNovaPreferencia, excluirPreferencia} from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', loginAdmin);

//Categorias
router.get('/categorias', getCategorias);
router.get('/nova-categoria', getnovaCategoria);// testado
router.post('/nova-categoria', postnovaCategoria);
router.get('/atualizar-categoria/:id', getatualizarCategoria);
router.post('/atualizar-categoria/:id', postAtualizarCategoria);
router.get('/excluir-categoria/:id', excluirCategoria);

//Usuarios
router.get('/usuarios', getUsuarios);//testado
//----------
router.get('/novo-usuario',getNovoUsuario);
router.post('/novo-usuario', postNovoUsuario);
router.get('/atualizar-usuario/:id', getAtualizarUsuario)
router.post('/atualizar-usuario/:id', postAtualizarUsuario)
router.get('/excluir-usuario/:id', excluirUsuario);
//--------------
router.get('/preferencias/:id', getPreferencias);
router.get('/nova-preferencia/:id', getNovaPreferencia);
router.post('/nova-preferencia/:id', postNovaPreferencia);
router.get('/excluir-preferencia/:id_usuario/:id_categoria', excluirPreferencia);


export default router;

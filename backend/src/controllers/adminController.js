import { autenticarAdmin, listarUsuarios, adminBuscarCategoriasJogos, adminBuscarCategoria, adminInserirCategoria, adminBuscarCategoriaPorCodigo, adminAtualizarCategoria, adminVerificarQtdJogosCategoria, adminExcluirCategoria,adminExistePreferenciaCategoria, adminInserirUsuario, buscarNomeUsuario, adminExcluirUsuario, adminBuscarUsuarioPorCodigo, adminAtualizarUsuario, buscarPreferencias, deletarPreferencia} from '../models/adminModel.js';

import {buscarCategorias, categoriaEscolhida} from '../models/usuarioModel.js';

export async function loginAdmin(req, res) {
  const { email, senha } = req.body;

  try {
    const admin = await autenticarAdmin(email, senha);
    
    if (admin.id_admin) {
      global.adminCodigo = admin.id_admin;
      global.admNome = admin.email;
      res.json({ mensagem: 'Login de admin bem-sucedido', admin });
    } else {
      res.status(401).json({ erro: 'Email ou senha inválidos' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login de admin'});
  }
}

export async function getCategorias(req, res, next) {
    try {
        const categorias = await adminBuscarCategoriasJogos();

        res.json({
            admNome: global.admNome,
            categorias,
            mensagem: "",
            sucesso: false
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar categorias",
            sucesso: false,
            erro: error.message
        });
    }}

 /* GET nova categoria */
export async function getnovaCategoria(req, res, next) {
   res.json({
            admNome: global.admNome,
            mensagem: null,
            sucesso: false
        });
};

export async function postnovaCategoria(req, res, next) {
 
  const {nome} = req.body;

  // validação de campos vazios
  if (!nome)
  {
    return res.json({
      admNome: global.admNome,
      mensagem: "Todos os campos devem ser preenchidos",
      sucesso: false
    });
  }

  // validação de categoria duplicada
  const catExistente = await adminBuscarCategoria(nome);
  if (catExistente)
  {
      return res.json({   
      admNome : global.admNome,
      mensagem : "Categoria já existe.",
      sucesso : false
    });
  }

  // a categoria pode ser gravada
  await adminInserirCategoria(nome);
    return res.json({    
    admNome : global.admNome,
    mensagem : "Categoria cadastrada com sucesso.",
    sucesso : true
  });
};

// get atualizar categoria
export async function getatualizarCategoria (req,res,next) {
  const id_catego = req.params.id;

  const categoria = await adminBuscarCategoriaPorCodigo(id_catego);
  if (!categoria)  
  {
    return res.json({
      admNome : global.admNome,
      mensagem : 'Categoria não encontrada.',
      sucesso : false
    });
  }

  res.json({
    admNome : global.admNome,
    categoria,
    mensagem : null,
    sucesso : false
  });
}

/* POST /atualizarcategoria/n */
export async function postAtualizarCategoria(req, res, next) {
  const id_catego = req.params.id;
  const {nome} = req.body;

  // validação de nome vazio
  if (!nome)
  {
    return res.json({
      admNome : global.admNome,
      categoria : {id_catego, nome},
      mensagem : "Todos os campos são obrigatórios.",
      sucesso : false
    });
  }

  // validação de nome duplicado
  const categoriaExistente = await adminBuscarCategoria(nome);
  if (categoriaExistente && categoriaExistente.id_catego!=id_catego)
  {
    return res.json({
      admNome : global.admNome,
      categoria : {id_catego, nome},
      mensagem : "Categoria já existe.",
      sucesso : false
    });
  }

  await adminAtualizarCategoria(id_catego, nome);
  res.json({
    admNome : global.admNome,
    categoria : {id_catego, nome},
    mensagem : "Categoria atualizada com sucesso.",
    sucesso : true
  });
};


/* GET /excluircategoria/n */
export async function excluirCategoria(req, res, next){
  const id_catego = req.params.id;

  // valida a existencia da categoria
  const categoria = await adminBuscarCategoriaPorCodigo(id_catego);
  if (!categoria)
  {
    const categorias = await adminBuscarCategoriasJogos();
    return res.json({
      admNome : global.admNome,
      categorias,
      mensagem : "Categoria não existe.",
      sucesso : false
    });
  }

  // valida se a categoria não possui videos
  const totalJogos = await adminVerificarQtdJogosCategoria(id_catego);
  if (totalJogos > 0)
  {
    const categorias = await adminBuscarCategoriasJogos();
    return res.json({
      admNome : global.admNome,
      categorias,
      mensagem : "Categoria possui jogos atrelados.",
      sucesso : false
    });
  }

    // valida se a categoria não possui prefrencias
  const totalPreferencias = await adminExistePreferenciaCategoria(id_catego);
if (totalPreferencias > 0) {
  const categorias = await adminBuscarCategoriasJogos();
  return res.json({
    admNome: global.admNome,
    categorias,
    mensagem: "Categoria não pode ser excluída pois está associada a usuários.",
    sucesso: false
  });
}


   // apaga a categoria
  await adminExcluirCategoria(id_catego);
  const categorias = await adminBuscarCategoriasJogos();
    return res.json({
    admNome : global.admNome,
    categorias,
    mensagem : "Categoria excluida com sucesso.",
    sucesso : true
  });
};

//---------------------------------

// GERENCIAMENTO USUARIOS

//----------------------------------

// get da pagina de usuario
export async function getUsuarios(req, res){
try {
  const usuarios = await listarUsuarios();   
  const preferencias = await buscarPreferencias(usuarios[0]?.id_usuario || 0); // Padrão para as pref. do primeiro usuário
    res.json({
      admNome: global.admNome,
      usuarios,
      preferencias,
      mensagem: null,
      sucesso: false,
    });
  } 
  catch (erro) {
    console.error(erro);
    res.json({
      admNome: global.admNome,
      usuarios: [],
      preferencias: [],
      mensagem: 'Erro ao carregar usuários.',
      sucesso: false,
    });
  }
}

// get da pagina de novo usuario
export function getNovoUsuario(req,res){
  res.json({
    admNome: global.admNome,
    mensagem: null,
    sucesso: false,
  });
}

/* POST novo usuário */
export async function postNovoUsuario(req, res){
      const { nome, nomeUsuario, dtNascimento, email, senha } = req.body;
  if (!email || !senha || !nome || !nomeUsuario || !dtNascimento) {
    return res.json({
      admNome: global.admNome,
      mensagem: 'Todos os campos são obrigatórios.',
      sucesso: false,
    });
  }

  const nomeUsuarioExistente = await buscarNomeUsuario(nomeUsuario);
  if(nomeUsuarioExistente){
    return res.json({
      admNome: global.admNome,
      mensagem: 'Nome de usuario ja existe',
      sucesso: false,
    });
  }
  try {
    await adminInserirUsuario(nome, nomeUsuario, dtNascimento, email, senha);
    res.json({
      admNome: global.admNome,
      mensagem: 'Usuário cadastrado com sucesso!',
      sucesso: true,
    });
  } 
  catch (erro) {
    console.error(erro);
    res.json({
      admNome: global.admNome,
      mensagem: 'Erro ao Inserir usuário.',
      sucesso: false,
    });
  }
}

// GET editar usuario
export async function getAtualizarUsuario(req, res){
const id_usuario = req.params.id;
  try {
    const usuario = await adminBuscarUsuarioPorCodigo(id_usuario); 
    if (!usuario) {
      return res.json({
        admNome: global.admNome,
        mensagem: 'Usuário não encontrado.',
        sucesso: false,
      });
    }
    res.json({
      admNome: global.admNome,
      usuario,
      mensagem: null,
      sucesso: false,
    });
  } 
  catch (erro) {
    console.error(erro);
    res.json({
      admNome: global.admNome,
      mensagem: 'Erro ao carregar usuário.',
      sucesso: false,
    });
  }
}


/* POST alteração de usuário */
export async function postAtualizarUsuario(req, res) {
 const id_usuario = req.params.id;
 const { nome, nomeUsuario, dtNascimento, email, senha } = req.body;
  if (!email || !senha || !nome || !nomeUsuario || !dtNascimento) {
    return res.json({
      admNome: global.admNome,
      usuario: { id_usuario,nome: nome, nick: nomeUsuario,dt_nasc : dtNascimento, email: email, senha: senha },
      mensagem: 'Todos os campos são obrigatórios.',
      sucesso: false,
    });
  }
  try {
    await adminAtualizarUsuario(id_usuario, nome, nomeUsuario, dtNascimento, email, senha);
    res.json({
      admNome: global.admNome,
      usuario: { id_usuario,nome: nome, nick: nomeUsuario, dt_nasc : dtNascimento, email: email, senha: senha },
      mensagem: 'Usuário atualizado com sucesso!',
      sucesso: true,
    });
  } 
  catch (erro) {
    console.error(erro);
    res.json({
      admNome: global.admNome,
      usuario: { id_usuario,nome: nome, nick: nomeUsuario,dt_nasc : dtNascimento, email: email, senha: senha },
      mensagem: 'Erro ao atualizar usuário.',
      sucesso: false,
    });
  }
}


/* GET excluir usuário */
export async function excluirUsuario(req,res){
 const id = req.params.id;
  try {
    await adminExcluirUsuario(id);
    const usuarios = await listarUsuarios();
    return res.json({
    admNome : global.admNome,
    usuarios,
    mensagem : "Usuario excluido com sucesso.",
    sucesso : true
  });
  } 
  catch (erro) {
    // console.error(erro);
    res.json({
      admNome: global.admNome,
      usuarios: await listarUsuarios(),
      mensagem: erro.message || 'Erro ao excluir usuário.',
      sucesso: false,
    });
  }
}

//-------------------

//PREFERENCIAS

//------------------

//Get de preferencias 
export async function getPreferencias(req, res) {
  const id_usuario = req.params.id;
  try {
    const usuarios = await listarUsuarios();
    const preferencias = await buscarPreferencias(id_usuario);

    res.json({
      admNome: global.admNome,
      usuarios,
      preferencias,
      selectedUsuario: parseInt(id_usuario),
      mensagem: null,
      sucesso: true,
    });
  } catch (erro) {
    console.error(erro);
    res.json({
      admNome: global.admNome,
      usuarios: [],
      preferencias: [],
      mensagem: 'Erro ao carregar preferências.',
      sucesso: false,
    });
  }
}

//get de nova preferencia
export async function getNovaPreferencia(req, res) {
 const id_usuario  = req.params.id;
  try {
    const categorias = await buscarCategorias();
    const preferencias = await buscarPreferencias(id_usuario);
    res.json({
      admNome: global.admNome,
      id_usuario,
      categorias,
      preferencias,
      mensagem: null,
      sucesso: true
    });
  } catch (erro) {
    console.error('Erro ao buscar categorias:', erro);
    res.status(500).json({
      mensagem: 'Erro ao carregar categorias.',
      sucesso: false,
    });
  }
}

//post de nova preferencia
export async function postNovaPreferencia(req, res) {
  const id_usuario = req.params.id;
  const { categorias } = req.body;
  try {
    await categoriaEscolhida(id_usuario, categorias); 
    res.json({ 
      admNome: global.admNome,
      id_usuario,
      mensagem: 'Preferências salvas com sucesso!',
      sucesso: true
    });
  } catch (erro) {
   console.error("Erro detalhado:", erro);
res.status(500).json({
  erro: 'Erro ao salvar preferências.',
  detalhes: erro.message || erro.sqlMessage || 'Erro desconhecido.'
});
  }
}

/* GET delete preferencias */
export async function excluirPreferencia(req, res) {
  const { id_usuario, id_categoria } = req.params;

  try {
    await deletarPreferencia(id_usuario, id_categoria);
    res.json({
      admNome: global.admNome,
      usuarios: await listarUsuarios(),
      preferencias : await buscarPreferencias(id_usuario),
      mensagem: 'Preferência excluída com sucesso.',
      sucesso: true
    });
  } catch (erro) {
    console.error(erro);
    res.json({
      admNome: global.admNome,
      usuarios: await listarUsuarios(),
      preferencias: [],
      mensagem: 'Erro ao excluir preferencia.',
      sucesso: false,
    });
  }
}




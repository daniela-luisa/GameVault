import { autenticarAdmin, listarUsuarios, adminBuscarCategoriasJogos, adminBuscarCategoria, adminInserirCategoria, adminBuscarCategoriaPorCodigo, adminAtualizarCategoria, adminVerificarQtdJogosCategoria, adminExcluirCategoria,adminExistePreferenciaCategoria} from '../models/adminModel.js';

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

export async function getUsuarios(req, res) {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao listar usuários', detalhes: error.message });
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
    return res.jason({
      admNome : global.admNome,
      categorias,
      mensagem : "Categoria não existe.",
      sucesso : false
    });
  }

  // valida se a categoria não possui videos
  const totalVideos = await adminVerificarQtdJogosCategoria(id_catego);
  if (totalVideos > 0)
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

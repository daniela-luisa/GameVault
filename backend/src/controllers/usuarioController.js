import { buscarCategorias, categoriaEscolhida, buscarUsu_categ_pref} from '../models/usuarioModel.js';
import { autenticarUsuario, buscarUsuario, buscarJogos, buscarRecomendacoes, buscarFavoritos, buscarJogoCateg, favoritar, deletarFavorito,invalidarToken} from '../models/usuarioModel.js';
import { criarUsuario, inserirFoto } from '../models/usuarioModel.js';
import { gerarToken } from '../../utils/jwt.js';


export async function getUsu_categ_pref(req, res, next){
  try {
    const usu_categ_pref = await buscarUsu_categ_pref();
    res.json(usu_categ_pref);

  }catch (error){
    res.status(500).json({ erro: 'Erro ao buscar categorias favoritas do usuario' });

  }
}

export async function home(req, res, next){
   try {
  const id_usuario = parseInt(req.params.id);
  
  const idDoToken = req.usuario.id_usuario;

  // Impedir acesso se os IDs não batem
  if (id_usuario !== idDoToken) {
    return res.status(403).json({ erro: 'Acesso negado: usuário inválido.' });
  }

  const categorias = await buscarCategorias();
  const jogos = await buscarJogos();
  const favoritos = await buscarFavoritos(id_usuario);
  const recomendacoes = await buscarRecomendacoes(id_usuario); 
  const relacoes = await buscarJogoCateg();
  
  res.json({id_usuario: id_usuario,
    categorias,
    jogos,
    favoritos,
    relacoes,
    recomendacoes
  });
    }catch (error){
    res.status(500).json({ erro: 'Erro' });
  }
}

export async function postFavoritar(req, res, next){
    const { id_usuario, id_jogo } = req.body;
try {
  await favoritar(id_usuario, id_jogo);

    res.json({ sucesso: true, mensagem: 'Favorito salvo com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucesso: false, mensagem: 'Erro ao favoritar.' });
  }

}

/* GET logout de usuário */
export async function logOut(req, res, next){
 res.clearCookie('token');
  
  // Opcional: Adiciona token à blacklist
  const token = req.cookies.token;
  if (token) {
    invalidarToken(token).catch(err => {
      console.log('Erro ao invalidar token:', err);
    });
  }
   res.status(200).json({ mensagem: "Logout efetuado" });
}


// post login
export async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await autenticarUsuario({email, senha});

    if (usuario) {
      const token = gerarToken(usuario);

      // Define cookie com o token
      res.cookie('token', token, {
      httpOnly: true, // Não acessível via JavaScript
      secure: process.env.NODE_ENV === 'production', // HTTPS em produção
      maxAge: 24 * 60 * 60 * 1000 // 24 horas
      });
      console.log('Login realizado com sucesso para:', email);

      res.json({ mensagem: 'Login bem-sucedido', token, usuario });
      
    } else {
      res.status(401).json({ erro: 'Email ou senha inválidos' });
    }
  } catch (error) {
  console.error('Erro ao fazer login:', error); // ← mostra o erro real no terminal
  res.status(500).json({ erro: 'Erro ao fazer login' });
}
}

  //post cadastro
  export async function cadastroUsuario(req, res) {
      const { nome, nomeUsuario, dtNascimento, email, senha } = req.body;
    
      try {
        const novoUsuario = await criarUsuario(nome, nomeUsuario, dtNascimento, email, senha);
        if (novoUsuario) {
          res.json({ mensagem: 'Cadastro bem-sucedido', novoUsuario });
        } else {
          res.status(401).json({ erro: 'Erro ao cadastrar usuario' });
        }
      } catch (error) {
        res.status(500).json({ erro: 'Erro ao fazer cadastro' });
      }
    }

  //post salvar as categorias pro usuario
  export async function salvarCategorias(req, res) {
    const { id_usuario, categorias } = req.body;  
    try {
      await categoriaEscolhida(id_usuario, categorias);
      return res.status(200).json({ mensagem: 'Categorias salvas com sucesso!' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao salvar categorias', detalhes: error.message });
    }
  }

  //para o perfil do usuario
  export async function getUsuario (req, res, next){
    const  id  = parseInt(req.params.id);
    const idToken = req.usuario.id_usuario;

  // Impedir acesso se os IDs não batem
 if (id !== idToken) {
  return res.status(401).json({ erro: 'Token inválido para este usuário' });
}

    try {
      const usuario = await buscarUsuario(id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.json(usuario);
      console.log('Dados do usuário:', usuario);

    } catch (error) {
      console.error('Erro ao buscar o usuário:', error);
    }
  }

//post para upload da foto de perfil
export async function uploadPerfil(req, res, next){
  const { id } = req.params;
  const foto = req.file ? req.file.filename : null;

  if (!foto) return res.status(400).json({ erro: 'Arquivo não enviado' });
 await inserirFoto(id, foto);
res.json({foto});

}

export async function getFavoritos(req, res, next){
  const id = parseInt(req.params.id);
  const idToken = req.usuario.id_usuario;

  // Impedir acesso se os IDs não batem
 if (id !== idToken) {
  return res.status(401).json({ erro: 'Token inválido para este usuário' });
}

  const favoritos = await buscarFavoritos(id);

  res.json({ favoritos, mensagem: null, sucesso: false});
}

export async function getDeletarFavorito(req, res, next){
  const {id_usuario, id_jogo} = req.params;

  try {
    await deletarFavorito(id_usuario, id_jogo);
    res.json({
      favoritos: await buscarFavoritos(id_usuario),
      mensagem: 'Jogo retirado dos favoritos',
      sucesso: true     
    })

  }catch{
    console.error(erro);
     res.json({
     favoritos: await buscarFavoritos(id_usuario),
     mensagem: 'Erro ao retirar jogo dos favoritos',
     sucesso: false     
    })
  }
}



  export function verificarLogin(req, res, next) {
  if (!global.usuarioEmail || global.usuarioEmail === "") {
    return res.status(401).json({ mensagem: 'Usuário não autenticado' });
  }
  next();
}



// /* POST cadastro de avaliação */
// export async function postAvaliar(req, res) {
//   const { jogabilidade, grafico, historia } = req.body;
//   const { id_usuario, id_jogo } = req.params;

//   if (!jogabilidade || !grafico || !historia) {
//     return res.json({
//       mensagem: 'Todos os campos são obrigatórios.',
//       sucesso: false,
//     });
//   }
//   try {
//     await avaliarJogo({jogabilidade,grafico,historia,id_usuario,id_jogo});

//     res.json({
//       mensagem: 'Sua avaliação foi enviada com sucesso!',
//       sucesso: true,
//     });
//   } catch (erro) {
//     console.error(erro);
//     res.json({
//       mensagem: 'Erro ao enviar avaliação.',
//       sucesso: false,
//     });
//   }
// }

// /* GET jogos por categoria */
// export async function getJogosPorCategoria(req, res) {
//   const { nome } = req.params;
//   try {
//     const jogos = await buscarJogosPorCategoria(nome);

//     res.json({
//       mensagem: `Jogos da categoria "${nome}"`,
//       sucesso: true,
//       jogos: jogos,
//     });
//   } catch (erro) {
//     console.error(erro);
//     res.json({
//       mensagem: 'Erro ao buscar jogos por categoria.',
//       sucesso: false,
//       jogos: []
//     });
//   }
// }


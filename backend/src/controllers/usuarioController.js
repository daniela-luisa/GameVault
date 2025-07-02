import { buscarCategorias, categoriaEscolhida, buscarUsu_categ_pref} from '../models/usuarioModel.js';
import { autenticarUsuario, buscarUsuario, buscarJogos } from '../models/usuarioModel.js';
import { criarUsuario, inserirFoto } from '../models/usuarioModel.js';

//get categorias
export async function getCategorias(req, res, next){
  try {
    const categorias = await buscarCategorias();
    res.json(categorias);

  }catch (error){
    res.status(500).json({ erro: 'Erro ao buscar categorias' });

  }
}
export async function getUsu_categ_pref(req, res, next){
  try {
    const usu_categ_pref = await buscarUsu_categ_pref();
    res.json(usu_categ_pref);

  }catch (error){
    res.status(500).json({ erro: 'Erro ao buscar categorias favoritas do usuario' });

  }
}

// post login
export async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await autenticarUsuario(email, senha);

    if (usuario) {
      res.json({ mensagem: 'Login bem-sucedido', usuario });
      
     global.usuarioCodigo = usuario.id_usuario;
     global.usuarioEmail = usuario.email;
    } else {
      res.status(401).json({ erro: 'Email ou senha inválidos' });
    }
  } catch (error) {
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
    console.log(req.body);
    try {
      await categoriaEscolhida(id_usuario, categorias);
      return res.status(200).json({ mensagem: 'Categorias salvas com sucesso!' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro ao salvar categorias', detalhes: error.message });
    }
  }

  //para o perfil do usuario
  export async function getUsuario (req, res, next){
    const { id } = req.params;
    console.log('ID recebido:', id);
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

  export async function getJogos (req, res, next){
    try{
      const jogos = await buscarJogos();
      res.json(jogos);

    }catch{
      res.status(500).json({ erro: 'Erro ao buscar jogos' });
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


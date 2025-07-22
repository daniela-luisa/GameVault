import { conectar } from '../config/db.js';
import bcrypt from 'bcryptjs';

export async function autenticarUsuario(usuario) {
  const conexao = await conectar();
  const [usuarioEncontrado] = await conexao.query('SELECT * FROM usuario WHERE email = ?',[usuario.email]);

  if (!usuarioEncontrado || usuarioEncontrado.length === 0) {
    return null;
  }

  const user = usuarioEncontrado[0];
  let senhaValida = false;

  // 🔍 log útil
  console.log('Senha no banco:', user.senha);
  console.log('Senha digitada:', usuario.senha);

  if (user.senha.startsWith('$2a$') || user.senha.startsWith('$2b$')) {
    senhaValida = await bcrypt.compare(usuario.senha, user.senha);
  } else {
    senhaValida = user.senha === usuario.senha;

    if (senhaValida) {
      const novoHash = await bcrypt.hash(usuario.senha, 10);
      await atualizarSenhaUsuario(user.id_usuario, novoHash);
      user.senha = novoHash;
    }
  }

  if (!senhaValida) {
    return null;
  }

  const [categorias] = await conexao.query('SELECT * FROM usu_categ_pref WHERE id_usuario = ?',[user.id_usuario]);
  const cadastro2Completo = Array.isArray(categorias) && categorias.length > 0;

  return { id_usuario: user.id_usuario,email: user.email, cadastro2Completo};
}


  async function atualizarSenhaUsuario(usucodigo, novoHash) {
    const conexao = await conectar();
    const sql = "UPDATE usuario SET senha = ? WHERE id_usuario = ?;";
    await conexao.query(sql, [novoHash, usucodigo]);
}

  export async function criarUsuario(nome, nomeUsuario, dtNascimento, email, senha) {
    const conexao = await conectar();
    const [usuario] = await conexao.query('insert into usuario(nome, nick, dt_nasc, email, senha) values (?,?,?,?,?)',[nome, nomeUsuario, dtNascimento, email, senha]);
    return usuario;
  }
  
export async function buscarCategorias(){
  const conexao = await conectar();
  const [listaCategorias] = await conexao.query('select * from categoria');
  return listaCategorias;
}

export async function categoriaEscolhida(id_usuario, categorias) {
  const conexao = await conectar(); 
  const sql = 'insert into usu_categ_pref (id_usuario, id_catego) values ?';
  const valores = categorias.map(categoriaId => [id_usuario, categoriaId]);
  await conexao.query(sql, [valores]);
}

export async function buscarUsu_categ_pref(){
  const conexao = await conectar();
  const [listar] = await conexao.query('select * from usu_categ_pref');
  return listar;
}

export async function buscarUsuario(id){
  const conexao = await conectar();
  const usuario = await conexao.query('select * from usuario where email = ?', [id])
  return usuario[0];
}

// export async function buscarUsuarioPorId(id){
//   const conexao = await conectar();
//   const usuario = await conexao.query('select * from vw_perfil_usuario where ID = ?', [id])
//   return usuario[0];
// }

export async function inserirFoto(id, foto){
  const conexao = await conectar();
  const sql = 'update usuario set foto = ? where id_usuario = ?;';
  await conexao.query(sql, [foto, id]);
}

export async function buscarJogos(){
  const conexao = await conectar();
  const [jogos] = await conexao.query('select * from jogo');
  return jogos;
}

export async function buscarRecomendacoes(id_usuario){
  const conexao = await conectar();
  const sql = `select distinct j.id_jogo, j.capa, j.nome, j.dt_lanca from jogo j inner join jogo_categ jc on jc.id_jogo = j.id_jogo inner join 
  categoria c on c.id_catego = jc.id_catego inner join 
  usu_categ_pref p on p.id_catego = c.id_catego
  inner join usuario u on u.id_usuario = p.id_usuario where p.id_usuario=?;` ;
  const [recomendacoes] = await conexao.query(sql, [id_usuario]);
  return recomendacoes;
}

export async function buscarJogoCateg(){
  const conexao= await conectar();
  const sql = 'select * from jogo_categ';
  const [relacoes] = await conexao.query(sql);
  return relacoes;
}

export async function favoritar(idUsuario, idJogo){
  const conexao = await conectar();
  const sql = 'insert into favorito values (?, ?);';
  await conexao.query(sql, [idUsuario, idJogo]);
}

export async function buscarFavoritos(idUsuario){
  const conexao = await conectar();
  const sql = `select j.id_jogo, j.capa, j.nome, j.dt_lanca from jogo j inner join
  favorito f on f.id_jogo = j.id_jogo inner join
   usuario u on u.id_usuario = f.id_usuario where f.id_usuario = ?;`;
  const [favoritos] = await conexao.query(sql, [idUsuario]);
  return favoritos;
}

export async function deletarFavorito(idUsuario, idJogo){
  const conexao = await conectar();
  const sql = 'delete from favorito where id_usuario=? and id_jogo=?;';
  await conexao.query(sql, [idUsuario, idJogo]);
}


// export async function avaliarJogo(jogabilidade, grafico, historia, id_usuario, id_jogo) {
//   const conexao = await conectar();
//   const sql = 'insert into avaliacao (jogabilidade, grafico, historia, id_usuario, id_jogo) VALUES (?,?,?,?,?);';
//   await conexao.query(sql, [jogabilidade, grafico, historia, id_usuario, id_jogo]);
// }

// export async function buscarJogosPorCategoria(categoria) {
//   const conexao = await conectar();
//   const sql = 'call buscar_jogos_por_categoria(?);';
//   const [resultado] = await conexao.query(sql,[categoria]);
//   return resultado[0];
// }




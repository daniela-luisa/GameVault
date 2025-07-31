import { conectar } from '../config/db.js';
import bcrypt from 'bcryptjs';

export async function autenticarUsuario(usuario) {
  const conexao = await conectar();
  try{
  const [usuarioEncontrado] = await conexao.query('SELECT * FROM usuario WHERE email = ?',[usuario.email]);

  if (!usuarioEncontrado || usuarioEncontrado.length === 0) {
    return null;
  }

  const user = usuarioEncontrado[0];
  let senhaValida = false;

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
   } finally {
    conexao.release();
  }
}

  async function atualizarSenhaUsuario(usucodigo, novoHash) {
    const conexao = await conectar();
    try{
    const sql = "UPDATE usuario SET senha = ? WHERE id_usuario = ?;";
    await conexao.query(sql, [novoHash, usucodigo]);
     } finally {
    conexao.release();
  }
}

  export async function invalidarToken(token) {
    const conexao = await conectar();
    try{
    const sql = "INSERT INTO tokens_invalidados (token) VALUES (?)";
    await conexao.query(sql, [token]);
     } finally {
    conexao.release();
  }
}

  export async function verificarTokenInvalidado(token) {
    const conexao = await conectar();
    try{
    const sql = "SELECT COUNT(*) as count FROM tokens_invalidados WHERE token = ?";
    const [result] = await conexao.query(sql, [token]);
    return result[0].count > 0;
     } finally {
    conexao.release();
  }
}

  export async function limparTokensExpirados() {
    const conexao = await conectar();
    // Remove tokens invalidados há mais de 24 horas
    try{
    const sql = "DELETE FROM tokens_invalidados WHERE data_invalidacao < DATE_SUB(NOW(), INTERVAL 24 HOUR)";
    await conexao.query(sql);
     } finally {
    conexao.release();
  }
}



  export async function criarUsuario(nome, nomeUsuario, dtNascimento, email, senha) {
    const conexao = await conectar();
    try{
    const [usuario] = await conexao.query('insert into usuario(nome, nick, dt_nasc, email, senha) values (?,?,?,?,?)',[nome, nomeUsuario, dtNascimento, email, senha]);
    return usuario;
     } finally {
    conexao.release();
  }
  }
  
export async function buscarCategorias(){
  const conexao = await conectar();
  try{
  const [listaCategorias] = await conexao.query('select * from categoria');
  return listaCategorias;
   } finally {
    conexao.release();
  }
}

export async function categoriaEscolhida(id_usuario, categorias) {
  const conexao = await conectar(); 
  try{
  const sql = 'insert into usu_categ_pref (id_usuario, id_catego) values ?';
  const valores = categorias.map(categoriaId => [id_usuario, categoriaId]);
  await conexao.query(sql, [valores]);
   } finally {
    conexao.release();
  }
}

export async function buscarUsu_categ_pref(){
  const conexao = await conectar();
  try{
  const [listar] = await conexao.query('select * from usu_categ_pref');
  return listar;
   } finally {
    conexao.release();
  }
}

export async function buscarUsuario(id){
  const conexao = await conectar();
  try{
  const usuario = await conexao.query('select * from usuario where id_usuario = ?', [id])
  return usuario[0];
   } finally {
    conexao.release();
  }
}

// export async function buscarUsuarioPorId(id){
//   const conexao = await conectar();
//   const usuario = await conexao.query('select * from vw_perfil_usuario where ID = ?', [id])
//   return usuario[0];
// }

export async function inserirFoto(id, foto){
  const conexao = await conectar();
  try{
  const sql = 'update usuario set foto = ? where id_usuario = ?;';
  await conexao.query(sql, [foto, id]);
   } finally {
    conexao.release();
  }
}

export async function buscarJogos(){
  const conexao = await conectar();
  try{
  const [jogos] = await conexao.query('select * from jogo');
  return jogos;
   } finally {
    conexao.release();
  }
}

export async function buscarRecomendacoes(id_usuario){
  const conexao = await conectar();
  try{
  const sql = `select distinct j.id_jogo, j.capa, j.nome, j.dt_lanca from jogo j inner join jogo_categ jc on jc.id_jogo = j.id_jogo inner join 
  categoria c on c.id_catego = jc.id_catego inner join 
  usu_categ_pref p on p.id_catego = c.id_catego
  inner join usuario u on u.id_usuario = p.id_usuario where p.id_usuario=?;` ;
  const [recomendacoes] = await conexao.query(sql, [id_usuario]);
  return recomendacoes;
   } finally {
    conexao.release();
  }
}

export async function buscarJogoCateg(){
  const conexao= await conectar();
  try{
  const sql = 'select * from jogo_categ';
  const [relacoes] = await conexao.query(sql);
  return relacoes;
   } finally {
    conexao.release();
  }
}

export async function favoritar(idUsuario, idJogo){
  const conexao = await conectar();
  try{
  const sql = 'insert into favorito values (?, ?);';
  await conexao.query(sql, [idUsuario, idJogo]);
   } finally {
    conexao.release();
  }
}

export async function buscarFavoritos(idUsuario){
  const conexao = await conectar();
  try{
  const sql = `select j.id_jogo, j.capa, j.nome, j.dt_lanca from jogo j inner join
  favorito f on f.id_jogo = j.id_jogo inner join
   usuario u on u.id_usuario = f.id_usuario where f.id_usuario = ?;`;
  const [favoritos] = await conexao.query(sql, [idUsuario]);
  return favoritos;
   } finally {
    conexao.release();
  }
}

export async function deletarFavorito(idUsuario, idJogo){
  const conexao = await conectar();
  try{
  const sql = 'delete from favorito where id_usuario=? and id_jogo=?;';
  await conexao.query(sql, [idUsuario, idJogo]);
   } finally {
    conexao.release();
  }
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




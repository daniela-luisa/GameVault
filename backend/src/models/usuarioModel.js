import { conectar } from '../config/db.js';
export async function autenticarUsuario(email, senha) {
    const conexao = await conectar();
    const [usuarioEncontrado] = await conexao.query('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);
    const usuario = usuarioEncontrado[0];
    const [categorias] = await conexao.query('SELECT * FROM usu_categ_pref WHERE id_usuario = ?', [usuario.id_usuario]);
  
    const cadastro2Completo = Array.isArray(categorias) && categorias.length > 0;

    return {id: usuario.id_usuario, email: usuario.email, cadastro2Completo}; 
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
  const usuario = await conexao.query('select * from usuario where id_usuario = ?', [id])
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
  const sql = `select distinct j.nome, j.dt_lanca from jogo j inner join jogo_categ jc on jc.id_jogo = j.id_jogo inner join 
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

export async function buscarFavoritos(idUsuario){
  const conexao = await conectar();
  const sql = `select j.nome, j.dt_lanca from jogo j inner join
  favorito f on f.id_jogo = j.id_jogo inner join
   usuario u on u.id_usuario = f.id_usuario where f.id_usuario = ?;`;
  const [favoritos] = await conexao.query(sql, [idUsuario]);
  return favoritos;
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




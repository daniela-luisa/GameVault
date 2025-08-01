import { conectar } from '../config/db.js';


export async function autenticarAdmin(email, senha) {
    const conexao = await conectar();
    try{
    const sql = "select * from admin where email = ? AND senha = ?;";
    const [adminEncontrado] = await conexao.query(sql, [email, senha]);
    return adminEncontrado && adminEncontrado.length > 0 ? adminEncontrado[0] : {};
    }finally {
    conexao.release(); // devolve para o pool
  }
}

export async function listarUsuarios() {
  const conexao = await conectar();
   try{
  const [usuariosEncontrado] = await conexao.query('select * from usuario order by email');
  return usuariosEncontrado;
  }finally {
    conexao.release(); // devolve para o pool
  }
}

export async function adminBuscarCategoriasJogos() {
    const conexao = await conectar();
    try{
     const sql = `select c.id_catego, c.nome, 
           count(cj.id_jogo) as qtd_jogos,
           (select count(*) from usu_categ_pref up where up.id_catego = c.id_catego) as qtd_preferencias
    from categoria c
    left join jogo_categ cj on c.id_catego = cj.id_catego
    group by c.id_catego, c.nome
    order by c.nome;
  `;

    const [categorias] = await conexao.query(sql);
    return categorias;
    }finally {
    conexao.release(); // devolve para o pool
  }
}
// para a função de atualizar categoria para validação, e da função de nova categoria, validação tambem.
export async function adminBuscarCategoria(nome) {
    const conexao = await conectar();
    try{
    const sql = 'select * from categoria where nome = ?';
    const [categoria] = await conexao.query(sql, [nome]);
     if (categoria.length > 0) return categoria[0] ;
     else return null;
    }finally {
    conexao.release(); // devolve para o pool
  }
}

export async function adminInserirCategoria(nome) {
    const conexao = await conectar();
    try{
    const sql = 'insert into categoria (nome) values (?);';

    await conexao.query(sql, [nome]);
    }finally {
    conexao.release(); // devolve para o pool
  }
  }

export async function adminBuscarCategoriaPorCodigo(id){
    const conexao = await conectar();
    try{
    const sql = "select * from categoria where id_catego = ?;";
    const [categoria] = await conexao.query(sql,[id]);
    return categoria[0] || null;
    }finally {
  conexao.release(); // devolve ao pool
}
}
export async function adminAtualizarCategoria(id_catego, nome){
    const conexao = await conectar();
    try{
    const sql = `update categoria set nome = ? where id_catego = ?;`;
    await conexao.query(sql, [nome, id_catego]);
    }finally {
  conexao.release(); // devolve ao pool
}
  }
export async function adminVerificarQtdJogosCategoria(codigo){
    const conexao = await conectar();
    try{
   const sql = `select count(*) as total from jogo_categ where id_catego = ?;`;

    const [result] = await conexao.query(sql, [codigo]);
    return result[0].total;
    }finally {
  conexao.release(); // devolve ao pool
}
}
export async function adminExcluirCategoria(codigo){
    const conexao = await conectar();
    try{
    const sql = 'delete from categoria where id_catego = ?;';
    await conexao.query(sql, [codigo]);
    }finally {
  conexao.release(); // devolve ao pool
}
}
export async function adminExistePreferenciaCategoria(codigo) {
    const conexao = await conectar();
    try{
    const sql = `select count(*) as total from usu_categ_pref where id_catego = ?;`;
    
    const [result] = await conexao.query(sql, [codigo]);

    return result[0].total > 0; 
    }finally {
  conexao.release(); // devolve ao pool
}
}

//--------------------------------------------------
//     para gerenciamento de usuarios
//--------------------------------------------------

export async function adminInserirUsuario(nome, nomeUsuario, dtNascimento, email, senha){
    const conexao = await conectar();
    try{
    const sql = 'insert into usuario(nome, nick, dt_nasc, email, senha) values (?,?,?,?,?)';
    await conexao.query(sql, [nome, nomeUsuario, dtNascimento, email, senha]);
    } finally {
    conexao.release();
  }
}
export async function buscarNomeUsuario(nomeUsuario){
    const conexao = await conectar();
    try{
    const sql = 'select * from usuario where nick = ?';
      const [resultado] = await conexao.query(sql, [nomeUsuario]);
    return resultado.length > 0 ? resultado[0] : null;
     } finally {
    conexao.release();
  }
}

export async function adminBuscarUsuarioPorCodigo(usuario){
    const conexao = await conectar();
    try{
    const sql = "select * from usuario where id_usuario = ?;";
    const [usuarioEcontrado] = await conexao.query(sql,[usuario]);
    return usuarioEcontrado && usuarioEcontrado.length>0 ? usuarioEcontrado[0] : {};
    } finally {
    conexao.release();
  }
}

export async function adminAtualizarUsuario(id_usuario, nome, nomeUsuario, dtNascimento, email, senha) {
  const conexao = await conectar();
  try{
  const sql = "update usuario set nome=?, nick=?, dt_nasc=?, email = ?, senha = ? where id_usuario = ?;";
  await conexao.query(sql, [nome, nomeUsuario, dtNascimento, email, senha, id_usuario]);
   } finally {
    conexao.release();
  }
}

export async function adminExcluirUsuario(id_usuario){
  const conexao = await conectar();
  try{
  const sqlCheck = "select count(*) as total from usu_categ_pref where id_usuario = ?;";
  const [result] = await conexao.query(sqlCheck, [id_usuario]);
  if (result[0].total > 0) {
    throw new Error("Impossível apagar usuário com preferências associados. Apague as preferencias primeiro.");
  }
  const sql = "delete from usuario where id_usuario = ?;";
  await conexao.query(sql, [id_usuario]);
  } finally {
    conexao.release();
  }
}

//-------------------------

export async function buscarPreferencias(usuario){
    const conexao = await conectar();
    try{
    const sql = " select c.nome, f.id_usuario, f.id_catego from categoria c inner join usu_categ_pref f on f.id_catego = c.id_catego where f.id_usuario = ?";
    const [preferenciasEcontrados] = await conexao.query(sql,[usuario]);
    return preferenciasEcontrados;
    } finally {
    conexao.release();
  }
}

export async function deletarPreferencia(id_usuario, id_categoria) {
  const conexao = await conectar();
  try{
  const sql = "delete from usu_categ_pref where id_usuario = ? and id_catego = ?";
  await conexao.query(sql, [id_usuario, id_categoria]);
  } finally {
    conexao.release();
  }
}

//--------------------------------------------------
//     para gerenciamento de jogos
//--------------------------------------------------

export async function buscarCategoriasDoJogo(jogo){
    const conexao = await conectar();
    try{
    const sql = "  select j.nome as Jogo, c.nome as Categoria, c.id_catego, j.id_jogo from jogo j inner join jogo_categ jc on jc.id_jogo = j.id_jogo inner join categoria c on c.id_catego = jc.id_catego where j.id_jogo = ?;";
    const [categoriasEcontrados] = await conexao.query(sql,[jogo]);
    return categoriasEcontrados;
    } finally {
    conexao.release();
  }
}
export async function buscarNomeJogo(nomeJogo){
    const conexao = await conectar();
    try{
    const sql = 'select * from jogo where nome = ?';
      const [jogoEncontrado] = await conexao.query(sql, [nomeJogo]);
    return jogoEncontrado.length > 0 ? jogoEncontrado[0] : null;
    } finally {
    conexao.release();
  }
}
export async function adminInserirJogo(nomeJogo, descricao, dt_lanca,capa){
    const conexao = await conectar();
    try{
    const sql = 'insert into jogo(nome, descricao, dt_lanca, capa) values (?,?,?,?)';
    await conexao.query(sql, [nomeJogo, descricao, dt_lanca,capa]);
    } finally {
    conexao.release();
  }
}
export async function adminBuscarJogoPorCodigo(jogo){
    const conexao = await conectar();
    try{
    const sql = "select * from jogo where id_jogo = ?;";
    const [jogoEcontrado] = await conexao.query(sql,[jogo]);
    return jogoEcontrado && jogoEcontrado.length>0 ? jogoEcontrado[0] : {};
    } finally {
    conexao.release();
  }
}
export async function adminAtualizarJogo(id_jogo, nomeJogo, descricao, dt_lanca, capa) {
  const conexao = await conectar();
  try{
  const sql = "update jogo set nome=?, descricao=?, dt_lanca=?, capa = ? where id_jogo = ?;";
  await conexao.query(sql, [ nomeJogo, descricao, dt_lanca, capa, id_jogo]);
  } finally {
    conexao.release();
  }
}
export async function adminExcluirJogo(id_jogo){
  const conexao = await conectar();
  try{
  const sqlCheck = "select count(*) as total from jogo_categ where id_jogo = ?;";
  const [result] = await conexao.query(sqlCheck, [id_jogo]);
  if (result[0].total > 0) {
    throw new Error("Impossível apagar jogo com categorias associados. Apague as categorias primeiro.");
  }
  const sql = "delete from jogo where id_jogo = ?;";
  await conexao.query(sql, [id_jogo]);
  } finally {
    conexao.release();
  }
}
export async function categoriaDeJogoEscolhida(id_jogo, categorias) {
  const conexao = await conectar(); 
  try{
  const sql = 'insert into jogo_categ (id_catego, id_jogo) values ?';
  const valores = categorias.map(categoriaId => [categoriaId, id_jogo]);
  await conexao.query(sql, [valores]);
  } finally {
    conexao.release();
  }
}
export async function deletarcategoriaDoJogo(id_jogo, id_categoria) {
  const conexao = await conectar();
  try{
  const sql = "delete from jogo_categ where id_jogo = ? and id_catego = ?";
  await conexao.query(sql, [id_jogo, id_categoria]);
  } finally {
    conexao.release();
  }
}

// export async function buscarAvaliacoes() {
//   const conexao = await conectar();
//   const resultado = await conexao.query('select * from vw_avaliacoes');
//   return resultado[0];
// }

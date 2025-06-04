import { conectar } from '../config/db.js';


export async function autenticarAdmin(email, senha) {
    const conexao = await conectar();
    const sql = "select * from admin where email = ? AND senha = ?;";
    const [adminEncontrado] = await conexao.query(sql, [email, senha]);
    return adminEncontrado && adminEncontrado.length > 0 ? adminEncontrado[0] : {};
}

export async function listarUsuarios() {
  const conexao = await conectar();
  const [usuariosEncontrado] = await conexao.query('select * from usuario order by email');
  return usuariosEncontrado;
}

export async function adminBuscarCategoriasJogos() {
    const conexao = await conectar();
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
}
// para a função de atualizar categoria para validação, e da função de nova categoria, validação tambem.
export async function adminBuscarCategoria(nome) {
    const conexao = await conectar();
    const sql = 'select * from categoria where nome = ?';
    const [categoria] = await conexao.query(sql, [nome]);
     if (categoria.length > 0) return categoria[0] ;
     else return null;
}

export async function adminInserirCategoria(nome) {
    const conexao = await conectar();
    const sql = 'insert into categoria (nome) values (?);';

    await conexao.query(sql, [nome]);
}

export async function adminBuscarCategoriaPorCodigo(id){
    const conexao = await conectar();
    const sql = "select * from categoria where id_catego = ?;";
    const [categoria] = await conexao.query(sql,[id]);
    return categoria[0] || null;
}
export async function adminAtualizarCategoria(id_catego, nome){

    const conexao = await conectar();
    const sql = `update categoria set nome = ? where id_catego = ?;`;
    await conexao.query(sql, [nome, id_catego]);
}
export async function adminVerificarQtdJogosCategoria(codigo){
    const conexao = await conectar();
   const sql = `select count(*) as total from jogo_categ where id_catego = ?;`;

    const [result] = await conexao.query(sql, [codigo]);
    return result[0].total;
}
export async function adminExcluirCategoria(codigo){
    const conexao = await conectar();
    const sql = 'delete from categoria where id_catego = ?;';
    await conexao.query(sql, [codigo]);
}
export async function adminExistePreferenciaCategoria(codigo) {
    const conexao = await conectar();
    const sql = `select count(*) as total from usu_categ_pref where id_catego = ?;`;
    
    const [result] = await conexao.query(sql, [codigo]);

    return result[0].total > 0; 
}

export async function adminInserirUsuario(nome, nomeUsuario, dtNascimento, email, senha){
    const conexao = await conectar();
    const sql = 'insert into usuario(nome, nick, dt_nasc, email, senha) values (?,?,?,?,?)';
    await conexao.query(sql, [nome, nomeUsuario, dtNascimento, email, senha]);
}
export async function buscarNomeUsuario(nomeUsuario){
    const conexao = await conectar();
    const sql = 'select * from usuario where nick = ?';
      const [resultado] = await conexao.query(sql, [nomeUsuario]);
    return resultado.length > 0 ? resultado[0] : null;
}

export async function adminExcluirUsuario(id_usuario){
  const conexao = await conectar();
  const sqlCheck = "select count(*) as total from usu_categ_pref where id_usuario = ?;";
  const [result] = await conexao.query(sqlCheck, [id_usuario]);
  if (result[0].total > 0) {
    throw new Error("Impossível apagar usuário com preferências associados. Apague as preferencias primeiro.");
  }
  const sql = "delete from usuario where id_usuario = ?;";
  await conexao.query(sql, [id_usuario]);
}
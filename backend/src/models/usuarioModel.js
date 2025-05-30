import { conectar } from '../config/db.js';

// export async function listarUsuarios() {
//   const conexao = await conectar();
//   const [usuariosEncontrado] = await conexao.query('SELECT * FROM usuario');
//   return usuariosEncontrado;
// }

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

export async function buscarJogos(){
  const conexao = await conectar();
  const [jogos] = await conexao.query('select * from jogo');
  return jogos;
}






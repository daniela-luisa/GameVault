import { conectar } from '../config/db.js';

export async function listarUsuarios() {
  const conexao = await conectar();
  const [usuariosEncontrado] = await conexao.query('SELECT * FROM usuario');
  return usuariosEncontrado;
}

export async function autenticarUsuario(email, senha) {
    const conexao = await conectar();
    const [usuarioEncontrado] = await conexao.query(
      'SELECT * FROM usuario WHERE email = ? AND senha = ?',
      [email, senha]
    );
    return usuarioEncontrado[0];
  }

  export async function criarUsuario(nome, nomeUsuario, dtNascimento, email, senha) {
    const conexao = await conectar();
    const [usuario] = await conexao.query(
      'insert into usuario(nome, nick, dt_nasc, email, senha) values (?,?,?,?,?)',
      [nome, nomeUsuario, dtNascimento, email, senha]
    );
    return usuario;
  }

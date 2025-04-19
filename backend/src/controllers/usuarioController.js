import { listarUsuarios } from '../models/usuarioModel.js';
import { autenticarUsuario } from '../models/usuarioModel.js';
import { criarUsuario } from '../models/usuarioModel.js';

export async function getUsuarios(req, res) {
  try {
    const usuarios = await listarUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar usuários' });
  }
}


export async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await autenticarUsuario(email, senha);

    if (usuario) {
      res.json({ mensagem: 'Login bem-sucedido', usuario });
    } else {
      res.status(401).json({ erro: 'Email ou senha inválidos' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login' });
  }
}

export async function cadastroUsuario(req, res) {
    const { nome, nomeUsuario, dtNascimento, email, senha } = req.body;
  
    try {
      const usuario = await criarUsuario(nome, nomeUsuario, dtNascimento, email, senha);
  
      if (usuario) {
        res.json({ mensagem: 'Cadastro bem-sucedido', usuario });
      } else {
        res.status(401).json({ erro: 'Erro ao cadastrar usuario' });
      }
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao fazer cadastro' });
    }
  }

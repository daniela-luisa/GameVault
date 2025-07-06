import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NovoUsuario() {
  const [nome, setNome] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [dtNascimento, setDtNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const cadastrar = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://localhost:3001/admin/novo-usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, nomeUsuario, dtNascimento, email, senha }),
      });

      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);

      if (dados.sucesso) {
        setTimeout(() => {
          navigate('/admin/usuarios');
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setMensagem('Erro inesperado ao cadastrar.');
      setSucesso(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] flex justify-center items-center px-4">
      <div className="bg-black/50 p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-8">Novo Usuário</h1>

        {mensagem && (
          <div className={`mb-4 p-3 rounded text-white ${sucesso ? 'bg-green-600' : 'bg-red-600'}`}>
            {mensagem}
          </div>
        )}

        <form onSubmit={cadastrar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Informe Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="nome"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-1">Data de Nascimento</label>
            <input
              type="date"
              value={dtNascimento}
              onChange={(e) => setDtNascimento(e.target.value)}
              required
              placeholder="data"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-1">Nome de Usuário</label>
            <input
              type="text"
              value={nomeUsuario}
              onChange={(e) => setNomeUsuario(e.target.value)}
              required
              placeholder="usuário"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-semibold mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="senha"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </form>

        <div className="flex justify-center space-x-4 mt-8">
          <Link
            to="/admin/usuarios"
            className="bg-gray-600 text-white px-6 py-2 rounded font-bold hover:bg-gray-700 transition"
          >
            Voltar
          </Link>
          <button
            type="submit"
            onClick={cadastrar}
            className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600 transition"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function AtualizarUsuario() {
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [dtNascimento, setDtNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAtualizarUsuario() {
      try {
        const resposta = await fetch(`http://localhost:3001/admin/atualizar-usuario/${id}`);
        const dados = await resposta.json();
        if (resposta.ok) {
          setNome(dados.usuario.nome);
          setNomeUsuario(dados.usuario.nick);
          setDtNascimento(dados.usuario.dt_nasc ? dados.usuario.dt_nasc.substring(0, 10) : '');
          setEmail(dados.usuario.email);
          setSenha(dados.usuario.senha);
        } else {
          setMensagem(dados.mensagem);
          setSucesso(false);
        }
      } catch (erro) {
        console.error('Erro ao buscar usuário:', erro);
        setMensagem('Erro ao buscar usuário.');
        setSucesso(false);
      }
    }
    getAtualizarUsuario();
  }, [id]);

  const atualizar = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:3001/admin/atualizar-usuario/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, nomeUsuario, dtNascimento, email, senha }),
      });

      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);

      if (dados.sucesso) {
        setTimeout(() => navigate('/admin/usuarios'), 1500);
      }
    } catch (erro) {
      console.error('Erro ao atualizar usuário:', erro);
      setMensagem('Erro inesperado ao atualizar usuário.');
      setSucesso(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] flex justify-center items-center px-4">
      <div className="bg-black/50 p-8 rounded-xl shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-white mb-6">Atualizar Usuário</h1>

        {mensagem && (
          <div className={`mb-4 p-3 rounded text-white ${sucesso ? 'bg-green-600' : 'bg-red-600'}`}>
            {mensagem}
          </div>
        )}

        <form onSubmit={atualizar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Nome</label>
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

          <div className="md:col-span-2">
            <label className="block text-white text-sm font-semibold mb-1">Senha</label>
            <input
              type="text"
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
            onClick={atualizar}
            className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600 transition"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

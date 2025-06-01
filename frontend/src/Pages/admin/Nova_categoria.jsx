import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NovaCategoria() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const adicionar = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3001/admin/nova-categoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome }),
      });

      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);

      if (dados.sucesso) {
        setTimeout(() => {
          navigate('/admin/categorias');
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao adicionar categoria:', error);
      setMensagem('Erro inesperado ao adicionar categoria.');
      setSucesso(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] flex justify-center items-center">
      <div className="bg-black/50 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6">Nova Categoria</h1>

        {mensagem && (
          <div className={`mb-4 p-3 rounded text-white ${sucesso ? 'bg-green-600' : 'bg-red-600'}`}>
            {mensagem}
          </div>
        )}

        <form onSubmit={adicionar} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-semibold mb-1">nome da categoria</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500"
              required
              disabled={sucesso}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Link
              to="/admin/categorias"
              className="bg-gray-600 text-white px-6 py-2 rounded font-bold hover:bg-gray-700"
            >
              Voltar
            </Link>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600"
              disabled={sucesso}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

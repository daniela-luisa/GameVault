import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [admNome, setAdmNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const excluirCategoria = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3001/admin/excluir-categoria/${id}`);
      const dados = await resposta.json();

      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);

      if (dados.sucesso) {
        setCategorias(prev => prev.filter(cat => cat.id_catego !== id));
      }
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  useEffect(() => {
    async function buscarCategorias() {
      try {
        const resposta = await fetch('http://localhost:3001/admin/categorias');
        const dados = await resposta.json();
        if (resposta.ok) {
          setCategorias(dados.categorias);
          setAdmNome(dados.admNome);
        } else {
          alert(dados.mensagem || 'Erro ao carregar categorias');
        }
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }

    buscarCategorias();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      {/* Navbar */}
      <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href="/admin/dashboard" className="hover:text-green-500">Dashboard</a>
          <a href="/admin/jogos" className="hover:text-green-500">Jogos</a>
          <a href="/admin/usuarios" className="hover:text-green-500">Usuários</a>
          <a href="/admin/categorias" className="hover:text-green-500 text-green-500">Categorias</a>
        </div>
        <div className="text-white text-xs">{admNome}</div>
      </nav>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciamento de Categorias</h1>
          <Link to="/admin/nova-categoria" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 font-semibold">
            Adicionar
          </Link>
        </div>

        {/* Mensagem */}
        {mensagem && (
          <div className={`mb-4 p-3 rounded-md text-white ${sucesso ? 'bg-green-600' : 'bg-red-600'}`}>
            {mensagem}
          </div>
        )}

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-sm text-white">
              <tr>
                <th className="py-3 px-6 text-left">Nome</th>
                <th className="py-3 px-6 text-center">Qtd. Jogos</th>
                <th className="py-3 px-6 text-center">Qtd. Preferências</th>
                <th className="py-3 px-6 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((categoria) => (
                <tr key={categoria.id_catego} className="border-b border-gray-600 hover:bg-gray-700">
                  <td className="py-3 px-6">{categoria.nome}</td>
                  <td className="py-3 px-6 text-center">{categoria.qtd_jogos}</td>
                  <td className="py-3 px-6 text-center">{categoria.qtd_preferencias}</td>
                  <td className="py-3 px-6 text-center space-x-2">
                    <Link
                      to={`/admin/atualizar-categoria/${categoria.id_catego}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded font-medium"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => excluirCategoria(categoria.id_catego)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded font-medium"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

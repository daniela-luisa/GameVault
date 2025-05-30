import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


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
      // Atualiza a lista removendo a categoria excluída
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
        console.log('Categorias recebidas:', dados);
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
    <div className="max-w-6xl mx-auto p-6">
     <nav className="flex justify-between items-center p-4 bg-gray-100">
  <div className="flex space-x-4">
    <a href="/admin/dashboard" className="text-blue-500 hover:underline">Dashboard</a>
    <a href="/admin/jogos" className="text-blue-500 hover:underline">Jogos</a>
    <a href="/admin/usuarios" className="text-blue-500 hover:underline">Usuários</a>
    <a href="/admin/categorias" className="text-blue-500 hover:underline">Categorias</a>
  </div>
  <div className="font-semibold text-gray-700">{admNome} </div>
</nav>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Categorias</h1>
        <Link to="/admin/nova-categoria" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Adicionar</Link>
      </div>

      {mensagem && (
  <div className={`mb-4 p-3 rounded-md ${sucesso ? 'bg-green-600' : 'bg-red-600'} text-white`}>
    {mensagem}
  </div>
)}

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-6 text-left">Nome</th>
            <th className="py-3 px-6 text-center">Qtd. Jogos</th>
            <th className="py-3 px-6 text-center">Qtd. Preferências</th>
            <th className="py-3 px-6 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id_catego} className="border-b">
              <td className="py-3 px-6">{categoria.nome}</td>
              <td className="py-3 px-6 text-center">{categoria.qtd_jogos}</td>
              <td className="py-3 px-6 text-center">{categoria.qtd_preferencias}</td>
              <td className="py-3 px-6 text-center space-x-2">
                <Link to={`/admin/atualizar-categoria/${categoria.id_catego}`} className="text-yellow-500 hover:underline">              Editar</Link>
                <button onClick={() => excluirCategoria(categoria.id_catego)} className="text-red-500 hover:underline">
                Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

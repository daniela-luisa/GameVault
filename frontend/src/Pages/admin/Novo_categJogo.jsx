import { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

export default function NovaCategJogo() {
  const {id} = useParams(); // do usuario no caso
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const [categoriasExistentes, setCategoriasExistentes] = useState([]);


  useEffect(() => {
  async function carregarDadosDoGetNovaCategoriaJogo() {
    try {
      const resposta = await fetch(`http://localhost:3001/admin/nova-categoria-jogo/${id}`);
      const dados = await resposta.json();

      if (dados.categorias) {
        setCategorias(dados.categorias);
        setCategoriasExistentes(dados.categoriasJaSelecionadas.map(p => p.id_catego)); // salva os IDs
      } else {
        setMensagem("Nenhuma categoria recebida.");
        setSucesso(false);
      }
    } catch (erro) {
      setMensagem('Erro ao carregar dados');
      setSucesso(false);
    }
  }
  carregarDadosDoGetNovaCategoriaJogo();
}, [id]);

const alternarCategoria = (idCategoria) => {
    if (selecionadas.includes(idCategoria)) {
      setSelecionadas(selecionadas.filter(id => id !== idCategoria));
    } else {
      setSelecionadas([...selecionadas, idCategoria]);
    }
  };

  const salvarCategorias = async () => {
    try {
      const resposta = await fetch(`http://localhost:3001/admin/nova-categoria-jogo/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categorias: selecionadas }),
      });

      const dados = await resposta.json();
      setMensagem(dados.mensagem || 'Erro ao salvar');
      setSucesso(dados.sucesso);

      if (dados.sucesso) {
        setTimeout(() => navigate('/admin/jogos'), 1500);
      }
    } catch (erro) {
      setMensagem('Erro inesperado ao salvar preferências');
      setSucesso(false);
    }
  };

return (
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Adicionar Categorias para o Jogo #{id}</h1>

        {mensagem && (
          <div className={`mb-4 p-3 rounded text-white ${sucesso ? 'bg-green-600' : 'bg-red-600'}`}>
            {mensagem}
          </div>
        )}

       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categorias.filter(cat => !categoriasExistentes.includes(cat.id_catego)).map(cat => (
           <button
             key={cat.id_catego}onClick={() => alternarCategoria(cat.id_catego)}
             className={`${selecionadas.includes(cat.id_catego) ? 'bg-green-600' : 'bg-gray-700'} p-3 rounded`}>{cat.nome}
           </button>
         ))}
        </div>


        <div className="flex justify-end mt-6 gap-4">
          <Link to="/admin/jogos" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">Cancelar</Link>
          <button onClick={salvarCategorias} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Salvar Preferências
          </button>
        </div>
      </div>
    </div>
  );
}

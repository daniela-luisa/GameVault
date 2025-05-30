import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function AtualizarCategoria() {
  const { id } = useParams(); // pega id da url
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
    async function buscarCategoria() {
      try {
        const resposta = await fetch(`http://localhost:3001/admin/atualizar-categoria/${id}`);
        const dados = await resposta.json();

        if (resposta.ok ) {
          setNome(dados.categoria.nome);
        } else {
          setMensagem(dados.mensagem || 'Erro ao carregar categoria');
          setSucesso(false);
        }
      } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        setMensagem('Erro ao buscar categoria.');
        setSucesso(false);
      }
    }

    buscarCategoria();
  }, [id]);


  const atualizar = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const resposta = await fetch(`http://localhost:3001/admin/atualizar-categoria/${id}`, {
        method: 'POST', // ou POST, depende do seu backend
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome }),
      });

      const dados = await resposta.json();

      setMensagem(dados.mensagem || '');
      setSucesso(dados.sucesso);

      if (dados.sucesso) {
        setTimeout(() => {
          navigate('/admin/categorias');
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      setMensagem('Erro inesperado ao atualizar categoria.');
      setSucesso(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Atualizar Categoria</h1>

      {mensagem && (<div className={`mb-4 p-3 rounded-md ${sucesso ? 'bg-green-600' : 'bg-red-600'} text-white`}>{mensagem}</div>)}

      <form onSubmit={atualizar} className="space-y-4">
        <input type="text" placeholder="Nome da categoria" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full border p-2 rounded" required disabled={sucesso} />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={sucesso}>
          Atualizar
        </button>
      </form>

      <Link to="/admin/categorias" className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-4">
        Voltar
      </Link>
    </div>
  );
}

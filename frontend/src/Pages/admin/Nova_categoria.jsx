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
        body: JSON.stringify({nome}),
      });

      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);

     if (dados.sucesso) {
        // Sucesso: aguarda 1.5s e redireciona para lista
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
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Nova Categoria</h1>
        {/* mensagem de sucesso ou erro */}
        {mensagem && (<div className={`mb-4 p-3 rounded-md ${sucesso ? 'bg-green-600' : 'bg-red-600'} text-white`}>
          {mensagem} </div> )}

      <form onSubmit={adicionar} className="space-y-4">
        <input type="text" placeholder="Nome da categoria" value={nome} onChange={(e) => setNome(e.target.value)}
          className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Confirmar
        </button>
      </form>
       <Link to="/admin/categorias" className="inline-block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-4">
        Voltar</Link>
    </div>
  );
}

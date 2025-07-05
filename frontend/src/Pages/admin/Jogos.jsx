import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Jogos() {
  const [jogo, setJogos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [jogoSelecionado, setJogoSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const [admNome, setAdmNome] = useState('');

const carregarJogos = async () => {
    try {
      const resposta = await fetch('http://localhost:3001/admin/jogos');
      const dados = await resposta.json();
      setJogos(dados.jogos || []);
      setAdmNome(dados.admNome || '');

      if (dados.jogos && dados.jogos.length > 0) {
        carregarCategorias(dados.jogos[0].id_jogo);
        setJogoSelecionado(dados.jogos[0].id_jogo);
      }
    } catch (error) {
      console.error('Erro ao carregar Jogos:', error);
    }
  };

  useEffect(() => {
    carregarJogos();
  }, []);

    const excluirJogo = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3001/admin/excluir-jogo/${id}`);
      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);
      if (dados.sucesso) {
        setJogos(prev => prev.filter(u => u.id_jogo !== id));
        setCategorias([]);
        setJogoSelecionado(null);
      }
    } catch (error) {
      console.error('Erro ao excluir Jogo:', error);
    }
  };
 const carregarCategorias = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3001/admin/categorias-jogo/${id}`);
      const dados = await resposta.json();
      console.log('Categorias recebidas:', dados);
      setCategorias(dados.categorias || []);
      setJogoSelecionado(id);
    } catch (error) {
      console.error('Erro ao carregar Categoria:', error);
    }
  }

  const excluirCategoria = async (id_jogo, id_categoria) => {
    try {
      const resposta = await fetch(`http://localhost:3001/admin/excluir-preferencia/${id_jogo}/${id_categoria}`);
      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);
      if (dados.sucesso) {
        setCategorias(prev => prev.filter(p => p.id_catego !== id_categoria));
      }
    } catch (error) {
      console.error('Erro ao excluir Categorias:', error);
    }
  };

  return (
        <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href="/admin/dashboard" className="hover:text-green-500">Dashboard</a>
          <a href="/admin/jogos" className="hover:text-green-500 text-green-500">Jogos</a>
          <a href="/admin/usuarios" className="hover:text-green-500">Usuários</a>
          <a href="/admin/categorias" className="hover:text-green-500">Categorias</a>
        </div>
      </nav>
            <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciamento de Jogos</h1>
       <Link to="/admin/novo-jogo">Adicionar Jogo</Link>
        </div>

        {mensagem && (
          <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: sucesso ? 'green' : 'red', color: 'white' }}>
            {mensagem}
          </div>
        )}
        <h2>Jogos</h2>
        <table width="100%" style={{ marginBottom: '5.0rem'}}>
          

        <thead>
            <tr>
           <th>Nome</th>
           <th>Descrição</th>
           <th>Ações</th>
           </tr>
        </thead>
          <tbody>
            {jogo.map(jogo => (
              <tr key={jogo.id_jogo} >
                <td style={{ cursor: 'pointer' }} onClick={() => carregarCategorias(jogo.id_jogo)}>{jogo.nome}
                </td>               
                <td style={{ cursor: 'pointer'}} onClick={() => carregarCategorias(jogo.id_jogo)}>{jogo.descricao}
                </td>
                
                <td>
                <Link to={`/admin/atualizar-jogo/${jogo.id_jogo}`} style={{ cursor: 'pointer' }}>Editar</Link>
                <button onClick={() => excluirJogo(jogo.id_jogo)} style={{ cursor: 'pointer' }}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

{jogoSelecionado && (
  <div style={{ display: 'flex', justifyContent: 'space-between'}}>
    <h2>Categorias do Jogo Selecionado</h2>
    <Link to={`/admin/nova-categoria-jogo/${jogoSelecionado}`}>Adicionar Categorias</Link>
  </div>
)}

{jogoSelecionado && (
  <table width="100%">
   <thead>
  <tr>
    <th>Categoria</th>
    <th>Ações</th>
  </tr>
</thead>
<tbody>
  {categorias.length > 0 ? (
    categorias.map((cat, index) => (
      <tr key={index}>
        <td>{cat.Categoria}</td>
        <td>
          <button
            onClick={() => excluirCategoria(jogoSelecionado, cat.id_catego)}
            style={{ cursor: 'pointer' }}>Excluir
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="2">Nenhuma Categoria encontrada.</td>
    </tr>
  )}
</tbody>

  </table>
)}
      </div>
    </div>
  );
}

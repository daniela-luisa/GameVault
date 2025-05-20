import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const id_usuario = localStorage.getItem('id_usuario');
  console.log("ID do usuário logado:", id_usuario); 
  const [jogos, setJogos] = useState([]); 
  const [categorias, setCategorias] = useState([]);

  

useEffect(() => {
  async function carregarJogos() {
    try {
      const response = await fetch('http://localhost:3001/jogos');
      const dados = await response.json();
      console.log(dados)
      setJogos(dados);
    } catch (error) {
      console.error('Erro ao buscar jogos:', error);
    }
  }
  carregarJogos();
}, []);

useEffect(() => {
  async function carregarCategorias() {
    try {
      const response = await fetch('http://localhost:3001/categorias');
      const dados = await response.json();
      setCategorias(dados);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }
  carregarCategorias();
}, []);


  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/home">Início</Link></li>
          <li><Link to="/favoritos">Favoritos</Link></li>
          <li><Link to={`/perfil/${id_usuario}`}>Perfil</Link></li>
        </ul>
      </nav>
      
      <h1>Bem-vindo ao Home</h1>
      <h2>Jogos</h2>
      <ul>
        
        {jogos.map((jogo) => (
          <li key={jogo.id_jogo}>
          <h3>{jogo.nome}</h3>
          <p>{jogo.descricao}</p>
          <p>{jogo.dt_lanca}</p>
          {/* capa */}
        </li>
        ))}
      </ul>
      <h2>Categorias</h2>
      <ul>
        {categorias.map((categoria) => (
          <li key={categoria.id_categoria}>
            <p>{categoria.nome}</p></li>
        ))}
      </ul>
    </div>
  );
}


  
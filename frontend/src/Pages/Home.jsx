import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function Home() {
  const { id } = useParams();
  const id_usuario = localStorage.getItem('id_usuario');
  console.log("ID do usuário logado:", id_usuario);
  const [jogos, setJogos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const [recomendacoes, setRecomendacoes] = useState([]);

  const imagens = [
    "/images/Melhores-Jogos-de-Videogames.jpg",
    "/images/2.jpg",
    "/images/os-10-melhores-jogos-de-2018-na-opiniao-do-uol-jogos-1546887965085_v2_1920x1080.jpg",
    "/images/maxresdefault.jpg"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagens.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

useEffect(() => {
  async function carregarRecomendacoes() {
    try {
      const resposta = await fetch(`http://localhost:3001/home/${id_usuario}`);
      const dados = await resposta.json();
      console.log('Recomendações:', dados.recomendacoes);
      setRecomendacoes(dados.recomendacoes || []);
    } catch (error) {
      console.error('Erro ao carregar recomendações:', error);
    }
  }

  if (id_usuario) {
    carregarRecomendacoes();
  }
}, [id_usuario]);


  useEffect(() => {
    async function carregarJogos() {
      try {
        const resposta = await fetch('http://localhost:3001/jogos');

        if (resposta.status === 401) {
          console.log('Usuário não autenticado, redirecionando para /...');
          navigate('/');
          return;  // para não continuar a execução
        }

        const dados = await resposta.json();
        console.log('jogos:', dados)
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
        const resposta = await fetch('http://localhost:3001/categorias');
        if (resposta.status === 401) {
          console.log('Usuário não autenticado, redirecionando para /...');
          navigate('/');
          return;  // para não continuar a execução
        }

        const dados = await resposta.json();
        console.log('categorias:', dados);
        setCategorias(dados);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }
    carregarCategorias();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href="/home" className="hover:text-green-500 text-green-500">Inicio</a>
          <a href="/favoritos" className="hover:text-green-500">Favoritos</a>
          <a href={`/perfil/${id_usuario}`} className="hover:text-green-500">Perfil</a>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold">Bem-vindo ao Home</h1>
        </div>
      </div>


      <div className="flex justify-center items-center my-5 max-h-[60vh] h-[60vh] overflow-hidden">
        {[-1, 0, 1].map((offset) => {
          const currentIndex = (index + offset + imagens.length) % imagens.length;
          const isCenter = offset === 0;

          return (
            <img
              key={currentIndex}
              src={imagens[currentIndex]}
              alt={`banner-${currentIndex}`}
              className={`
          transition-all duration-700 ease-in-out
          object-contain
          ${isCenter ? 'max-h-full z-5 scale-100' : 'max-h-[90%] opacity-50'}
        `}
            />
          );
        })}
      </div>



      <div className="max-w-7xl mx-auto p-6">
        <div className="flex mb-6 gap-20">
          <div>
            <h1 className="text-2xl font-bold">Categoria</h1>
            <ul>
              {categorias.map((categoria) => (
                <li key={categoria.id_catego}>
                  <p>{categoria.nome}</p> <br /></li>
                  
              ))}
            </ul>
          </div>
          <div className="justify-start ">
            <h2 className="text-2xl font-bold">Jogos</h2>
            <ul>
              {jogos.map((jogo) => (
                <li key={jogo.id_jogo}>
                  <h3>{jogo.nome}</h3>
                  <p>{jogo.descricao}</p>
                  <p>{jogo.dt_lanca}</p>
                  {/* capa */}
                  <br />
                </li>
              ))}
            </ul>
          </div>
           <div className="justify-start ">
            <h2 className="text-2xl font-bold">Recomendações</h2>
            <ul>
              {recomendacoes.map((rec, index) => (
                <li key={rec.index}>
                  <h3>{rec.nome}</h3>
                  <p>{rec.descricao}</p>
                  <p>{rec.dt_lanca}</p>
                  <br />
                  {/* capa */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
}



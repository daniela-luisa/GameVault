import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function Home() {
  const { id } = useParams();
  const [relacoes, setRelacoes] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  console.log("Favoritos carregados:", favoritos);
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
    async function carregarFavoritos() {
      try {
        const resposta = await fetch(`http://localhost:3001/favoritos/${id_usuario}`);
        const dados = await resposta.json();
        console.log('Favoritos recebidos:', dados);
        const idsFavoritados = (dados.favoritos || []).map(fav => fav.id_jogo);
        setFavoritos(idsFavoritados);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }

    if (id_usuario) {
      carregarFavoritos();
    }
  }, [id_usuario]);

  const favoritarJogo = async (id_jogo) => {
    try {
      const resposta = await fetch('http://localhost:3001/favoritar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_usuario, id_jogo }),
      });

      const dados = await resposta.json();
      if (dados.sucesso) {
        setFavoritos(prev => [...prev, id_jogo]);
      } else {
        alert(dados.mensagem || 'Erro ao favoritar');
      }
    } catch (error) {
      console.error('Erro ao favoritar:', error);
      alert('Erro ao favoritar');
    }
  };

  const desfavoritarJogo = async (id_jogo) => {
    try {
      const resposta = await fetch(`http://localhost:3001/excluir-favorito/${id_usuario}/${id_jogo}`);
      const dados = await resposta.json();

      if (dados.sucesso) {
        setFavoritos(prev => prev.filter(fav => fav !== id_jogo));  // Remove da lista
      } else {
        alert('Erro ao desfavoritar.');
      }
    } catch (error) {
      console.error('Erro ao desfavoritar:', error);
      alert('Erro ao desfavoritar.');
    }
  };


  useEffect(() => {
    async function carregarRecomendacoes() {
      try {
        const resposta = await fetch(`http://localhost:3001/home/${id}`);
        const dados = await resposta.json();
        console.log('Recomendações:', dados.recomendacoes);
        setRecomendacoes(dados.recomendacoes || []);
        setRelacoes(dados.relacoes || []);
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
          <a href={`/favoritos/${id_usuario}`} className="hover:text-green-500">Favoritos</a>
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
        <div className="max-w-7xl mx-auto p-6 flex flex-col gap-10">


          <div className="justify-start ">
            <h2 className="text-2xl font-bold">Recomendações</h2>
            <div className="flex flex-wrap gap-6">
              {recomendacoes.map((rec, index) => (
                <div key={index} className="w-60">
                  <h3 className="font-bold">{rec.nome}</h3>
                  <img src={`http://localhost:3001/uploads/${rec.capa}`} alt={`Capa de ${rec.nome}`} className="object-contain h-60" />
                  <p className="text-gray-400">{new Date(rec.dt_lanca).toLocaleDateString('pt-BR')}</p>

                  <button
                    onClick={() => favoritos.includes(rec.id_jogo) ? desfavoritarJogo(rec.id_jogo) : favoritarJogo(rec.id_jogo)}
                    className={`mt-2 ${favoritos.includes(rec.id_jogo) ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'} text-white py-1 px-4 rounded`}
                  >
                    {favoritos.includes(rec.id_jogo) ? 'Descurtir' : 'Curtir'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-10">
            <div className='w-40'>
              <h1 className="text-2xl font-bold">Filtro</h1>
              <ul>
                {categorias.map((categoria) => (
                  <li key={categoria.id_catego}>
                    <button onClick={() => setCategoriaSelecionada(categoria.id_catego)}
                      className={`hover:text-green-500 ${categoriaSelecionada === categoria.id_catego ? 'text-green-500' : 'text-white'} `}>
                      {categoria.nome}
                    </button>
                  </li>
                ))}
                <li>
                  <button onClick={() => setCategoriaSelecionada(null)}
                    className={`${categoriaSelecionada === null ? 'text-green-500' : 'text-white'}`}>Todas
                  </button>
                </li>
              </ul>
            </div>


            <div className="justify-start ">
              <h2 className="text-2xl font-bold">Jogos</h2>
              <div className="flex flex-wrap gap-6">
                {(categoriaSelecionada
                  ? jogos.filter(jogo => relacoes.some(rel => rel.id_jogo === jogo.id_jogo && rel.id_catego === categoriaSelecionada)) : jogos
                ).map((jogo) => (
                  <div key={jogo.id_jogo} className="shadow-lg flex flex-col w-50 bg-gray-700 rounded-md overflow-hidden">
                    <div className="w-full h-72 flex justify-center items-center overflow-hidden">
                      <img src={`http://localhost:3001/uploads/${jogo.capa}`} alt={`Capa de ${jogo.nome}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="font-bold">{jogo.nome}</h3>
                        <p className="text-sm">{jogo.descricao}</p>
                        <p className="text-gray-400">{new Date(jogo.dt_lanca).toLocaleDateString('pt-BR')}</p>
                      </div>
                      <button onClick={() => favoritos.includes(jogo.id_jogo) ? desfavoritarJogo(jogo.id_jogo) : favoritarJogo(jogo.id_jogo)}
                        className={`mt-2 ${favoritos.includes(jogo.id_jogo) ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600'} text-white py-1 px-4 rounded`}>
                        {favoritos.includes(jogo.id_jogo) ? 'Descurtir' : 'Curtir'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="bg-black text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo e Menu */}
          <div className="flex items-center md:items-start md:w-1/">
            <div className="flex-shrink-0">
              <img src="../Game-removebg-preview.png" alt="Logo" className="h-25" />
            </div>

            <div className="hidden md:block w-px h-20 bg-gray-500 mx-6"></div>

            <div className="hidden md:flex flex-col space-y-2 text-white font-semibold">
              <a href="#" className="hover:text-green-500">Home</a>
              <a href="#" className="hover:text-green-500">Perfil</a>
              <a href="#" className="hover:text-green-500">Favoritos</a>
            </div>
          </div>

          {/* Contatos */}
          <div className="mt-4 md:mt-0 flex flex-col items-center md:items-end space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span>(47) 91847-8124</span>
              <i className="fab fa-whatsapp text-green-500"></i>
            </div>
            <div className="flex items-center gap-2">
              <span>@exemploperfil</span>
              <i className="fab fa-instagram text-pink-500"></i>
            </div>
            <div className="flex items-center gap-2">
              <span>@exemploperfil</span>
              <i className="fab fa-facebook text-blue-500"></i>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-xs mt-4 py-2 border-t border-gray-700">
          © 2025 GameReviews. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}



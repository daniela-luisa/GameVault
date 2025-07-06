import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Favoritos() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    async function carregarFavoritos() {
      try {
        const resposta = await fetch(`http://localhost:3001/favoritos/${id}`);
        const dados = await resposta.json();
        console.log('Recomendações:', dados.favoritos);
        setFavoritos(dados.favoritos || []);
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    }

    if (id) {
      carregarFavoritos();
    }
  }, [id]);

  const desfavoritarJogo = async (id_jogo) => {
    try {
      const resposta = await fetch(`http://localhost:3001/excluir-favorito/${id}/${id_jogo}`);
      const dados = await resposta.json();

      if (dados.sucesso) {
        setFavoritos(prev => prev.filter(fav => fav.id_jogo !== id_jogo));
      } else {
        alert('Erro ao desfavoritar.');
      }
    } catch (error) {
      console.error('Erro ao desfavoritar:', error);
      alert('Erro ao desfavoritar.');
    }
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      {/* NAVBAR */}
      <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href={`/home/${id}`} className="hover:text-green-500 ">Inicio</a>
          <a href={`/favoritos/${id}`} className="hover:text-green-500 text-green-500">Favoritos</a>
          <a href={`/perfil/${id}`} className="hover:text-green-500">Perfil</a>
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-5xl font-bold">Favoritos</h1>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <ul className="flex flex-wrap gap-6">
            {favoritos && favoritos.length > 0 ? (
              favoritos.map((fav) => (
                <li key={fav.id_jogo} className="shadow-lg rounded w-50 bg-gray-700 rounded-md overflow-hidden flex flex-col">
                  <div className="w-full h-72 flex justify-center items-center overflow-hidden">
                    <img
                      src={`http://localhost:3001/uploads/${fav.capa}`}
                      alt={`Capa de ${fav.nome}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-2 flex flex-col justify-between flex-grow">
                    <div>
                      <p className="font-bold">{fav.nome}</p>
                      <p className="text-gray-400">{new Date(fav.dt_lanca).toLocaleDateString('pt-BR')}</p>
                    </div>

                    <button
                      onClick={() => desfavoritarJogo(fav.id_jogo)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded mt-2 self-start"
                    >
                      Desfavoritar
                    </button>
                  </div>
                </li>

              ))
            ) : (
              <h2 className="text-2xl">Nenhum Favorito</h2>
            )}
          </ul>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-black text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="flex items-center md:items-start md:w-1/3">
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
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
        alert('Jogo removido dos favoritos!');
        setFavoritos(prev => prev.filter(fav => fav.id_jogo !== id_jogo));  
      } else {
        alert('Erro ao desfavoritar.');
      }
    } catch (error) {
      console.error('Erro ao desfavoritar:', error);
      alert('Erro ao desfavoritar.');
    }
  };


 return(
 <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href={`/home/${id}`} className="hover:text-green-500 ">Inicio</a>
          <a href={`/favoritos/${id}`}  className="hover:text-green-500 text-green-500">Favoritos</a>
          <a href={`/perfil/${id}`} className="hover:text-green-500">Perfil</a>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-bold">Favoritos</h1>
        </div>
      </div>

<div className="max-w-7xl mx-auto p-6">
        <div className="flex mb-6 gap-20">
          <div>
            <h1 className="text-2xl font-bold">Favoritos</h1>
            <ul>
  {favoritos.map((fav) => ( 
    <li key={fav.id_jogo}>   
      <p>{fav.nome}</p> 
      <p>{new Date(fav.dt_lanca).toLocaleDateString('pt-BR')}</p>

      <button 
        onClick={() => desfavoritarJogo(fav.id_jogo)}className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded mt-2">
        Desfavoritar</button>
      <br />
    </li>
  ))}
</ul>
          </div>
     </div>
</div>



      
     </div>
 );
}
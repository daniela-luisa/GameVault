import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const id_usuario = localStorage.getItem('id_usuario');
  console.log("ID do usuário logado:", id_usuario);
  const [jogos, setJogos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Bem-vindo ao Home</h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex mb-6 gap-20">
          <div>
            <h1 className="text-2xl font-bold">Categoria</h1>
            <ul>
              {categorias.map((categoria) => (
                <li key={categoria.id_catego}>
                  <p>{categoria.nome}</p></li>
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>


    </div>
  );
}



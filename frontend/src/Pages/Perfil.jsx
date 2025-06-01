import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const { id } = useParams(); // aqui ele vai pega o id da url (usando a rota)
  const [usuario, setUsuario] = useState(null); //aqui armazena os dados do usuario
  const navigate = useNavigate();



  useEffect(() => {
    async function buscarPerfil() {
      try {
        const resposta = await fetch(`http://localhost:3001/perfil/${id}`);
   if (resposta.status === 401) {
          console.log('Usuário não autenticado, redirecionando para /login...');
          navigate('/');
          return;  // para não continuar a execução
        }

        const dados = await resposta.json();
        console.log('Dados recebidos do backend:', dados);

        if (resposta.ok) {
          setUsuario(dados[0]);
        } else {
          alert(dados.erro || 'Erro ao carregar perfil');
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    }

    buscarPerfil();
  }, [id]); //sempre quando o id muda o useeffect vai ser chamado

  if (!usuario) {
    return <div>Carregando...</div>; // Enquanto os dados não chegam, mostra uma mensagem
  }

  return (
    
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
       <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href="/home" className="hover:text-green-500">Inicio</a>
          <a href="/favoritos" className="hover:text-green-500">Favoritos</a>
          <a href={`/perfil/${id}`} className="hover:text-green-500 text-green-500">Perfil</a>
        </div>
      </nav>

      <div className="flex items-center justify-center p-10">
        <div>
            <h1 className="text-2xl font-bold">Perfil de {usuario.nome}</h1>
      <p>Nome de usuário: {usuario.nick}</p>
        </div>
            
      </div>

    </div>
  );
}
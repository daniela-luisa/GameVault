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


  const [arquivo, setArquivo] = useState(null);

  const handleUpload = async () => {
    if (!arquivo) {
      alert('Selecione uma imagem primeiro!');
      return;
    }

    const formData = new FormData();
    formData.append('foto', arquivo);


    const resposta = await fetch(`http://localhost:3001/perfil/${id}/foto`, {
      method: 'POST',
      body: formData,
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      alert('Imagem enviada com sucesso!');
      console.log('Foto salva:', dados.foto);
      setUsuario({ ...usuario, foto: dados.foto });
    } else {
      console.error('Erro:', dados.erro);
      alert('Erro ao enviar imagem');
    }
    setArquivo(null);
  }

  if (!usuario) {
    return <div>Carregando...</div>; // Enquanto os dados não chegam, mostra uma mensagem
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href={`/home/${id}`}  className="hover:text-green-500">Inicio</a>
          <a href={`/favoritos/${id}`} className="hover:text-green-500">Favoritos</a>
          <a href={`/perfil/${id}`} className="hover:text-green-500 text-green-500">Perfil</a>
        </div>
      </nav>

      <div className="p-4">

      </div>



      <div className="flex items-center justify-center p-10 gap-15">
        <div className="flex flex-col gap-10">
          <label htmlFor="upload">
            <img
              src={`http://localhost:3001/uploads/${usuario.foto}`}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover"
            />
          </label>
          <input
            id='upload'
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => setArquivo(e.target.files[0])}
            className="mb-2"
          />
          {arquivo && (
            <button
              onClick={handleUpload}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Enviar imagem
            </button>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">Perfil de {usuario.nome}</h1>
          <p>Nome de usuário: {usuario.nick}</p>
        </div>

      </div>

    </div>
  );
}
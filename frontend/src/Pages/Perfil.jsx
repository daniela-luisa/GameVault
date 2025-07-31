import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function Perfil() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [preview, setPreview] = useState(null);
  const [arquivo, setArquivo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function buscarPerfil() {
      try {
        const resposta = await fetch(`http://localhost:3001/perfil/${id}`,{
         headers: {
    Authorization: `Bearer ${token}`
         }
  });
        if (resposta.status === 401) {
          console.log('Usuário não autenticado, redirecionando para /login...');
          navigate('/');
          return;
        }

        const dados = await resposta.json();
        console.log('Dados recebidos do backend:', dados);

        if (resposta.ok) {
          setUsuario(dados[0]);
          setPreview(`http://localhost:3001/uploads/${dados[0].foto}`);
        } else {
          alert(dados.erro || 'Erro ao carregar perfil');
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    }

    buscarPerfil();
  }, [id]);

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
      console.log('Foto salva:', dados.foto);
      setUsuario({ ...usuario, foto: dados.foto });
    } else {
      console.error('Erro:', dados.erro);
      alert('Erro ao enviar imagem');
    }
    setArquivo(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setArquivo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  if (!usuario) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href={`/home/${id}`} className="hover:text-green-500">Inicio</a>
          <a href={`/favoritos/${id}`} className="hover:text-green-500">Favoritos</a>
          <a href={`/perfil/${id}`} className="hover:text-green-500 text-green-500">Perfil</a>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="flex items-center justify-center p-10 gap-15">
          <div className="flex flex-col gap-10">
            <label htmlFor="upload" className="cursor-pointer">
              {preview ? (
                <img
                  src={preview}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-700 text-gray-300">
                  Nenhuma <br /> imagem
                </div>
              )}
            </label>

            <input
              id="upload"
              type="file"
              accept="image/*" 
              className="hidden"
              onChange={handleFileChange}
             
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
            <h1 className="text-2xl font-bold mb-5">Perfil de {usuario.nome}</h1>
            <p className='mb-2'> <span className='opacity-65'>Nome de usuário: </span>
                <span className="opacity-100">{usuario.nick}  </span> </p>
            <p className='mb-2'> <span className='opacity-65'>Data de nascimento: </span>
                <span className="opacity-100">{new Date(usuario.dt_nasc).toLocaleDateString('pt-BR')}</span></p>
            <p className='mb-2'> <span className='opacity-65'>Email: </span>
              <span className="opacity-100"></span>{usuario.email}</p>
          </div>
        </div>
      </main>

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

import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cadastro2() {
  const [categorias, setCategorias] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const navigate = useNavigate();
  const id_usuario = localStorage.getItem('id_usuario');
  //  console.log("ID do usuário logado:", id_usuario); 

  useEffect(() => {
    async function carregarCategorias() {
      try {
        const resposta = await fetch('http://localhost:3001/categorias');
        const dados = await resposta.json();
        setCategorias(dados);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }
    carregarCategorias();
  }, []);

  const toggleCategoria = (id) => {
    if (selecionadas.includes(id)) {
      setSelecionadas(selecionadas.filter(cat => cat !== id));
    } else {
      setSelecionadas([...selecionadas, id]);
    }
  };
  const enviarCategorias = () => {
    fetch('http://localhost:3001/salvar-categorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario,
        categorias: selecionadas
      })
    })
      .then(async resposta => {
        if (resposta.ok) {
          const dados = await resposta.json(); 
          alert("Categorias salvas com sucesso!");
          navigate(`/home/${id_usuario}`);
        } else {
          alert("Erro ao salvar categorias");
        }
      })
      .catch(error => console.error("Erro ao enviar:", error));
  };

  return (
    <div className="min-h-screen flex items-center justify-evenly bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F]">
      <div className="bg-black/50 rounded-2xl p-10 w-[800px] h-[500px] relative">
      <div>
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-white text-5xl font-bold tracking-widest" style={{ fontFamily: "Acme" }}>CADASTRO</h1>
          <div className="flex items-center gap-2">
            {/* Coloque seu logo aqui, se quiser */}
            <img src="../Game-removebg-preview.png" alt="Game Vault Logo" className="h-18" />
          </div>
        </div>
        <div className="flex items-center">
          <h1 className="text-white text-2xl tracking-widest" style={{ fontFamily: "Acme" }}>Escolha suas categorias favoritas</h1>
        </div>
        </div>



       
          <div className="grid grid-cols-3 gap-3 px-8 mt-3">
            {/* aqui ele vai mapear todas as categorias e por em um botão cada uma delas*/}
            {categorias.map(categoria => (
             <button
             key={categoria.id_catego}
             onClick={() => toggleCategoria(categoria.id_catego)}
             className={`${selecionadas.includes(categoria.id_catego) ? 'bg-green-500' : 'bg-gray-800'} py-2 px-8 rounded text-white`}
           >
             {categoria.nome}
           </button>
            ))}
          </div>
          

          <div className="bottom-0 col-span-2 relative flex items-center mt-12">

            <span className="mt-1 ml-1.5  text-gray-400 hover:text-gray-200 text-sm flex items-center gap-2">&lt;</span>
            <a href="../cadastro" className="mt-1 ml-1.5 underline text-gray-400 hover:text-gray-200 text-sm flex items-center gap-2">
              Voltar para Cadastro
            </a>
            <div className="flex absolute justify-center w-full pointer-events-none">
              <button
                type="submit"
                onClick={enviarCategorias}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-8 rounded-md text-2xl flex items-center gap-2 transition pointer-events-auto"
                style={{ fontFamily: "Acme" }}>
                CONTINUAR
              </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [dtNascimento, setDtNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const Cadastro = async (e) => {
        e.preventDefault();
    
        const resposta = await fetch('http://localhost:3001/cadastro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, nomeUsuario, dtNascimento, email, senha }),
        });
    
        const dados = await resposta.json();
    
        if (resposta.ok) {
          alert('Cadastro feito com sucesso!');
          console.log(dados);
          navigate('/');

        } else {
          alert(dados.erro || 'Erro ao fazer Cadastro');
        }
      };

    return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F]">
  <div className="bg-black/50 rounded-2xl p-10 w-[800px] h-[500px]">
    <div className="flex items-center justify-between mb-5">
      <h1 className="text-white text-5xl font-bold tracking-widest" style={{ fontFamily: "Acme" }}>CADASTRO</h1>
      <div className="flex items-center gap-2">
        {/* Coloque seu logo aqui, se quiser */}
        <img src="../Game-removebg-preview.png" alt="Game Vault Logo" className="h-18" />
      </div>
    </div>
    
    <form onSubmit={Cadastro} className="grid grid-cols-2 gap-6">
      <div className="flex flex-col">
        <label className="text-white mb-1">Informe seu Nome</label>
        <input 
          type="text" 
          placeholder="nome"
          value={nome} 
          onChange={(e) => setNome(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-400 p-1.5 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-white mb-1">Data de Nascimento</label>
        <input 
          type="date" 
          placeholder="data"
          value={dtNascimento} 
          onChange={(e) => setDtNascimento(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-400 p-1.5 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-white mb-1">Nome de Usuario</label>
        <input 
          type="text" 
          placeholder="usuário"
          value={nomeUsuario} 
          onChange={(e) => setNomeUsuario(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-400 p-1.5 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-white mb-1">Email</label>
        <input 
          type="email" 
          placeholder="email"
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-400 p-1.5 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-white mb-1">Senha</label>
        <input 
          type="password" 
          placeholder="senha"
          value={senha} 
          onChange={(e) => setSenha(e.target.value)}
          className="bg-gray-800 text-white placeholder-gray-400 p-1.5 rounded-md"
        />
      </div>

      {/* Botão de Continuar */}
    

      <div className="col-span-2 relative flex items-center mt-6">

        <span className="mt-1 ml-1.5  text-gray-400 hover:text-gray-200 text-sm flex items-center gap-2">&lt;</span>
        <a href="../" className="mt-1 ml-1.5 underline text-gray-400 hover:text-gray-200 text-sm flex items-center gap-2">
         Voltar para login
        </a>
        <div className="flex absolute justify-center w-full pointer-events-none">
        <button 
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-8 rounded-md text-2xl flex items-center gap-2 transition pointer-events-auto"
          style={{ fontFamily: "Acme" }}>
          CONTINUAR 
        </button>
        </div>
      </div>
    </form>
  </div>
</div>

    );
}

import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();

    const resposta = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();
    // console.log(dados.cadastro2Completo);

    if (resposta.ok) {
      console.log(dados);

      localStorage.setItem('id_usuario', dados.usuario.id);
      //--------------------------------------------------
      if (dados.usuario.cadastro2Completo) {
        console.log('Redirecionando para home...');
        navigate(`/home/${dados.usuario.id}`);
      } else {
        console.log('Redirecionando para cadastro2...');
        navigate('/cadastro2');
      }
      //------------------------------------------------------
    } else {
      alert(dados.erro || 'Erro ao fazer login');
    }
  };

  return (
    // aqui dentro do form ele vai pegar todos os dados dentro dos input e enviar para o metodo post do localhost:3001/login no backend pra poder fazer o controle de login ou seja, cuidado ao mexer
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F]">
      <div className="bg-black/50 rounded-2xl p-10 w-[500px] h-[500px]">

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-5xl font-bold tracking-widest" style={{ fontFamily: "Acme" }}>LOGIN</h1>
          <div className="flex items-center gap-2">
            <img src="../Game-removebg-preview.png" alt="Game Vault Logo" className="h-18" />
          </div>
        </div>

        <form onSubmit={Login} className="gap-6 p-8">
          <div className="flex flex-col">
            <label className="text-white mb-1">Informe seu email</label>
            <input type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 p-1.5 rounded-md mb-6" />
          </div>
          <div className="flex flex-col">
            <label className="text-white mb-1">Informe sua senha</label>
            <input type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 p-1.5 rounded-md mb-1" />
            <a href="../" className="mt-1 ml-1.5 underline text-gray-400 hover:text-gray-200 text-xs flex items-center gap-2 mb-5">
              Esqueci minha senha
            </a>
          </div>

          <div className="flex flex-col mt-6 items-center">
           
           <button
             type="submit"
             className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-2xl flex px-8 gap-2 transition pointer-events-auto"
             style={{ fontFamily: "Jaro" }}>
             CONTINUAR
           </button>

            <a href="/cadastro" className="mt-1 ml-1.5 underline text-gray-400 hover:text-gray-200 text-sm flex items-center gap-2">
              Nâo tenho cadastro
            </a>
           
          </div>

        </form>
      </div>
    </div>
  );
}


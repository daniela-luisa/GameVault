import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

   const navigate = useNavigate();

  async function login(e) {
    e.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3001/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });
      const dados = await resposta.json();
     if (resposta.ok) {
        navigate("/admin/dashboard"); // redireciona para dashboard
      } else {
        setMsg(dados.erro || "Erro no login");
      }
    } catch {
      setMsg("Erro na conexão");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F]">
      <div className="bg-black/50 rounded-2xl p-10 w-[500px] h-[450px]">

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-5xl font-bold tracking-widest" style={{ fontFamily: "Acme" }}>ADMIN</h1>
          <div className="flex items-center gap-2">
            <img src="../Game-removebg-preview.png" alt="Game Vault Logo" className="h-18" />
          </div>
        </div>

        <form onSubmit={login} className="gap-4 p-8">
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
              onChange={e => setSenha(e.target.value)}
              required
              className="bg-gray-800 text-white placeholder-gray-400 p-1.5 rounded-md mb-1" />
            
          </div>

          <div className="flex flex-col mt-6 items-center">
           
           <button
             type="submit"
             className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-2xl flex px-8 gap-2 transition pointer-events-auto"
             style={{ fontFamily: "Jaro" }}>
             ENTRAR
           </button>
          </div>

        </form>
      </div>
    </div>
  );
}

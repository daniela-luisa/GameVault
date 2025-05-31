import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form onSubmit={login} className="bg-white p-6 rounded shadow w-full max-w-xs">
        <h1 className="text-xl font-bold mb-4 text-center">Login Admin</h1>
        <input type="email" placeholder="Email"className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input type="password" placeholder="Senha" className="w-full mb-3 p-2 border rounded focus:ring-2 focus:ring-blue-500"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Entrar</button>
        {msg && <p className="mt-3 text-center text-red-600">{msg}</p>}
      </form>
    </div>
  );
}

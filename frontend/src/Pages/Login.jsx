import { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const Login = async (e) => {
        e.preventDefault();
    
        const resposta = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha }),
        });
    
        const data = await resposta.json();
    
        if (resposta.ok) {
          alert('Login feito com sucesso!');
          console.log(data); // Token, dados do usuário, etc.
        } else {
          alert(data.erro || 'Erro ao fazer login');
        }
      };

      return (
        <form onSubmit={Login}>
          <h1>Login</h1>
          <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
          <button type="submit">Entrar</button>
        </form>
      );
}


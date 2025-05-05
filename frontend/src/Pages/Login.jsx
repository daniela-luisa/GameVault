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
          alert('Login feito com sucesso!');
          console.log(dados); 
          
          localStorage.setItem('id_usuario', dados.usuario.id);
          //--------------------------------------------------
          if (dados.usuario.cadastro2Completo) {
            navigate('/home');
          } else {
            navigate('/cadastro2');
          }
          //------------------------------------------------------
        } else {
          alert(dados.erro || 'Erro ao fazer login');
        }
      };

      return (
        // aqui dentro do form ele vai pegar todos os dados dentro dos input e enviar para o metodo post do localhost:3001/login no backend pra poder fazer o controle de login ou seja, cuidado ao mexer
        <form onSubmit={Login}>
          <h1>Login</h1>
          <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
          <button type="submit">Entrar</button>
        </form>
      );
}


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
        <div>
        <h1>Cadastro</h1>
        {/* aqui com o form ele vai mandar o que ta dentro dos input pro post do localhost:3001/cadastro no backend */}
        <form onSubmit={Cadastro}>
            
            <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
            <input type="text" placeholder="Digite seu nome de usuario" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)}/>
            <input type="date" placeholder="Digite sua data de nascimento" value={dtNascimento} onChange={(e) => setDtNascimento(e.target.value)}/>
            <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)}/>
            <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
}

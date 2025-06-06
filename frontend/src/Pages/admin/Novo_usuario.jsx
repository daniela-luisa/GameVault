import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NovoUsuario() {
  const [nome, setNome] = useState('');
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [dtNascimento, setDtNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const cadastrar = async (e) => {
  e.preventDefault();
  try {
    const resposta = await fetch('http://localhost:3001/admin/novo-usuario', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({nome,nomeUsuario, dtNascimento, email, senha }),
    });

    const dados = await resposta.json();
    setMensagem(dados.mensagem);
    setSucesso(dados.sucesso);

    if (dados.sucesso) {
      setTimeout(() => {navigate('/admin/usuarios');}, 1500);}
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    setMensagem('Erro inesperado ao cadastrar.');
    setSucesso(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Novo Usuário</h1>

      {mensagem && (
        <div style={{ backgroundColor: sucesso ? 'green' : 'red', padding: '10px', marginBottom: '10px' }}>
          {mensagem}
        </div>
      )}

      <form onSubmit={cadastrar}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
  <label>Nome:<input type="text" value={nome}onChange={(e) => setNome(e.target.value)}required/></label>

  <label>Nome de usuário:<input type="text" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)}required/></label>

  <label>Data de nascimento:<input type="date"value={dtNascimento}onChange={(e) => setDtNascimento(e.target.value)}required/></label>

  <label>Email:<input type="email" value={email}onChange={(e) => setEmail(e.target.value)}required/></label>

  <label>Senha:<input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required/></label>

<div style={{ marginTop: '20px'  }}>
  <Link to="/admin/usuarios">Voltar</Link>
  <button type="submit">Cadastrar</button>
</div>

</div>



      </form>
    </div>
  );
}

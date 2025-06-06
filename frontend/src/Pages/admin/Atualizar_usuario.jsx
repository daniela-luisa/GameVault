import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function AtualizarUsuario() {
const {id} = useParams();
const [nome, setNome] = useState('');
const [nomeUsuario, setNomeUsuario] = useState('');
const [dtNascimento, setDtNascimento] = useState('');
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [mensagem , setMensagem] = useState('');
const [sucesso, setSucesso] = useState(null);
const navigate = useNavigate();


 useEffect(() => {
async function getAtualizarUsuario(){
try{
     const resposta = await fetch(`http://localhost:3001/admin/atualizar-usuario/${id}`);
     const dados = await resposta.json();
     if(resposta.ok){
        setNome(dados.usuario.nome);
        setNomeUsuario(dados.usuario.nick);
        setDtNascimento(dados.usuario.dt_nasc ? dados.usuario.dt_nasc.substring(0, 10) : '');
        setEmail(dados.usuario.email);
        setSenha(dados.usuario.senha); 
    }else{
        setMensagem(dados.mensagem);
        setSucesso(false);
    }   

}catch(erro){
    setMensagem('Erro ao buscar usuario.');
    setSucesso(false);
   }
 }
getAtualizarUsuario();
 }, [id]);


  const atualizar = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch(`http://localhost:3001/admin/atualizar-usuario/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({nome, nomeUsuario, dtNascimento,email, senha })
      });

      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);

      if (dados.sucesso) {
        setTimeout(() => navigate('/admin/usuarios'), 1500);
      }
    } catch (erro) {
      console.error('Erro ao atualizar usuário:', erro);
      setMensagem('Erro inesperado ao atualizar usuário.');
      setSucesso(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #000A05, #002211, #003F1F)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: '#00000088', padding: '2rem', borderRadius: '8px', width: '100%', maxWidth: '500px' }}>
        <h1 style={{ marginBottom: '1rem' }}>Atualizar Usuário</h1>

        {mensagem && (
          <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: sucesso ? 'green' : 'red' }}>{mensagem}</div>
        )}

        <form onSubmit={atualizar}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Nome</label><br />
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Nome de Usuário</label><br />
            <input type="text" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} required style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Data de Nascimento</label><br />
            <input type="date" value={dtNascimento} onChange={(e) => setDtNascimento(e.target.value)} required style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label><br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Senha</label><br />
            <input type="text" value={senha} onChange={(e) => setSenha(e.target.value)} required style={{ width: '100%' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/admin/usuarios">Voltar</Link>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


export default function Perfil() {
  const { id } = useParams(); // aqui ele vai pega o id da url (usando a rota)
  const [usuario, setUsuario] = useState(null); //aqui armazena os dados do usuario

  useEffect(() => {
    async function buscarPerfil() {
      try {
        const response = await fetch(`http://localhost:3001/perfil/${id}`);
        const dados = await response.json();
        console.log('Dados recebidos do backend:', dados);

        if (response.ok) {
          setUsuario(dados[0]);
        } else {
          alert(dados.erro || 'Erro ao carregar perfil');
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
      }
    }

    buscarPerfil();
  }, [id]); //sempre quando o id muda o useeffect vai ser chamado

  if (!usuario) {
    return <div>Carregando...</div>; // Enquanto os dados não chegam, mostra uma mensagem
  }

  return (
    
    <div>
         <nav>
        <ul>
          <li><Link to="/home">Início</Link></li>
          <li><Link to="/favoritos">Favoritos</Link></li>
          <li><Link to={`/perfil/${id}`}>Perfil</Link></li>
        </ul>
      </nav>
      <h1>Perfil de {usuario.nome}</h1>
      <p>Nome de usuário: {usuario.nick}</p>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

 export default function Cadastro2() {
   const [categorias, setCategorias] = useState([]); 
   const [selecionadas, setSelecionadas] = useState([]);
   const navigate = useNavigate();
   const id_usuario = localStorage.getItem('id_usuario');
  //  console.log("ID do usuário logado:", id_usuario); 

  useEffect(() => {
  async function carregarCategorias() {
    try {
      const response = await fetch('http://localhost:3001/categorias');
      const dados = await response.json();
      setCategorias(dados);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }
  carregarCategorias();
}, []);

const toggleCategoria = (id) => {
    if (selecionadas.includes(id)) {
      setSelecionadas(selecionadas.filter(cat => cat !== id));
    } else {
      setSelecionadas([...selecionadas, id]);
    }
  };

  const enviarCategorias = () => {
    fetch('http://localhost:3001/salvar-categorias', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_usuario,
        categorias: selecionadas
      })
    })
    .then(response => {
      if (response.ok) {
        alert("Categorias salvas com sucesso!");
        navigate('/home');
      } else {
        alert("Erro ao salvar categorias");
      }
    })
    .catch(error => console.error("Erro ao enviar:", error));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Escolha suas categorias favoritas</h2>
      <div>
        {/* aqui ele vai mapear todas as categorias e por em um botão cada uma delas*/}
        {categorias.map(categoria => (
          <button key={categoria.id_catego} onClick={() => toggleCategoria(categoria.id_catego)}
            style={{ border: selecionadas.includes(categoria.id_catego) ? '2px solid green' : '1px solid gray'}} >  {categoria.nome} </button>
        ))}
      </div>
      <br />
      <button onClick={enviarCategorias}>Confirmar Categorias</button>
    </div>
  );
}

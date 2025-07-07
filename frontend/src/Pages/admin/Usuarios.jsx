import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [preferencias, setPreferencias] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const [admNome, setAdmNome] = useState('');

  const carregarUsuarios = async () => {
    try {
      const resposta = await fetch('http://localhost:3001/admin/usuarios');
      const dados = await resposta.json();
      setUsuarios(dados.usuarios || []);
      setAdmNome(dados.admNome || '');

      if (dados.usuarios && dados.usuarios.length > 0) {
        carregarPreferencias(dados.usuarios[0].id_usuario);
        setUsuarioSelecionado(dados.usuarios[0].id_usuario);
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const excluirUsuario = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3001/admin/excluir-usuario/${id}`);
      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);
      if (dados.sucesso) {
        setUsuarios(prev => prev.filter(u => u.id_usuario !== id));
        setPreferencias([]);
        setUsuarioSelecionado(null);
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  const carregarPreferencias = async (id) => {
    try {
      const resposta = await fetch(`http://localhost:3001/admin/preferencias/${id}`);
      const dados = await resposta.json();
      setPreferencias(dados.preferencias || []);
      setUsuarioSelecionado(id);
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
    }
  }

  const excluirPreferencia = async (id_usuario, id_categoria) => {
    try {
      const resposta = await fetch(`http://localhost:3001/admin/excluir-preferencia/${id_usuario}/${id_categoria}`);
      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);
      if (dados.sucesso) {
        setPreferencias(prev => prev.filter(p => p.id_catego !== id_categoria));
      }
    } catch (error) {
      console.error('Erro ao excluir preferência:', error);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href="/admin/dashboard" className="hover:text-green-500 ">Dashboard</a>
          <a href="/admin/jogos" className="hover:text-green-500">Jogos</a>
          <a href="/admin/usuarios" className="hover:text-green-500 text-green-500">Usuários</a>
          <a href="/admin/categorias" className="hover:text-green-500">Categorias</a>
        </div>
        <div className="text-white text-xs">{admNome}</div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Gerenciamento de Usuarios</h1>
          <Link to="/admin/novo-usuario" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 font-semibold">Adicionar Usuario</Link>
        </div>

        {mensagem && (
          <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: sucesso ? 'green' : 'red', color: 'white' }}>
            {mensagem}
          </div>
        )}
        <div className="overflow-x-auto mb-12">
          <table className="min-w-full bg-gray-800 text-white rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-sm text-white">
              <tr>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Nome de Usuario</th>
                <th className="py-3 px-6 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr style={{ cursor: 'pointer' }} onClick={() => carregarPreferencias(usuario.id_usuario)} key={usuario.id_usuario}
                className="border-b border-gray-600 hover:bg-gray-700">
                  <td className="py-3 px-6" >{usuario.email}
                  </td>
                  <td className="py-3 px-6" >{usuario.nick}
                  </td>

                  <td className="py-3 px-6 text-center space-x-2">
                    <Link to={`/admin/atualizar-usuario/${usuario.id_usuario}`} style={{ cursor: 'pointer' }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded font-medium">Editar</Link>
                    <button onClick={() => excluirUsuario(usuario.id_usuario)} style={{ cursor: 'pointer' }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded font-medium">Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {usuarioSelecionado && (
          <div className='flex justify-between min-w-1/4'>
            <div style={{ display: 'flex', justifyContent: 'space-between' }} className='mb-2 gap-13'>
              <h2 className="text-2xl font-bold">Preferências do Usuário Selecionado</h2>
              <Link to={`/admin/nova-preferencia/${usuarioSelecionado}`} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 font-semibold">Adicionar Preferência</Link>
            </div>
          </div>

        )}

        {usuarioSelecionado && (
          <div className="overflow-x-auto mb-12">
            <table className="w-1/2 bg-gray-800 text-white rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-sm text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Categoria</th>
                  <th className="py-3 px-6 text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {preferencias.length > 0 ? (
                  preferencias.map((pref, index) => (
                    <tr key={index} className="border-b border-gray-600 hover:bg-gray-700">
                      <td className="py-3 px-6">{pref.nome}</td>
                      <td className="py-3 px-6 text-end">
                        <button
                          onClick={() => excluirPreferencia(usuarioSelecionado, pref.id_catego)}
                          style={{ cursor: 'pointer' }}
                         className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded font-medium">
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-3 px-6" colSpan="2">Nenhuma preferência encontrada.</td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>
      
    </div>
  );
}

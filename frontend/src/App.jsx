import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './Pages/Home';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import Cadastro2 from './Pages/Cadastro2';
import Perfil from './Pages/Perfil';
import Favoritos from './Pages/Favoritos';

import LoginAdmin from './Pages/admin/Login';
import Dashboard from './Pages/admin/Dashboard';
import Usuarios from './Pages/admin/Usuarios';
import Jogos from './Pages/admin/Jogos';
import Categorias from './Pages/admin/Categorias';
import NovaCategoria from './Pages/admin/Nova_categoria';
import AtualizarCategoria from './Pages/admin/Atualizar_categoria';
import AtualizarUsuario from './Pages/admin/Atualizar_usuario';
import NovoUsuario from './Pages/admin/Novo_usuario';
import NovaPreferencia from './Pages/admin/nova_preferencia';
import NovoJogo from './Pages/admin/Novo_jogo';
import NovaCategJogo from './Pages/admin/Novo_categJogo';
import AtualizarJogo from './Pages/admin/Atualizar_jogo';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home/:id" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro2" element={<Cadastro2 />} />
        <Route path='/perfil/:id' element={<Perfil />}/>
        <Route path='/favoritos/:id' element={<Favoritos />}/>

        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/admin/novo-usuario" element={<NovoUsuario />} />
        <Route path= "/admin/atualizar-usuario/:id" element={< AtualizarUsuario/>} />
        <Route path="/admin/nova-preferencia/:id" element={<NovaPreferencia />} />

        <Route path="/admin/jogos" element={<Jogos />} />
        <Route path="/admin/novo-jogo" element={<NovoJogo />} />
        <Route path= "/admin/atualizar-jogo/:id" element={< AtualizarJogo/>} />
        <Route path="/admin/nova-categoria-jogo/:id" element={<NovaCategJogo />} /> 

        <Route path="/admin/categorias" element={<Categorias />} />
        <Route path="/admin/nova-categoria" element={<NovaCategoria />} />
        <Route path="/admin/atualizar-categoria/:id" element={<AtualizarCategoria/>} />

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

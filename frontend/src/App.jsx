import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Home from './Pages/Home';
// import Usuarios from './Pages/Usuario';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import Cadastro2 from './Pages/Cadastro2';
import Perfil from './Pages/Perfil';

import LoginAdmin from './Pages/admin/Login';
import Dashboard from './Pages/admin/Dashboard';
import Usuarios from './Pages/admin/Usuarios';
import Jogos from './Pages/admin/Jogos';
import Categorias from './Pages/admin/Categorias';
import NovaCategoria from './Pages/admin/Nova_categoria';
import AtualizarCategoria from './Pages/admin/Atualizar_categoria';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/usuarios" element={<Usuarios />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro2" element={<Cadastro2 />} />
        <Route path='/perfil/:id' element={<Perfil />}/>

        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/admin/jogos" element={<Jogos />} />
        <Route path="/admin/categorias" element={<Categorias />} />
        <Route path="/admin/nova-categoria" element={<NovaCategoria />} />
        <Route path="/admin/atualizar-categoria/:id" element={<AtualizarCategoria/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;

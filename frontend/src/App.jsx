import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Usuarios from './Pages/Usuario';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro';
import Cadastro2 from './Pages/Cadastro2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cadastro2" element={<Cadastro2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

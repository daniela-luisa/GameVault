import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Usuarios from './Pages/Usuario';
import Login from './Pages/Login';
import Cadastro from './Pages/Cadastro'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/usuarios">Usuários</Link> | <Link to="/login">Login</Link> | <Link to="/cadastro">Cadastri</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

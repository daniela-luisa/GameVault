import { Link } from 'react-router-dom';

export default function Dashboard() {
    
return (
  <div className="max-w-4xl mx-auto p-6">
    <nav className="flex space-x-4">
      <a href="/admin/dashboard" className="text-blue-500 hover:underline">Dashboard</a>
      <a href="/admin/jogos" className="text-blue-500 hover:underline">Jogos</a>
      <a href="/admin/usuarios" className="text-blue-500 hover:underline">Usuários</a>
      <a href="/admin/categorias" className="text-blue-500 hover:underline">Categorias</a>
    </nav>
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
  </div>
);
}

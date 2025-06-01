export default function Usuarios() {
  return (
        <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] text-white">
      <nav className="bg-black flex justify-between items-center px-6 py-4 text-sm font-semibold text-white">
        <div className="flex items-center space-x-6">
          <img src="../Game-removebg-preview.png" alt="Logo" className="h-10 w-auto" />
          <a href="/admin/dashboard" className="hover:text-green-500 text-green-500">Dashboard</a>
          <a href="/admin/jogos" className="hover:text-green-500">Jogos</a>
          <a href="/admin/usuarios" className="hover:text-green-500">Usuários</a>
          <a href="/admin/categorias" className="hover:text-green-500">Categorias</a>
        </div>
      </nav>
           <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciamento de Usuarios</h1>
        </div>
      </div>
      {/* Futuramente: listagem e ações */}
    </div>
  );
}

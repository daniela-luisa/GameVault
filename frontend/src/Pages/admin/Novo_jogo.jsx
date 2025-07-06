import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NovoJogo() {
  const [nomeJogo, setNomeJogo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dt_lanca, setDtLanca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const [arquivo, setCapa] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const cadastrar = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nomeJogo', nomeJogo);
    formData.append('descricao', descricao);
    formData.append('dt_lanca', dt_lanca);
    formData.append('capa', arquivo);

    try {
      const resposta = await fetch('http://localhost:3001/admin/novo-jogo', {
        method: 'POST',
        body: formData,
      });

      const dados = await resposta.json();
      setMensagem(dados.mensagem);
      setSucesso(dados.sucesso);

      if (dados.sucesso) {
        setTimeout(() => {
          navigate('/admin/jogos');
        }, 1500);
      }
    } catch (error) {
      console.error('Erro ao cadastrar jogo:', error);
      setMensagem('Erro inesperado ao cadastrar.');
      setSucesso(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCapa(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] flex justify-center items-center">
      <div className="bg-black/50 p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-white mb-6">Cadastrar Novo Jogo</h1>

        {mensagem && (
          <div className={`mb-4 p-3 rounded text-white ${sucesso ? 'bg-green-600' : 'bg-red-600'}`}>
            {mensagem}
          </div>
        )}

        <form onSubmit={cadastrar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna esquerda */}
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-semibold mb-1">Nome do Jogo</label>
              <input
                type="text"
                value={nomeJogo}
                onChange={(e) => setNomeJogo(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Digite o nome do jogo"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-semibold mb-1">Data de Lançamento</label>
              <input
                type="date"
                value={dt_lanca}
                onChange={(e) => setDtLanca(e.target.value)}
                required
                className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-semibold mb-1">Capa</label>
              
              <label htmlFor="upload" className="cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    alt="Capa do jogo"
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-48 h-48 flex items-center justify-center bg-gray-700 rounded-lg text-gray-300">
                    Nenhuma imagem
                  </div>
                )}
              </label>

              <input
                id="upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Coluna direita */}
          <div>
            <label className="block text-white text-sm font-semibold mb-1">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className="w-full h-full min-h-[220px] px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Digite a descrição do jogo"
            ></textarea>
          </div>

          {/* Botões */}
          <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
            <Link
              to="/admin/jogos"
              className="bg-gray-600 text-white px-6 py-2 rounded font-bold hover:bg-gray-700 transition"
            >
              Voltar
            </Link>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600 transition"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

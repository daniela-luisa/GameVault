import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function AtualizarUsuario() {
    const { id } = useParams();
    const [nomeJogo, setNomeJogo] = useState('');
    const [Descricao, setDescricao] = useState('');
    const [dtLancamento, setDtLanca] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [sucesso, setSucesso] = useState(null);
    const [arquivo, setArquivo] = useState(null);
    const [preview, setPreview] = useState(null); // Preview da imagem
    const navigate = useNavigate();

    useEffect(() => {
        async function getAtualizarJogo() {
            try {
                const resposta = await fetch(`http://localhost:3001/admin/atualizar-jogo/${id}`);
                const dados = await resposta.json();
                if (resposta.ok) {
                    setNomeJogo(dados.jogo.nome);
                    setDescricao(dados.jogo.descricao);
                    setDtLanca(dados.jogo.dt_lanca ? dados.jogo.dt_lanca.substring(0, 10) : '');
                    setArquivo(dados.jogo.capa);
                    setPreview(`http://localhost:3001/uploads/${dados.jogo.capa}`);
                } else {
                    setMensagem(dados.mensagem || 'Erro ao carregar jogo');
                    setSucesso(false);
                }
            } catch (erro) {
                console.error('Erro ao buscar jogo:', erro);
                setMensagem('Erro ao buscar jogo.');
                setSucesso(false);
            }
        }
        getAtualizarJogo();
    }, [id]);

    const atualizar = async (e) => {
        e.preventDefault();
        setMensagem('');

        try {
            const formData = new FormData();
            formData.append('nomeJogo', nomeJogo);
            formData.append('descricao', Descricao);
            formData.append('dt_lanca', dtLancamento);
            formData.append('capa', arquivo);

            const resposta = await fetch(`http://localhost:3001/admin/atualizar-jogo/${id}`, {
                method: 'POST',
                body: formData,
            });

            const dados = await resposta.json();
            setMensagem(dados.mensagem || '');
            setSucesso(dados.sucesso);

            if (dados.sucesso) {
                setTimeout(() => {
                    navigate('/admin/jogos');
                }, 1500);
            }
        } catch (erro) {
            console.error('Erro ao atualizar jogo:', erro);
            setMensagem('Erro inesperado ao atualizar jogo.');
            setSucesso(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArquivo(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#000A05] via-[#002211] to-[#003F1F] flex justify-center items-center">
            <div className="bg-black/50 p-8 rounded-lg shadow-lg w-full max-w-5xl">
                <h1 className="text-3xl font-bold text-white mb-6">Editar Jogo</h1>

                {mensagem && (
                    <div className={`mb-4 p-3 rounded text-white ${sucesso ? 'bg-green-600' : 'bg-red-600'}`}>
                        {mensagem}
                    </div>
                )}

                <form onSubmit={atualizar} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Coluna esquerda */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-white text-sm font-semibold mb-1">Nome do jogo</label>
                            <input
                                type="text"
                                value={nomeJogo}
                                onChange={(e) => setNomeJogo(e.target.value)}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500"
                                placeholder="Nome do jogo"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm font-semibold mb-1">Data de lançamento</label>
                            <input
                                type="date"
                                value={dtLancamento}
                                onChange={(e) => setDtLanca(e.target.value)}
                                className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white text-sm font-semibold mb-1">Capa</label>
                            <label htmlFor="upload" className="cursor-pointer">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Capa do jogo"
                                        className="w-50 h-50 object-cover rounded-lg shadow-md"
                                    />
                                ) : (
                                    <div className="w-50 h-50 flex items-center justify-center bg-gray-700 rounded-lg text-gray-300">
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
                            value={Descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            className="w-full h-full min-h-[300px] px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            placeholder="Descrição do jogo"
                            required
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
                            disabled={sucesso}
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

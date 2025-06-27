import { expect, jest } from '@jest/globals';
import { buscarCategorias } from '../../src/models/usuarioModel.js';

const mockAutenticarAdmin = jest.fn();
const mockOutros = jest.fn();
const mockAdminBuscarCategoriasJogos  = jest.fn();
const mockAdminBuscarCategoriaPorCodigo  = jest.fn();
const mockAdminBuscarCategoria = jest.fn();
const mockAdminAtualizarCategoria = jest.fn();
const mockAdminVerificarQtdJogosCategoria = jest.fn();
const mockAdminExistePreferenciaCategoria = jest.fn();
const mockAdminExcluirCategoria = jest.fn();
const mockListarUsuarios = jest.fn();
const mockBuscarNomeUsuario = jest.fn();
const mockAdminInserirUsuario = jest.fn();
const mockAdminBuscarUsuarioPorCodigo = jest.fn();
const mockAdminAtualizarUsuario = jest.fn();
const mockAdminExcluirUsuario = jest.fn();
const mockBuscarCategorias = jest.fn();
const mockCategoriaEscolhida = jest.fn();
const mockDeletarPreferencia = jest.fn();


jest.unstable_mockModule('../../src/models/usuarioModel.js', () => ({
 buscarCategorias: mockBuscarCategorias,
 categoriaEscolhida: mockCategoriaEscolhida
}));
jest.unstable_mockModule('../../src/models/adminModel.js', () => ({
  autenticarAdmin: mockAutenticarAdmin,
  listarUsuarios: mockListarUsuarios,
  adminBuscarCategoriasJogos: mockAdminBuscarCategoriasJogos,
  adminBuscarCategoria: mockAdminBuscarCategoria,
  adminAtualizarCategoria: mockAdminAtualizarCategoria,
  adminInserirCategoria: mockOutros,
  adminBuscarCategoriaPorCodigo: mockAdminBuscarCategoriaPorCodigo,
  adminVerificarQtdJogosCategoria: mockAdminVerificarQtdJogosCategoria,
  adminExcluirCategoria: mockAdminExcluirCategoria,
  adminExistePreferenciaCategoria: mockAdminExistePreferenciaCategoria,
  adminInserirUsuario: mockAdminInserirUsuario,
  buscarNomeUsuario: mockBuscarNomeUsuario,
  adminExcluirUsuario: mockAdminExcluirUsuario,
  adminBuscarUsuarioPorCodigo: mockAdminBuscarUsuarioPorCodigo,
  adminAtualizarUsuario: mockAdminAtualizarUsuario,
  buscarPreferencias: mockOutros,
  deletarPreferencia: mockDeletarPreferencia,
}));


const { loginAdmin } = await import('../../src/controllers/adminController.js');
const { postAtualizarCategoria } = await import('../../src/controllers/adminController.js');
const { excluirCategoria } = await import('../../src/controllers/adminController.js');
const { getUsuarios } = await import('../../src/controllers/adminController.js');
const { postNovoUsuario } = await import('../../src/controllers/adminController.js');
const { getAtualizarUsuario } = await import('../../src/controllers/adminController.js');
const { postAtualizarUsuario } = await import('../../src/controllers/adminController.js');
const { excluirUsuario } = await import('../../src/controllers/adminController.js');
const { getPreferencias } = await import('../../src/controllers/adminController.js');
const { excluirPreferencia } = await import('../../src/controllers/adminController.js');
const { postNovaPreferencia } = await import('../../src/controllers/adminController.js');
const { getNovaPreferencia } = await import('../../src/controllers/adminController.js');



beforeEach(() => {
  jest.clearAllMocks();
});

//-----------------------------------------------------------------------------------------
describe('Teste do loginAdmin', () => {
  it('deve realizar login com sucesso quando credenciais estiverem corretas', async () => {
    mockAutenticarAdmin.mockResolvedValue({ id_admin: 1, email: 'admin@teste.com' });

    const req = { body: { email: 'admin@teste.com', senha: '123' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await loginAdmin(req, res);

    expect(mockAutenticarAdmin).toHaveBeenCalledWith('admin@teste.com', '123');
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Login de admin bem-sucedido', admin: { id_admin: 1, email: 'admin@teste.com' } });
  });

  it('deve retornar erro 401 se o admin não for encontrado', async () => {
    mockAutenticarAdmin.mockResolvedValue({});

    const req = { body: { email: 'admin@teste.com', senha: '123' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Email ou senha inválidos' });
  });

  it('deve retornar erro 500 em caso de falha interna', async () => {
    mockAutenticarAdmin.mockRejectedValue(new Error('Falha no banco'));

    const req = { body: { email: 'admin@teste.com', senha: '123' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await loginAdmin(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao fazer login de admin' });
  });
});
//-----------------------------------------------------------------------------------------
describe('Teste getCategorias (admin)', () => {
  it('deve retornar erro 500 ao lançar exceção', async () => {
    mockAdminBuscarCategoriasJogos.mockRejectedValue(new Error('Falha no banco'));

    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    const { getCategorias } = await import('../../src/controllers/adminController.js');
    await getCategorias(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({mensagem: 'Erro ao buscar categorias',sucesso: false,erro: 'Falha no banco'});
  });
});
//-----------------------------------------------------------------------------------------
describe('Teste getatualizarCategoria', () => {
  it('deve retornar mensagem de erro se a categoria não for encontrada', async () => {
    mockAdminBuscarCategoriaPorCodigo.mockResolvedValue(null);

    const req = { params: { id: 999 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    const { getatualizarCategoria } = await import('../../src/controllers/adminController.js');
    await getatualizarCategoria(req, res, next);

    expect(res.json).toHaveBeenCalledWith({admNome: global.admNome,mensagem: 'Categoria não encontrada.',sucesso: false});
  });
});
//-----------------------------------------------------------------------------------------

describe('Teste postAtualizarCategoria', () => {
  it('deve retornar erro se o nome estiver vazio', async () => {
    const req = { params: { id: 1 },body: { nome: '' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    const { postAtualizarCategoria } = await import('../../src/controllers/adminController.js');
    await postAtualizarCategoria(req, res, next);

    expect(res.json).toHaveBeenCalledWith({admNome: global.admNome,categoria: { id_catego: 1, nome: '' },mensagem: "Todos os campos são obrigatórios.",sucesso: false
    });
  });
  it('deve retornar erro se a categoria já existir com outro ID', async () => {
    mockAdminBuscarCategoria.mockResolvedValue({ id_catego: 99 });

    const req = { params: { id: 1 },body: { nome: 'Aventura' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    await postAtualizarCategoria(req, res, next);

    expect(mockAdminBuscarCategoria).toHaveBeenCalledWith('Aventura');
    expect(res.json).toHaveBeenCalledWith({admNome: global.admNome,categoria: { id_catego: 1, nome: 'Aventura' },mensagem: "Categoria já existe.",sucesso: false});
  });
});
//-----------------------------------------------------------------------------------------
describe('Teste excluirCategoria', () => {
  it('deve retornar erro se a categoria não existir', async () => {
    mockAdminBuscarCategoriaPorCodigo.mockResolvedValue(null);
    mockAdminBuscarCategoriasJogos.mockResolvedValue([]);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await excluirCategoria(req, res);

    expect(res.json).toHaveBeenCalledWith({admNome: global.admNome,categorias: [],mensagem: "Categoria não existe.",sucesso: false});
  });

  it('deve retornar erro se a categoria possuir jogos', async () => {
    mockAdminBuscarCategoriaPorCodigo.mockResolvedValue({ id_catego: 1 });
    mockAdminVerificarQtdJogosCategoria.mockResolvedValue(2);
    mockAdminBuscarCategoriasJogos.mockResolvedValue([]);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await excluirCategoria(req, res);

    expect(res.json).toHaveBeenCalledWith({admNome: global.admNome,categorias: [],mensagem: "Categoria possui jogos atrelados.",sucesso: false});
  });

  it('deve retornar erro se a categoria possuir preferências', async () => {
    mockAdminBuscarCategoriaPorCodigo.mockResolvedValue({ id_catego: 1 });
    mockAdminVerificarQtdJogosCategoria.mockResolvedValue(0);
    mockAdminExistePreferenciaCategoria.mockResolvedValue(1);
    mockAdminBuscarCategoriasJogos.mockResolvedValue([]);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await excluirCategoria(req, res);

    expect(res.json).toHaveBeenCalledWith({admNome: global.admNome,categorias: [],mensagem: "Categoria não pode ser excluída pois está associada a usuários.",sucesso: false });
  });

  it('deve excluir categoria com sucesso', async () => {
    mockAdminBuscarCategoriaPorCodigo.mockResolvedValue({ id_catego: 1 });
    mockAdminVerificarQtdJogosCategoria.mockResolvedValue(0);
    mockAdminExistePreferenciaCategoria.mockResolvedValue(0);
    mockAdminExcluirCategoria.mockResolvedValue();
    mockAdminBuscarCategoriasJogos.mockResolvedValue([{ id: 1, nome: 'Ação' }]);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await excluirCategoria(req, res);

    expect(res.json).toHaveBeenCalledWith({admNome: global.admNome,categorias: [{ id: 1, nome: 'Ação' }],mensagem: "Categoria excluida com sucesso.",sucesso: true});
  });
});
//-----------------------------------------------------------------------------------------
describe('getUsuarios - erro ao buscar usuários', () => {
  it('deve retornar erro e listas vazias se falhar', async () => {
    mockListarUsuarios.mockRejectedValue(new Error('Falha ao buscar'));

    const req = {};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getUsuarios(req, res);

  expect(res.json).toHaveBeenCalledWith({ admNome: global.admNome,usuarios: [],preferencias: [],mensagem: 'Erro ao carregar usuários.',
sucesso: false});
  });
});
//-----------------------------------------------------------------------------------------
describe('postNovoUsuario - campos obrigatórios não preenchidos', () => {
  it('deve retornar erro se algum campo estiver vazio', async () => {
    const req = { body: {nome: 'Daniela', nomeUsuario: '', dtNascimento: '2004-05-06',email: 'dani@email.com',senha: '123'}};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await postNovoUsuario(req, res);

    expect(res.json).toHaveBeenCalledWith({admNome: global.admNome,mensagem: 'Todos os campos são obrigatórios.',sucesso: false});
  });
    it('deve retornar mensagem de erro ao lançar exceção', async () => {
    mockBuscarNomeUsuario.mockResolvedValue(null); // Não existe duplicado
    mockAdminInserirUsuario.mockRejectedValue(new Error('Falha no banco'));

    const req = {body: {nome: 'Daniela', nomeUsuario: 'dani123',dtNascimento: '2004-05-06', email: 'dani@email.com', senha: '123'}};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await postNovoUsuario(req, res);

    expect(res.json).toHaveBeenCalledWith({admNome: global.admNome,mensagem: 'Erro ao Inserir usuário.',sucesso: false});
  });
});
//--------------------------------------------------------------------------------------------
describe('Teste do getAtualizarUsuario', () => {
  it('deve retornar o usuário quando encontrado', async () => {
    mockAdminBuscarUsuarioPorCodigo.mockResolvedValue({ id_usuario: 1, nome: 'Daniela' });

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getAtualizarUsuario(req, res);

    expect(mockAdminBuscarUsuarioPorCodigo).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith({ admNome: global.admNome, usuario: { id_usuario: 1, nome: 'Daniela' }, mensagem: null, sucesso: false });
  });

  it('deve retornar mensagem de erro quando usuário não existe', async () => {
    mockAdminBuscarUsuarioPorCodigo.mockResolvedValue(null);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getAtualizarUsuario(req, res);

    expect(res.json).toHaveBeenCalledWith({ admNome: global.admNome, mensagem: 'Usuário não encontrado.', sucesso: false });
  });

  it('deve retornar erro ao lançar exceção', async () => {
    mockAdminBuscarUsuarioPorCodigo.mockRejectedValue(new Error('Erro de banco'));

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getAtualizarUsuario(req, res);

    expect(res.json).toHaveBeenCalledWith({ admNome: global.admNome, mensagem: 'Erro ao carregar usuário.', sucesso: false });
  });
});
//--------------------------------------------------------------------------------

describe('Teste do postAtualizarUsuario', () => {
  it('deve retornar erro se faltar campos obrigatórios', async () => {
    const req = { params: { id: 1 }, body: { nome: '', nomeUsuario: '', dtNascimento: '', email: '', senha: '' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await postAtualizarUsuario(req, res);

    expect(res.json).toHaveBeenCalledWith({ admNome: global.admNome, usuario: { id_usuario: 1, nome: '', nick: '', dt_nasc: '', email: '', senha: '' }, mensagem: 'Todos os campos são obrigatórios.', sucesso: false });
  });

  it('deve atualizar o usuário com sucesso', async () => {
    mockAdminAtualizarUsuario.mockResolvedValue();

    const req = { params: { id: 1 }, body: { nome: 'Daniela', nomeUsuario: 'dani123', dtNascimento: '2000-01-01', email: 'dani@email.com', senha: '123' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await postAtualizarUsuario(req, res);

    expect(mockAdminAtualizarUsuario).toHaveBeenCalledWith(1, 'Daniela', 'dani123', '2000-01-01', 'dani@email.com', '123');
    expect(res.json).toHaveBeenCalledWith({ admNome: global.admNome, usuario: { id_usuario: 1, nome: 'Daniela', nick: 'dani123', dt_nasc: '2000-01-01', email: 'dani@email.com', senha: '123' }, mensagem: 'Usuário atualizado com sucesso!', sucesso: true });
  });

  it('deve retornar erro ao lançar exceção', async () => {
    mockAdminAtualizarUsuario.mockRejectedValue(new Error('Erro no banco'));

    const req = { params: { id: 1 }, body: { nome: 'Daniela', nomeUsuario: 'dani123', dtNascimento: '2000-01-01', email: 'dani@email.com', senha: '123' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await postAtualizarUsuario(req, res);

    expect(res.json).toHaveBeenCalledWith({ admNome: global.admNome, usuario: { id_usuario: 1, nome: 'Daniela', nick: 'dani123', dt_nasc: '2000-01-01', email: 'dani@email.com', senha: '123' }, mensagem: 'Erro ao atualizar usuário.', sucesso: false });
  });
});
//--------------------------------------------------------------------------------

describe('Teste do excluirUsuario', () => {
  it('deve excluir o usuário com sucesso', async () => {
    mockAdminExcluirUsuario.mockResolvedValue();
    mockListarUsuarios.mockResolvedValue([{ id_usuario: 1, nome: 'Daniela' }]);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await excluirUsuario(req, res);

    expect(mockAdminExcluirUsuario).toHaveBeenCalledWith(1);
    expect(mockListarUsuarios).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ admNome: global.admNome, usuarios: [{ id_usuario: 1, nome: 'Daniela' }], mensagem: 'Usuario excluido com sucesso.', sucesso: true });
  });

  it('deve retornar erro ao lançar exceção', async () => {
    mockAdminExcluirUsuario.mockRejectedValue(new Error('Erro ao excluir'));
    mockListarUsuarios.mockResolvedValue([]);

    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await excluirUsuario(req, res);
    expect(res.json).toHaveBeenCalledWith({ admNome: global.admNome, usuarios: [], mensagem: 'Erro ao excluir', sucesso: false });
  });
});
//--------------------------------------------------------------------------
describe('Teste do getPreferencias (erro)', () => {
  it('deve retornar erro se ocorrer exceção ao buscar preferências', async () => {
    mockListarUsuarios.mockRejectedValue(new Error('Erro preferências'));
    const req = { params: { id: 1 } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await getPreferencias(req, res);

    expect(res.json).toHaveBeenCalledWith({
      admNome: global.admNome,
      usuarios: [],
      preferencias: [],
      mensagem: 'Erro ao carregar preferências.',
      sucesso: false
    });
  });
});
//------------------------------------------------------------------------------
describe('Testes do controlador de preferências', () => {
  it('getNovaPreferencia - deve retornar erro ao buscar categorias', async () => {
    mockBuscarCategorias.mockRejectedValue(new Error('Erro categorias'));
    const req = { params: { id: 1 } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getNovaPreferencia(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ mensagem: 'Erro ao carregar categorias.', sucesso: false });
  });

  it('postNovaPreferencia - deve retornar erro ao salvar preferências', async () => {
    mockCategoriaEscolhida.mockRejectedValue(new Error('Falha ao salvar pref'));
    const req = { params: { id: 1 }, body: { categorias: [1, 2] } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await postNovaPreferencia(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao salvar preferências.', detalhes: 'Falha ao salvar pref' });
  });

  it('excluirPreferencia - deve retornar erro ao excluir preferência', async () => {
    mockDeletarPreferencia.mockRejectedValue(new Error('Erro ao deletar pref'));
    mockListarUsuarios.mockResolvedValue([]);
    const req = { params: { id_usuario: 1, id_categoria: 1 } };
    const res = { json: jest.fn() };

    await excluirPreferencia(req, res);

    expect(res.json).toHaveBeenCalledWith({
      admNome: global.admNome,
      usuarios: [],
      preferencias: [],
      mensagem: 'Erro ao excluir preferencia.',
      sucesso: false
    });
  });
});



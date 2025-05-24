import { expect, jest } from '@jest/globals';

// criando os mocks
  const mockBuscarCategorias = jest.fn();
  const mockCategoriaEscolhida = jest.fn();
  const mockBuscarUsuCategPref = jest.fn();
  const mockAutenticarUsuario = jest.fn();
  const mockBuscarUsuario = jest.fn();
  const mockBuscarJogos = jest.fn();
  const mockCriarUsuario = jest.fn();

  jest.unstable_mockModule('../src/models/usuarioModel.js', () => ({
    buscarCategorias: mockBuscarCategorias,
    categoriaEscolhida: mockCategoriaEscolhida,
    buscarUsu_categ_pref: mockBuscarUsuCategPref,
    autenticarUsuario: mockAutenticarUsuario,
    buscarUsuario: mockBuscarUsuario,
    buscarJogos: mockBuscarJogos,
    criarUsuario: mockCriarUsuario
  }));

  //Importar o controller depois do mock
  const { cadastroUsuario } = await import('../src/controllers/usuarioController.js');
  const { loginUsuario } = await import('../src/controllers/usuarioController.js');
  const { salvarCategorias} = await import ('../src/controllers/usuarioController.js');
  const { getCategorias } = await import ('../src/controllers/usuarioController.js');
  const { getUsu_categ_pref } = await import ('../src/controllers/usuarioController.js');
  const { getUsuario } = await import ('../src/controllers/usuarioController.js');
  const { getJogos} = await import ('../src/controllers/usuarioController.js');


// teste pra cadastrar usuario
  describe('Teste do cadastroUsuario', () => {
    it('deve chamar criarUsuario com os dados certos', async () => {
      mockCriarUsuario.mockResolvedValue({ id: 1, nome: 'Daniela' });

      const req ={body:{ nome: 'Daniela',nomeUsuario: 'dani123',dtNascimento: '2004-05-06',email: 'dani@email.com',senha: '123'}};
      const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

      await cadastroUsuario(req, res);
      expect(mockCriarUsuario).toHaveBeenCalledWith('Daniela', 'dani123', '2004-05-06', 'dani@email.com', '123');
     
    });
  });

  //teste para salvar as categorias preferidas do usuario
  describe ('Teste salvar-categorias', () =>{
  it('deve salvar as categorias com sucesso', async () => {
    mockCategoriaEscolhida.mockResolvedValue({id: 1, categorias:[1,2,3]});

    const req ={ body: {id_usuario: 1, categorias: [1,2,3]}};
    const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

  await salvarCategorias(req, res);

  expect(mockCategoriaEscolhida).toHaveBeenCalledWith(1, [1,2,3]);

  })
})

// teste pra logar usuario
 describe('Teste de Login', () => {
  it('deve logar com sucesso', async () => {
  mockAutenticarUsuario.mockResolvedValue({ id: 1, nome: 'Daniela' });

  const req = { body: {email: 'dani@email.com', senha: '123'}};
  const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

  await loginUsuario(req, res);

  expect(mockAutenticarUsuario).toHaveBeenCalledWith('dani@email.com', '123');
  expect(res.json).toHaveBeenCalledWith({mensagem: "Login bem-sucedido", usuario: { id: 1, nome: "Daniela" }});
});
  });

//--------------------------------
describe('Teste getCategorias', () => {
  it('deve retornar categorias com sucesso', async () => {
    mockBuscarCategorias.mockResolvedValue([{ idCat: 1, nome: 'Ação' }, { idCat: 2, nome: 'Aventura' }]);

    const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};
    const next = jest.fn();
    const req = {};

    await getCategorias(req, res, next);

    expect(mockBuscarCategorias).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([{ idCat: 1, nome: 'Ação' }, { idCat: 2, nome: 'Aventura' }]);
  });
});

//---------------------------------
describe ('Teste getUsu_categ_pref', () => {
  it('deve retornar o usuario e as categorias favoritas', async () =>{
    mockBuscarUsuCategPref.mockResolvedValue([{ id_usu: 1, idCat: 1}, { id_usu: 1, idCat: 2}, { id_usu: 2, idCat: 2}]);

    const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};
    const next = jest.fn();
    const req = {};

    await getUsu_categ_pref(req, res, next);

    expect(mockBuscarUsuCategPref).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith([{ id_usu: 1, idCat: 1}, { id_usu: 1, idCat: 2}, { id_usu: 2, idCat: 2}]);

  })
});

//------------------------------------------
describe ('Teste getUsuario', () => {
  it('deve retornar o usuario com sucesso', async () => {
   mockBuscarUsuario.mockResolvedValue([{id: 1, nome: 'daniela'}]);

    const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};
    const next = jest.fn();
    const req = { params: { id: 1 } };

    await getUsuario(req, res, next);

    expect(mockBuscarUsuario).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith([{id: 1, nome: 'daniela'}]);
  })
});

//------------------------------------------------
describe ('Teste getJogos', () => {
  it('deve retornar os jogos com sucesso', async () => {
    mockBuscarJogos.mockResolvedValue([{id: 1, nomeJogo: 'Minecraft'}, {id: 2, nomeJogo: 'it takes two'}]);

    const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};
    const next = jest.fn();
    const req = {};

    await getJogos(req, res, next);

    expect(mockBuscarJogos).toHaveBeenCalled();
    expect(res.json).toBeCalledWith([{id: 1, nomeJogo: 'Minecraft'}, {id: 2, nomeJogo: 'it takes two'}]);
    
  });
});

// testes de erro-------------------------------------------

describe('Teste de erro no cadastroUsuario', () => {
  it('deve retornar erro 500 ao lançar exceção', async () => {
    mockCriarUsuario.mockRejectedValue(new Error('Falha no banco'));

    const req = { body: { nome: 'Daniela', nomeUsuario: 'dani123', dtNascimento: '2004-05-06', email: 'dani@gmail.com', senha: '123' }};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await cadastroUsuario(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao fazer cadastro' });
  });
});

//----------------------------------------
it('deve retornar 401 se não conseguir cadastrar usuário', async () => {
  mockCriarUsuario.mockResolvedValue(null);

  const req = { body: { nome: 'Daniela', nomeUsuario: 'dani123', dtNascimento: '2004-05-06', email: 'dani@gmail.com', senha: '123' }};
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  await cadastroUsuario(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao cadastrar usuario' });
});

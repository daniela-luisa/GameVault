import { expect, jest } from '@jest/globals';

// criando os mocks
  const mockBuscarCategorias = jest.fn();
  const mockCategoriaEscolhida = jest.fn();
  const mockBuscarUsuCategPref = jest.fn();
  const mockAutenticarUsuario = jest.fn();
  const mockBuscarUsuario = jest.fn();
  const mockBuscarJogos = jest.fn();
  const mockCriarUsuario = jest.fn();
  const mockInserirFoto = jest.fn();

  jest.unstable_mockModule('../src/models/usuarioModel.js', () => ({
    buscarCategorias: mockBuscarCategorias,
    categoriaEscolhida: mockCategoriaEscolhida,
    buscarUsu_categ_pref: mockBuscarUsuCategPref,
    autenticarUsuario: mockAutenticarUsuario,
    buscarUsuario: mockBuscarUsuario,
    buscarJogos: mockBuscarJogos,
    criarUsuario: mockCriarUsuario,
    inserirFoto: mockInserirFoto
  }));

  //Importar o controller depois do mock
  const { cadastroUsuario } = await import('../src/controllers/usuarioController.js');
  const { loginUsuario } = await import('../src/controllers/usuarioController.js');
  const { salvarCategorias} = await import ('../src/controllers/usuarioController.js');
  const { getCategorias } = await import ('../src/controllers/usuarioController.js');
  const { getUsu_categ_pref } = await import ('../src/controllers/usuarioController.js');
  const { getUsuario } = await import ('../src/controllers/usuarioController.js');
  const { getJogos} = await import ('../src/controllers/usuarioController.js');
  const { uploadPerfil} = await import ('../src/controllers/usuarioController.js');

  beforeEach(() => {
  jest.clearAllMocks();  // Limpa os mocks antes de cada teste
});

// teste pra cadastrar usuario
  describe('Teste do cadastroUsuario', () => {
    it('deve chamar criarUsuario com os dados certos', async () => {
      mockCriarUsuario.mockResolvedValue({ id: 1, nome: 'Daniela' });

      const req ={body:{ nome: 'Daniela',nomeUsuario: 'dani123',dtNascimento: '2004-05-06',email: 'dani@email.com',senha: '123'}};
      const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

    //   console.log("Requisição:", req.body); 

      await cadastroUsuario(req, res);
  //    console.log('mockCriarUsuario foi chamado com:', mockCriarUsuario.mock.calls[0]);

      expect(mockCriarUsuario).toHaveBeenCalledWith('Daniela', 'dani123', '2004-05-06', 'dani@email.com', '123');
     
    });
    it('deve retornar 401 se não conseguir cadastrar usuário', async () => {
  mockCriarUsuario.mockResolvedValue(null);

  const req = { body: { nome: 'Daniela', nomeUsuario: 'dani123', dtNascimento: '2004-05-06', email: 'dani@gmail.com', senha: '123' }};
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  //console.log("Requisição:", req.body);

  await cadastroUsuario(req, res);

  // console.log('mockCriarUsuario retornou:', await mockCriarUsuario.mock.results[0].value);
  // console.log( res.status.mock.calls[0][0], res.json.mock.calls[0][0]);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao cadastrar usuario' });
});
     it('deve retornar erro 500 ao lançar exceção', async () => {
    mockCriarUsuario.mockRejectedValue(new Error('Falha no banco'));

    const req = { body: { nome: 'Daniela', nomeUsuario: 'dani123', dtNascimento: '2004-05-06', email: 'dani@gmail.com', senha: '123' }};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await cadastroUsuario(req, res);

 // console.log('Status:', res.status.mock.calls[0][0]);
 // console.log('JSON:', res.json.mock.calls[0][0]);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao fazer cadastro' });
  });
  });

  //teste para salvar as categorias preferidas do usuario
  describe ('Teste salvar-categorias', () =>{
  it('deve salvar as categorias com sucesso', async () => {
    mockCategoriaEscolhida.mockResolvedValue({id: 1, categorias:[1,2,3]});

    const req ={ body: {id_usuario: 1, categorias: [1,2,3]}};
    const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

  await salvarCategorias(req, res);
 // console.log('mockCategoriaEscolhida retornou:', await mockCategoriaEscolhida.mock.results[0].value);
 // console.log('res.JSON:', res.json.mock.calls[0][0]);

  expect(mockCategoriaEscolhida).toHaveBeenCalledWith(1, [1,2,3]);
  expect(res.json).toHaveBeenCalledWith({ mensagem: 'Categorias salvas com sucesso!' });
  })
     it('deve retornar erro 500 ao lançar exceção', async () => {
    mockCategoriaEscolhida.mockRejectedValue(new Error('Falha no banco'));

    const req ={ body: {id_usuario: 1, categorias: [1,2,3]}};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await salvarCategorias(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Erro ao salvar categorias', detalhes: 'Falha no banco' });
  });
})

// teste pra logar usuario
 describe('Teste de Login', () => {
  it('deve logar com sucesso', async () => {
  mockAutenticarUsuario.mockResolvedValue({ id: 1, nome: 'Daniela' });

  const req = { body: {email: 'dani@gmail.com', senha: '123'}};
  const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

  await loginUsuario(req, res);

   // console.log('JSON', res.json.mock.calls[0][0]);

  expect(mockAutenticarUsuario).toHaveBeenCalledWith('dani@gmail.com', '123');
  expect(res.json).toHaveBeenCalledWith({mensagem: "Login bem-sucedido", usuario: { id: 1, nome: "Daniela" }});
});
 it('deve retornar 401 se não conseguir logar usuário', async () => {
  mockAutenticarUsuario.mockResolvedValue(null);

  const req = { body: {email: 'dani@gmail.com', senha: '123'}};
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  await loginUsuario(req, res);

  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ erro: 'Email ou senha inválidos' });
});
   it('deve retornar erro 500 ao lançar exceção', async () => {
  mockAutenticarUsuario.mockRejectedValue(new Error('Falha no banco'));

  const req = { body: {email: 'dani@gmail.com', senha: '123'}};
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  await loginUsuario(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({ erro:  'Erro ao fazer login'});
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
  //  console.log('res.json:', res.json.mock.calls[0][0]);

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
   // console.log('res.json:', res.json.mock.calls[0][0]);

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
   // console.log('res.json:', res.json.mock.calls[0][0]);

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
   // console.log('res.json:', res.json.mock.calls[0][0]);

    expect(mockBuscarJogos).toHaveBeenCalled();
    expect(res.json).toBeCalledWith([{id: 1, nomeJogo: 'Minecraft'}, {id: 2, nomeJogo: 'it takes two'}]);
    
  });
});

//------------------------------------------------
describe('Teste do uploadPerfil', () => {
  it('deve salvar a foto de perfil com sucesso', async () => {
    const req = {params: { id: 1 },file: { filename: 'foto_perfil.png' }};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    await uploadPerfil(req, res, next);

    expect(mockInserirFoto).toHaveBeenCalledWith(1, 'foto_perfil.png');
    expect(res.json).toHaveBeenCalledWith({ foto: 'foto_perfil.png' });
  });

  it('deve retornar erro 400 se nenhum arquivo for enviado', async () => {
    const req = {params: { id: 1 }, file: null};
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    const next = jest.fn();

    await uploadPerfil(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ erro: 'Arquivo não enviado' });
    expect(mockInserirFoto).not.toHaveBeenCalled();
  });
});


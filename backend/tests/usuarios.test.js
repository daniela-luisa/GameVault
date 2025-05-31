
  // 1. Crie os mocks das funções
import { jest } from '@jest/globals';


  const mockBuscarCategorias = jest.fn();
  const mockListarUsuarios = jest.fn();
  const mockCategoriaEscolhida = jest.fn();
  const mockBuscarUsuCategPref = jest.fn();
  const mockAutenticarUsuario = jest.fn();
  const mockBuscarUsuario = jest.fn();
  const mockBuscarJogos = jest.fn();
  const mockCriarUsuario = jest.fn();

  // 2. Faça o mock completo do módulo
  jest.unstable_mockModule('../src/models/usuarioModel.js', () => ({
    buscarCategorias: mockBuscarCategorias,
    listarUsuarios: mockListarUsuarios,
    categoriaEscolhida: mockCategoriaEscolhida,
    buscarUsu_categ_pref: mockBuscarUsuCategPref,
    autenticarUsuario: mockAutenticarUsuario,
    buscarUsuario: mockBuscarUsuario,
    buscarJogos: mockBuscarJogos,
    criarUsuario: mockCriarUsuario,
  }));

  // Importar o controller depois do mock
  const { cadastroUsuario } = await import('../src/controllers/usuarioController.js');
  const { loginUsuario } = await import('../src/controllers/usuarioController.js');


  describe('Simulando cadastroUsuario (sem banco)', () => {
    it('deve chamar criarUsuario com os dados certos e responder com sucesso', async () => {
      mockCriarUsuario.mockResolvedValue({ id: 1, nome: 'Maria' });

      const req = {
        body: {
          nome: 'Maria',
          nomeUsuario: 'maria123',
          dtNascimento: '2000-01-01',
          email: 'maria@email.com',
          senha: '123456',
        },
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await cadastroUsuario(req, res);

      expect(mockCriarUsuario).toHaveBeenCalledWith(
        'Maria',
        'maria123',
        '2000-01-01',
        'maria@email.com',
        '123456'
      );

      expect(res.json).toHaveBeenCalledWith({
        mensagem: 'Cadastro bem-sucedido',
        novoUsuario: { id: 1, nome: 'Maria' },
      });
    });
  });



  it('deve logar com sucesso', async () => {
  mockAutenticarUsuario.mockResolvedValue({ id: 1, nome: 'Maria' });

  const req = {
    body: {
      email: 'maria@email.com',
      senha: '123456'
    }
  };

  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  };

  await loginUsuario(req, res);

  expect(mockAutenticarUsuario).toHaveBeenCalledWith('maria@email.com', '123456');
  expect(res.json).toHaveBeenCalledWith({
  mensagem: "Login bem-sucedido",
  usuario: { id: 1, nome: "Maria" }
});

});


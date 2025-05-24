import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/config/db.js', () => ({
  conectar: jest.fn(() => Promise.resolve({
    query: jest.fn(() => Promise.resolve([[{ id: 1, nome: 'Usuário Teste' }], []]))
  })),
}));

const db = await import('../src/config/db.js');

describe('Testando usuModel', () => {
  it('Deve conectar e fazer consulta mockada', async () => {
    const conexao = await db.conectar();
    const resultado = await conexao.query('SELECT * FROM usuario');

    expect(db.conectar).toHaveBeenCalled();
    expect(resultado[0]).toEqual([{ id: 1, nome: 'Usuário Teste' }]);
  });
});

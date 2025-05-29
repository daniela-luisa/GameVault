import { describe, jest } from '@jest/globals';

jest.unstable_mockModule('../src/config/db.js', () => ({
  conectar: jest.fn(() => Promise.resolve({
    query: jest.fn()
      .mockResolvedValueOnce([[{ id_usuario: 1, email: 'dani@gmail.com' }], []])  
      .mockResolvedValueOnce([[{ id_categoria: 1 }], []])                         
  }))
}));

const { autenticarUsuario } = await import('../src/models/usuarioModel.js');
const { criarUsuario } = await import('../src/models/usuarioModel.js');


const db = await import('../src/config/db.js');

describe('Teste autenticarUsuario', () => {
  it('deve retornar dados do usuário e cadastro2Completo true', async () => {
    const resultado = await autenticarUsuario('dani@gmail.com', '123');

    expect(db.conectar).toHaveBeenCalled();
    expect(resultado).toEqual({id: 1, email: 'dani@gmail.com', cadastro2Completo: true});
  });

  it('deve retornar cadastro2Completo false se não tiver categorias', async () => {
    // Ajustando o mock para este teste
    db.conectar.mockImplementation(() => Promise.resolve({
      query: jest.fn()
        .mockResolvedValueOnce([[{ id_usuario: 2, email: 'dani@gmail.com' }], []])  // 1ª consulta
        .mockResolvedValueOnce([[], []])                                               // 2ª consulta: sem categorias
    }));

    const resultado = await autenticarUsuario('dani@gmail.com', '456');

    expect(resultado).toEqual({id: 2, email: 'dani@gmail.com', cadastro2Completo: false });
  });
});

//--------------------------------------------------------
// describe('Teste criarUsuario', () => {
//   it('deve criar um usuário e retornar o resultado da inserção', async () => {
//   beforeEach(() => {
//     db.conectar.mockImplementation(() => Promise.resolve({
//       query: jest.fn().mockResolvedValueOnce([{ insertId: 1 }, undefined])
//     }));
//   });

//     const resultado = await criarUsuario('Daniela', 'daniela123', '2004-05-06', 'daniela@gmail.com', '123');

//     expect(db.conectar).toHaveBeenCalled();
//     expect(resultado).toEqual({ insertId: 1 });  // conforme o mock da query
//   });
// });
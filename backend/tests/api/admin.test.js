import request from 'supertest';
import app from '../../src/app.js'; // ajuste conforme seu caminho

describe('GET /admin/usuarios', () => {
  it('Deve retornar um objeto com lista de usuários', async () => {
    const res = await request(app).get('/admin/usuarios');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('usuarios');
    expect(Array.isArray(res.body.usuarios)).toBe(true); // agora sim
  });
});

describe('GET /admin/atualizar-categoria/:id', () => {
  it('Deve retornar os dados da categoria para edição', async () => {
    const categoriaId = 2; // substitua por um ID válido existente no seu banco

    const res = await request(app).get(`/admin/atualizar-categoria/${categoriaId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('categoria'); // ajuste conforme a resposta real
  });
});


describe('POST /admin/nova-categoria', () => {
  it('Deve criar uma nova categoria e retornar status 200 ou 201', async () => {
    const novaCategoria = {
      nome: 'Estratégia'
    };

    const res = await request(app)
      .post('/admin/nova-categoria')
      .send(novaCategoria);

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('mensagem'); // ajuste conforme o retorno do controller
  });
});



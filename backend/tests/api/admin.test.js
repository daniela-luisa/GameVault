import request from 'supertest';
import app from '../../src/app.js'; 
//------------------------------------------------------------------------------------------

describe('GET /admin/usuarios', () => {
  it('Deve retornar um objeto com lista de usuários', async () => {
    const res = await request(app).get('/admin/usuarios');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('usuarios');
    expect(Array.isArray(res.body.usuarios)).toBe(true); // agora sim
  });
});
//------------------------------------------------------------------------------------------

describe('GET /admin/atualizar-categoria/:id', () => {
  it('Deve retornar os dados da categoria para edição', async () => {
    const categoriaId = 2; // substitua por um ID válido existente no seu banco

    const res = await request(app).get(`/admin/atualizar-categoria/${categoriaId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('categoria'); // ajuste conforme a resposta real
  });
});
//------------------------------------------------------------------------------------------

describe('GET /admin/nova-categoria', () => {
  beforeAll(() => {
    global.admNome = 'Admin Teste'; // mocka o valor global necessário
  });

  it('Deve retornar os dados iniciais para o formulário de nova categoria', async () => {
    const res = await request(app).get('/admin/nova-categoria');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('admNome');
    expect(res.body).toHaveProperty('mensagem', null);
    expect(res.body).toHaveProperty('sucesso', false);
  });
});
//------------------------------------------------------------------------------------------

describe('POST /admin/nova-categoria', () => {
  it('Deve criar uma nova categoria e retornar status 200 ou 201', async () => {
    const novaCategoria = {nome: 'Estratégia'};

    const res = await request(app)
      .post('/admin/nova-categoria')
      .send(novaCategoria);

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('mensagem');
  });
});
//------------------------------------------------------------------------------------------

describe('GET /admin/categorias', () => {
  beforeAll(() => {
    global.admNome = 'Admin Teste';
  });

  it('Deve retornar uma lista de categorias com sucesso', async () => {
    const res = await request(app).get('/admin/categorias');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('admNome', 'Admin Teste');
    expect(res.body).toHaveProperty('categorias');
    expect(Array.isArray(res.body.categorias)).toBe(true);
    expect(res.body).toHaveProperty('mensagem');
    expect(res.body).toHaveProperty('sucesso', false);
  });
});
//------------------------------------------------------------------------------------------

describe('POST /admin/atualizar-categoria/:id', () => {
  beforeAll(() => {
    global.admNome = 'Admin Teste';
  });

  it('Deve atualizar a categoria com sucesso', async () => {
    // Cria uma categoria temporária primeiro
    const resNova = await request(app)
      .post('/admin/nova-categoria')
      .send({ nome: 'Categoria Atualizável' });

    const id = resNova.body.id || 999; // Ajuste conforme sua resposta real

    const res = await request(app)
      .post(`/admin/atualizar-categoria/${id}`)
      .send({ nome: 'Categoria Atualizado' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Categoria atualizada com sucesso.');
    expect(res.body).toHaveProperty('sucesso', true);
    expect(res.body.categoria.nome).toBe('Categoria Atualizado');
  });
});
//------------------------------------------------------------------------------------------
describe('GET /admin/novo-usuario', () => {
  it('Deve retornar os dados iniciais para o formulário de novo usuário', async () => {
    const res = await request(app).get('/admin/novo-usuario');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('admNome');
    expect(res.body).toHaveProperty('mensagem', null);
    expect(res.body).toHaveProperty('sucesso', false);
  });
});
//------------------------------------------------------------------------------------------
describe('POST /admin/novo-usuario', () => {
  it('Deve cadastrar um novo usuário com sucesso', async () => {
    const novoUsuario = {
      nome: 'Usuário de Teste',
      nomeUsuario: `usuarioteste`,
      dtNascimento: '2000-01-01',
      email: `teste_@gmail.com`,
      senha: '123',
    };

    const res = await request(app)
      .post('/admin/novo-usuario')
      .send(novoUsuario);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Usuário cadastrado com sucesso!');
    expect(res.body).toHaveProperty('sucesso', true);
  });
});
//------------------------------------------------------------------------------------------
describe('GET /admin/atualizar-usuario/:id', () => {
  it('Deve retornar os dados do usuário para edição', async () => {
    const usuarioId = 1; // ajuste para um ID existente no banco

    const res = await request(app).get(`/admin/atualizar-usuario/${usuarioId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('usuario');
    expect(res.body).toHaveProperty('mensagem', null);
    expect(res.body).toHaveProperty('sucesso', false);
  });
});
//------------------------------------------------------------------------------------------

describe('GET /admin/preferencias/:id', () => {
  it('Deve retornar as preferências do usuário com sucesso', async () => {
    const idUsuario = 9; // Substitua por um ID válido no seu banco

    const res = await request(app).get(`/admin/preferencias/${idUsuario}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('usuarios');
    expect(Array.isArray(res.body.usuarios)).toBe(true);

    expect(res.body).toHaveProperty('preferencias');
    expect(Array.isArray(res.body.preferencias)).toBe(true);

    expect(res.body).toHaveProperty('selectedUsuario', idUsuario);
    expect(res.body).toHaveProperty('mensagem', null);
    expect(res.body).toHaveProperty('sucesso', true);
  });

  it('Deve retornar erro ao buscar preferências de um ID inválido', async () => {
    const idUsuarioInvalido = 999999; // Um ID que provavelmente não existe

    const res = await request(app).get(`/admin/preferencias/${idUsuarioInvalido}`);

    // Esperado: ainda retorna status 200, mas sucesso: false
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('sucesso', false);
    expect(res.body).toHaveProperty('mensagem', 'Erro ao carregar preferências.');
  });
});
//------------------------------------------------------------------------------------------











// describe('GET /admin/excluir-categoria/:id', () => {
//   let categoriaTesteId;
//   // Cria uma categoria temporária antes do teste
//   beforeAll(async () => {
//     const res = await request(app)
//       .post('/admin/nova-categoria')
//       .send({ nome: 'Categoria Temporária p/ Exclusão' });
//     // Supondo que o ID venha no corpo da resposta (ajuste se necessário)
//     categoriaTesteId = res.body.id || 999; // ou extraia corretamente do banco
//   });
//   it('Deve excluir a categoria com sucesso', async () => {
//     const res = await request(app).get(`/admin/excluir-categoria/${categoriaTesteId}`);
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('mensagem', 'Categoria excluida com sucesso.');
//     expect(res.body).toHaveProperty('sucesso', true);
//   });
// });




import request from 'supertest';
import app from '../../src/app.js';

// teste aprovado porem precisa deletar no banco pra testar de nv
describe('Integração: Cadastro e leitura de usuário', () => {
  let idUsuarioCriado = null;

  it('Deve criar um novo usuário com sucesso', async () => {     //deletar no banco esse usuario
    const novoUsuario = {nome: 'Usuário Integração', nomeUsuario: 'user_integ_',dtNascimento: '2000-01-01',email: `userinteg@teste.com`,senha: '123'
    };

    const res = await request(app)
      .post('/admin/novo-usuario')
      .send(novoUsuario);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('sucesso', true);
    expect(res.body).toHaveProperty('mensagem', 'Usuário cadastrado com sucesso!');

    // Agora buscar o ID gerado
    const usuarios = await request(app).get('/admin/usuarios');
    const criado = usuarios.body.usuarios.find(u => u.email === novoUsuario.email);

    expect(criado).toBeDefined();
    idUsuarioCriado = criado.id_usuario;
  });

  it('Deve recuperar os dados do usuário criado', async () => {
    const res = await request(app).get(`/admin/atualizar-usuario/${idUsuarioCriado}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('usuario');
    expect(res.body.usuario).toHaveProperty('id_usuario', idUsuarioCriado);
    expect(res.body).toHaveProperty('sucesso', false); // igual ao controller real
  });
});
//----------------------------------------------------------------------------------------------
// precisa tbm deletar as coisas na tabela de categoria pra testar de novo
describe('Integração completa: CRUD de categoria', () => {
  let idCategoria;

  it('Deve criar uma nova categoria', async () => {
    const res = await request(app)
      .post('/admin/nova-categoria')
      .send({ nome: 'Categoria Integração' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Categoria cadastrada com sucesso.');
    expect(res.body).toHaveProperty('sucesso', true);

    // Buscando o ID real no banco
    const lista = await request(app).get('/admin/categorias');
    const categoriaCriada = lista.body.categorias.find(cat => cat.nome === 'Categoria Integração');
    expect(categoriaCriada).toBeDefined();
    idCategoria = categoriaCriada.id_catego;
  });

  it('Deve atualizar o nome da categoria', async () => {
    const res = await request(app)
      .post(`/admin/atualizar-categoria/${idCategoria}`)
      .send({ nome: 'Categoria integ Atualizada' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Categoria atualizada com sucesso.');
    expect(res.body).toHaveProperty('sucesso', true);
  });

  it('Deve confirmar que a categoria atualizada está listada', async () => {
    const res = await request(app).get('/admin/categorias');
    const categoria = res.body.categorias.find(cat => cat.id_catego === idCategoria);
    expect(categoria).toBeDefined();
    expect(categoria.nome).toBe('Categoria integ Atualizada');
  });

});


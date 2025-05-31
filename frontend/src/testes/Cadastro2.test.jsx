import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Cadastro2 from '../Pages/Cadastro2';
import { BrowserRouter } from 'react-router-dom';

// Mock do fetch
beforeEach(() => {
  global.fetch = jest.fn();
  localStorage.setItem('id_usuario', '123'); // mockando localStorage
});

// Cleanup depois de cada teste
afterEach(() => {
  jest.resetAllMocks();
});

// Função de render com router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('carrega e exibe as categorias', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id_catego: 1, nome: 'Ação' },
      { id_catego: 2, nome: 'Aventura' }
    ]
  });

  renderWithRouter(<Cadastro2 />);

  // Espera os botões aparecerem
  expect(await screen.findByText('Ação')).toBeInTheDocument();
  expect(await screen.findByText('Aventura')).toBeInTheDocument();
});

test('seleciona e desseleciona categorias ao clicar', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [
      { id_catego: 1, nome: 'Ação' }
    ]
  });

  renderWithRouter(<Cadastro2 />);
  const botao = await screen.findByText('Ação');

  // Ao clicar, muda a classe para selecionado (bg-green-500)
  fireEvent.click(botao);
  expect(botao.className).toContain('bg-green-500');

  // Ao clicar novamente, deseleciona (bg-gray-800)
  fireEvent.click(botao);
  expect(botao.className).toContain('bg-gray-800');
});

test('envia categorias corretamente e redireciona ao clicar em CONTINUAR', async () => {
  // Mock da resposta da API de categorias
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id_catego: 1, nome: 'RPG' }
      ]
    })
    .mockResolvedValueOnce({
      ok: true
    });

  renderWithRouter(<Cadastro2 />);
  const botaoCategoria = await screen.findByText('RPG');
  const botaoContinuar = screen.getByText('CONTINUAR');

  // Seleciona categoria
  fireEvent.click(botaoCategoria);

  // Simula clique no botão de continuar
  fireEvent.click(botaoContinuar);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/salvar-categorias',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_usuario: '123',
          categorias: [1]
        })
      })
    );
  });

  // Verifica se alert foi chamado
  // (alert é necessário mockar)
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  await waitFor(() => expect(alertMock).toHaveBeenCalledWith('Categorias salvas com sucesso!'));
  alertMock.mockRestore();
});

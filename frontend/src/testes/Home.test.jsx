import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../Pages/Home';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  global.fetch = jest.fn();
  localStorage.setItem('id_usuario', '999');
});

afterEach(() => {
  jest.resetAllMocks();
});

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('exibe jogos e categorias após carregamento', async () => {
  // Mock das duas chamadas: jogos e categorias
  fetch
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id_jogo: 1, nome: 'The Witcher', descricao: 'RPG de ação', dt_lanca: '2015-05-19' }
      ]
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id_categoria: 10, nome: 'Aventura' }
      ]
    });

  renderWithRouter(<Home />);

  // Espera os jogos aparecerem
  expect(await screen.findByText('The Witcher')).toBeInTheDocument();
  expect(screen.getByText('RPG de ação')).toBeInTheDocument();
  expect(screen.getByText('2015-05-19')).toBeInTheDocument();

  // Espera categorias aparecerem
  expect(await screen.findByText('Aventura')).toBeInTheDocument();
});

test('exibe links de navegação com id do usuário', () => {
  fetch.mockResolvedValue({
    ok: true,
    json: async () => []
  });

  renderWithRouter(<Home />);

  expect(screen.getByText('Início').closest('a')).toHaveAttribute('href', '/home');
  expect(screen.getByText('Favoritos').closest('a')).toHaveAttribute('href', '/favoritos');
  expect(screen.getByText('Perfil').closest('a')).toHaveAttribute('href', '/perfil/999');
});

test('trata erro ao buscar jogos', async () => {
  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

  // Força erro ao buscar jogos
  fetch
    .mockRejectedValueOnce(new Error('Erro de rede'))
    .mockResolvedValueOnce({ ok: true, json: async () => [] });

  renderWithRouter(<Home />);

  await waitFor(() => {
    expect(consoleErrorMock).toHaveBeenCalledWith('Erro ao buscar jogos:', expect.any(Error));
  });

  consoleErrorMock.mockRestore();
});

test('trata erro ao buscar categorias', async () => {
  const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

  // Força erro ao buscar categorias
  fetch
    .mockResolvedValueOnce({ ok: true, json: async () => [] })
    .mockRejectedValueOnce(new Error('Erro ao carregar categorias'));

  renderWithRouter(<Home />);

  await waitFor(() => {
    expect(consoleErrorMock).toHaveBeenCalledWith('Erro ao buscar categorias:', expect.any(Error));
  });

  consoleErrorMock.mockRestore();
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Perfil from '../Pages/perfil';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

const renderWithRouter = (initialPath = '/perfil/5') => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/perfil/:id" element={<Perfil />} />
      </Routes>
    </MemoryRouter>
  );
};

test('exibe mensagem de carregamento antes dos dados serem carregados', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [{ nome: 'João', nick: 'joaogamer' }],
  });

  renderWithRouter();

  // Deve mostrar "Carregando..." logo de início
  expect(screen.getByText(/carregando/i)).toBeInTheDocument();

  // Aguarda os dados aparecerem
  expect(await screen.findByText(/Perfil de João/)).toBeInTheDocument();
  expect(screen.getByText(/Nome de usuário: joaogamer/)).toBeInTheDocument();
});

test('exibe links de navegação com id correto', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [{ nome: 'Maria', nick: 'maryzin' }],
  });

  renderWithRouter('/perfil/8');

  expect(await screen.findByText('Perfil de Maria')).toBeInTheDocument();

  const links = screen.getAllByRole('link');
  expect(links[0]).toHaveAttribute('href', '/home');
  expect(links[1]).toHaveAttribute('href', '/favoritos');
  expect(links[2]).toHaveAttribute('href', '/perfil/8');
});

test('trata erro ao buscar perfil', async () => {
  const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

  fetch.mockRejectedValueOnce(new Error('Falha na rede'));

  renderWithRouter();

  await waitFor(() => {
    expect(consoleError).toHaveBeenCalledWith('Erro ao buscar perfil:', expect.any(Error));
  });

  consoleError.mockRestore();
});

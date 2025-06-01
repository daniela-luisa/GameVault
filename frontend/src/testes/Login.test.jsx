import React from 'react'; 
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../Pages/Login';
import { BrowserRouter } from 'react-router-dom';

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock do alert
global.alert = jest.fn();

describe('Tela de Login', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // limpa mocks antes de cada teste
  });

  test('preenche campos e envia dados corretos', async () => {
    // mock da resposta do backend
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        usuario: {
          id: '123',
          cadastro2Completo: true,
        }
      }),
    });

    render(<BrowserRouter><Login /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText('Digite seu email'), {
      target: { value: 'teste@email.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByText('CONTINUAR'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ email: 'teste@email.com', senha: '123456' }),
        })
      );
    });

    expect(localStorage.getItem('id_usuario')).toBe('123');
    expect(mockNavigate).toHaveBeenCalledWith('/home');
    expect(alert).toHaveBeenCalledWith('Login feito com sucesso!');
  });

  test('mostra alerta se login falhar', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ erro: 'Credenciais inválidas' }),
    });

    render(<BrowserRouter><Login /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText('Digite seu email'), {
      target: { value: 'errado@email.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('Digite sua senha'), {
      target: { value: 'senhaerrada' },
    });

    fireEvent.click(screen.getByText('CONTINUAR'));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Credenciais inválidas');
    });
  });
});

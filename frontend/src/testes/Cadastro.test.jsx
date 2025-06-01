import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cadastro from '../Pages/Cadastro';
import { BrowserRouter } from 'react-router-dom';

// Mock do useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock do alert
global.alert = jest.fn();

describe('Tela de Cadastro', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('envia dados corretos e redireciona após cadastro bem-sucedido', async () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ mensagem: 'Cadastro bem-sucedido' }),
    });

    render(<BrowserRouter><Cadastro /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText('nome'), {
      target: { value: 'João Silva' },
    });

    fireEvent.change(screen.getByPlaceholderText('usuário'), {
      target: { value: 'joaosilva' },
    });

    fireEvent.change(screen.getByPlaceholderText('data'), {
      target: { value: '2000-01-01' },
    });

    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'joao@email.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('senha'), {
      target: { value: '123456' },
    });

    fireEvent.change(screen.getByPlaceholderText('confirmar senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByText('CONTINUAR'));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/cadastro',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: 'João Silva',
            nomeUsuario: 'joaosilva',
            dtNascimento: '2000-01-01',
            email: 'joao@email.com',
            senha: '123456',
          }),
        })
      );
    });

    expect(alert).toHaveBeenCalledWith('Cadastro feito com sucesso!');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  test('exibe alerta se cadastro falhar', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({ erro: 'Email já cadastrado' }),
    });

    render(<BrowserRouter><Cadastro /></BrowserRouter>);

    fireEvent.change(screen.getByPlaceholderText('nome'), {
      target: { value: 'João Silva' },
    });

    fireEvent.change(screen.getByPlaceholderText('usuário'), {
      target: { value: 'joaosilva' },
    });

    fireEvent.change(screen.getByPlaceholderText('data'), {
      target: { value: '2000-01-01' },
    });

    fireEvent.change(screen.getByPlaceholderText('email'), {
      target: { value: 'joao@email.com' },
    });

    fireEvent.change(screen.getByPlaceholderText('senha'), {
      target: { value: '123456' },
    });

    fireEvent.change(screen.getByPlaceholderText('confirmar senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByText('CONTINUAR'));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith('Email já cadastrado');
    });
  });
});

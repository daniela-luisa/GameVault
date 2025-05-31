// Usuarios.test.jsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Usuarios from '../Pages/Usuario';

// Mock global do fetch
global.fetch = jest.fn();

describe('Componente Usuarios', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('exibe título "Usuários"', () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    render(<Usuarios />);

    expect(screen.getByText('Usuários')).toBeInTheDocument();
  });

  it('exibe lista de usuários após fetch', async () => {
    const mockUsers = [
      { id_usuario: 1, email: 'user1@example.com' },
      { id_usuario: 2, email: 'user2@example.com' },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => mockUsers,
    });

    render(<Usuarios />);

    // Espera até que os usuários sejam renderizados na tela
    await waitFor(() => {
      expect(screen.getByText('user1@example.com')).toBeInTheDocument();
      expect(screen.getByText('user2@example.com')).toBeInTheDocument();
    });
  });
});

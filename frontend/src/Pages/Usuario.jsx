import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001')
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id_usuario}>{u.email}</li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function NovoJogo() {
  const [nomeJogo, setNomeJogo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dtLanca, setDtLanca] = useState('');
  const [capa, setCapa] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();
}
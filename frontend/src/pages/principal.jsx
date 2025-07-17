import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Principal.css';

function Principal() {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [nome, setNome] = useState('');

  useEffect(() => {
    const nick = localStorage.getItem('nickname');
    const nomeCompleto = localStorage.getItem('nome');
    setNickname(nick);
    setNome(nomeCompleto);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('nickname');
    localStorage.removeItem('nome');
    navigate('/');
  };

  return (
    <div className="principal-container">
      <h1>🌟 Página Principal</h1>
      <h2>Bem-vindo, {nickname || nome || 'Jogador'}!</h2>

      <p>🎮 Conteúdo exclusivo em construção...</p>

      <button className="btn-sair" onClick={handleLogout}>
        🚪 Sair
      </button>
    </div>
  );
}

export default Principal;

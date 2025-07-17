import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

import logo from '../assets/logo.png';
import bgMusic from '../assets/background-music.mp3';
import hoverSound from '../assets/hover-sound.wav';
import clickSound from '../assets/click-sound.flac';

function Login() {
  const navigate = useNavigate();
  const musicRef = useRef(null);
  const hoverRef = useRef(new Audio(hoverSound));
  const clickRef = useRef(new Audio(clickSound));
  const [playing, setPlaying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [erro, setErro] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    musicRef.current.volume = 0.3;
    musicRef.current.loop = true;
  }, []);

  const toggleMusic = () => {
    if (playing) {
      musicRef.current.pause();
    } else {
      musicRef.current.play().catch(() => {
        console.warn('Interação do usuário necessária para tocar o áudio');
      });
    }
    setPlaying(!playing);
  };

  const handleHover = () => {
    hoverRef.current.currentTime = 0;
    hoverRef.current.play();
  };

  const handleClick = () => {
    clickRef.current.currentTime = 0;
    clickRef.current.play();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClick();

    const { email, senha } = formData;

    if (!email || !senha) {
      setErro('⚠️ Preencha todos os campos.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        const { usuario } = data;

        // ✅ Salva dados do usuário no localStorage
        localStorage.setItem('usuarioLogado', usuario.email);
        localStorage.setItem('nickname', usuario.nickname);
        localStorage.setItem('nome', usuario.nome);

        setMensagem(data.mensagem || 'Login realizado com sucesso!');
        setErro('');

        setTimeout(() => navigate('/'), 1500);
      } else {
        setErro(data.erro || '❌ Usuário ou senha incorretos.');
        setMensagem('');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErro('🚫 Erro de conexão com o servidor.');
      setMensagem('');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <audio ref={musicRef} src={bgMusic} />
      <div className="login-overlay"></div>
      <div className="login-content">
        <div className="logo-container">
          <img src={logo} alt="Logo NoobLevel01" className="logo-img" />
          <button className="btn-music" onClick={toggleMusic}>
            {playing ? '🔇 Parar música' : '🔊 Tocar música'}
          </button>
        </div>

        <h1>🔐 Login do Jogador</h1>
        <form className="login-form" onMouseEnter={handleHover} onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Senha:
            <div className="senha-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn-eye"
                onClick={() => setShowPassword(!showPassword)}
                title="Mostrar/ocultar senha"
                aria-label="Mostrar ou ocultar senha"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </label>

          {erro && <p className="aviso-senha">{erro}</p>}
          {mensagem && <p className="sucesso-senha">{mensagem}</p>}

          <button type="submit" disabled={carregando}>
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './cadastramento.css';

import logo from '../assets/logo.png';
import bgMusic from '../assets/background-music.mp3';
import hoverSound from '../assets/hover-sound.wav';
import clickSound from '../assets/click-sound.flac';

function Cadastramento() {
  const navigate = useNavigate();
  const musicRef = useRef(null);
  const hoverRef = useRef(new Audio(hoverSound));
  const clickRef = useRef(new Audio(clickSound));
  const [playing, setPlaying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    nickname: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    whatsapp: '',
  });

  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

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

  const formatarTelefone = (valor) => {
    valor = valor.replace(/\D/g, '');
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');
    return valor;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let novoValor = value;

    if (name === 'whatsapp') {
      novoValor = formatarTelefone(value);
    }

    setFormData((prev) => ({ ...prev, [name]: novoValor }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClick();

    const { nome, nickname, email, senha, confirmarSenha, whatsapp } = formData;

    if (!nome || !nickname || !email || !senha) {
      setErro('⚠️ Todos os campos obrigatórios devem ser preenchidos.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('❗ As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, nickname, email, senha, whatsapp }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(data.mensagem);
        setErro('');
        setFormData({
          nome: '',
          nickname: '',
          email: '',
          senha: '',
          confirmarSenha: '',
          whatsapp: '',
        });

        // Redireciona após alguns segundos (opcional):
        setTimeout(() => navigate('/'), 2000);
      } else {
        setErro(data.erro || 'Erro ao cadastrar.');
        setMensagem('');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setErro('Erro de conexão com o servidor.');
      setMensagem('');
    }
  };

  return (
    <div className="cadastro-container">
      <audio ref={musicRef} src={bgMusic} />
      <div className="cadastro-overlay"></div>
      <div className="cadastro-content">
        <div className="logo-container">
          <img src={logo} alt="Logo NoobLevel01" className="logo-img" />
          <button className="btn-music" onClick={toggleMusic}>
            {playing ? '🔇 Parar música' : '🔊 Tocar música'}
          </button>
        </div>

        <h1>📝 Cadastro de Jogador</h1>
        <form className="cadastro-form" onMouseEnter={handleHover} onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              placeholder="Digite seu nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Nickname:
            <input
              type="text"
              name="nickname"
              placeholder="Digite seu apelido"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </label>

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
                pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                title="Mínimo 8 caracteres, com letra, número e símbolo."
              />
              <button
                type="button"
                className="btn-eye"
                onClick={() => setShowPassword(!showPassword)}
                title="Mostrar/ocultar senha"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            <br />
            <div className="regras-senha">
              🔒 A senha deve ter pelo menos 8 caracteres, com letra, número e símbolo.
            </div>
          </label>

          <label>
            Confirmar Senha:
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            WhatsApp:
            <input
              type="text"
              name="whatsapp"
              placeholder="(00) 00000-0000"
              value={formData.whatsapp}
              onChange={handleChange}
            />
          </label>

          {erro && <p className="aviso-senha">{erro}</p>}
          {mensagem && <p className="sucesso-senha">{mensagem}</p>}

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default Cadastramento;

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png';
import bgMusic from '../assets/background-music.mp3';
import hoverSound from '../assets/hover-sound.wav';
import clickSound from '../assets/click-sound.flac';

function Home() {
  const navigate = useNavigate();
  const musicRef = useRef(null);
  const hoverRef = useRef(new Audio(hoverSound));
  const clickRef = useRef(new Audio(clickSound));
  const [playing, setPlaying] = useState(false);

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

  const handleClick = (path) => {
    clickRef.current.currentTime = 0;
    clickRef.current.play();
    setTimeout(() => navigate(path), 150);
  };

  return (
    <div className="Home-bg">
      <audio ref={musicRef} src={bgMusic} />
      <div className="Home-overlay">
        <div className="Home-content">
          <div className="logo-container">
            <img src={logo} alt="Logo NoobLevel01" className="logo-img" />
            <button className="btn-music" onClick={toggleMusic}>
              {playing ? '🔇 Parar música' : '🔊 Tocar música'}
            </button>
          </div>

          <h1 className="Home-title">
            🎮 Bem-vindo ao Mundo <span className="destaque-noob">NoobLevel01!</span>
          </h1>
          <p className="Home-subtitle">Entre para jogar ou cadastre-se para começar sua jornada.</p>

          <div className="Home-buttons">
            <button className="btn-gamer" onMouseEnter={handleHover} onClick={() => handleClick('/login')}>
              🎯 Já tenho cadastro
            </button>
            <button className="btn-gamer" onMouseEnter={handleHover} onClick={() => handleClick('/cadastramento')}>
              📝 Quero me cadastrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

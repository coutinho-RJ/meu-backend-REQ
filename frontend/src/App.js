import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home';
import Principal from './pages/principal';
import Cadastramento from './pages/cadastramento';
import JogosDoNoob from './pages/jogosdonoob';
import LordsMobile from './pages/lordsmobile';
import Pokemon from './pages/pokemon';
import Portfolio from './pages/Portfolio';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute'; // ajuste o caminho se necessário



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={
        <PrivateRoute>
        <Principal />
        </PrivateRoute>
        } />
        <Route path="/cadastramento" element={<Cadastramento />} />
        <Route path="/jogosdonoob" element={<JogosDoNoob />} />
        <Route path="/lordsmobile" element={<LordsMobile />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

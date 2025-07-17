// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const usuarioLogado = localStorage.getItem('usuarioLogado');

  return usuarioLogado ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute;

import React, { useEffect, useState } from 'react';

function App() {
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch('https://meu-backend-req.onrender.com/api/mensagem') // 🔁 Coloque sua URL real aqui
      .then(res => res.json())
      .then(data => setMensagem(data.mensagem))
      .catch(err => console.error('Erro ao buscar a mensagem:', err));
  }, []);

  return (
    <div>
      <h1>Mensagem do Servidor:</h1>
      <p>{mensagem}</p>
    </div>
  );
}

export default App;

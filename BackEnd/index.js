const express = require('express');
const cors = require('cors');
const app = express();

// Configuração CORS para desenvolvimento
app.use(cors({
  origin: 'http://localhost:3000', // Altere para a porta do seu frontend
  credentials: true
}));

app.use(express.json());

// Banco de dados em memória (apenas para teste)
const usuarios = [];

// ✅ Rota de Teste (mantenha para verificar se o backend está online)
app.get('/api/mensagem', (req, res) => {
  console.log('✅ Backend está respondendo!');
  res.json({ mensagem: "Backend operacional!" });
});

// 🔄 Rota de Cadastro Corrigida
app.post('/api/cadastrar', (req, res) => {
  console.log('📥 Dados recebidos:', req.body); // Log para depuração

  try {
    const { nome, nickname, email, senha, whatsapp } = req.body;

    // Validação obrigatória
    if (!nome || !email || !senha) {
      console.log('❌ Campos faltando:', { nome, email, senha });
      return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    // Verifica email duplicado
    if (usuarios.some(u => u.email === email)) {
      console.log('❌ Email já cadastrado:', email);
      return res.status(409).json({ erro: 'Email já cadastrado.' });
    }

    // Simula cadastro
    const novoUsuario = { nome, nickname, email, senha, whatsapp };
    usuarios.push(novoUsuario);
    console.log('✅ Novo usuário:', novoUsuario);

    res.status(201).json({ 
      mensagem: 'Cadastro realizado!',
      usuario: { nome, nickname, email }
    });

  } catch (error) {
    console.error('💥 Erro no servidor:', error);
    res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
});

// 🚀 Inicie o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`\n---\n🚀 Backend rodando em: http://localhost:${PORT}\n---`);
});
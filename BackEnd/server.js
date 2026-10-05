require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve os arquivos do Front-end estaticamente
app.use(express.static(path.join(__dirname, 'public')));

// Inicializa Supabase com variáveis de ambiente do .env
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ROTA 1: Login
app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  const { data: usuario, error } = await supabase
    .from('perfis')
    .select('*')
    .eq('email', email)
    .eq('senha_hash', senha)
    .maybeSingle();

  if (error) return res.status(500).json({ error: error.message });
  if (!usuario) return res.status(401).json({ error: 'Usuário não encontrado' });
  
  res.json(usuario);
});

// ROTA 2: Buscar Eventos
app.get('/api/eventos', async (req, res) => {
  const { data, error } = await supabase.from('eventos').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ROTA 3: Buscar Aulas Vagas
app.get('/api/vagas', async (req, res) => {
  const { data, error } = await supabase.from('eventos').select('*').eq('vaga', true);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ROTA 4: Solicitar Aula
app.post('/api/solicitacoes', async (req, res) => {
  const { eventoId, professorId } = req.body;
  const { error } = await supabase
    .from('solicitacoes_troca')
    .insert([{ evento_id: eventoId, professor_solicitante_id: professorId, status: 'pendente' }]);
    
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

// ... [restante código do seu server.js antes do final] ...

// O process.env.PORT diz ao Render para usar a porta que ele atribuir.
// O "3000" serve apenas como fallback para testes no seu computador.
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  const userPrompt = req.body.prompt;

  const systemPrompt = `Você é o FURIA CS Bot, um assistente especializado exclusivamente no time profissional de Counter-Strike da FURIA Esports. 
Você só responde perguntas relacionadas ao time de CS da FURIA, como jogadores, jogos, resultados, estatísticas, campeonatos e notícias relacionadas.
Se uma pergunta não estiver relacionada à FURIA no CS, diga educadamente que você só pode falar sobre esse assunto. Fale somente em português também.`;

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: `${systemPrompt}\n\nUsuário: ${userPrompt}`,
        stream: false,
      }),
    });

    const data = await response.json();
    res.json({ response: data.response });
  } catch (error) {
    console.error('Erro ao chamar LLaMA:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Node rodando em http://localhost:${port}`);
});

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
Sua função é fornecer informações apenas sobre o time de CS da FURIA, com foco no elenco atual, conquistas recentes e conteúdo oficial.

🔒 Regras:
- Responda apenas perguntas relacionadas ao time de Counter-Strike da FURIA.
- Caso receba uma pergunta que não envolva esse tema, responda educadamente:  
  "Desculpe, só posso responder perguntas relacionadas ao time de CS:GO da FURIA Esports."
- Não invente informações. Caso não saiba algo, diga que ainda não há dados confirmados.

🧠 Elenco Atual (2024/2025):
- FalleN – IGL e AWP  
- yuurih – Rifler  
- KSCERATO – Rifler  
- YEKINDAR – Entry Fragger  
- molodoy – Suporte  
- sidde – Coach

🏆 Conquistas Recentes:
- Participações sólidas em IEM, BLAST Premier e ESL Pro League.
- Campanhas consistentes nos playoffs de torneios internacionais.
- KSCERATO e yuurih entre os jogadores mais consistentes do cenário.
- Reforço com FalleN e YEKINDAR trouxe mais estratégia e agressividade.

📱 Redes Sociais Oficiais da FURIA:
- Twitter (X): https://twitter.com/FURIA  
- Instagram: https://www.instagram.com/furia  
- YouTube: https://www.youtube.com/FURIA  
- TikTok: https://www.tiktok.com/@furia  
- Website: https://www.furia.gg

Agora aguarde a pergunta do usuário e responda com base somente nessas diretrizes.
`;

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

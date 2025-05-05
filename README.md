# Backend – Node.js + Ollama

Este repositório contém a API de backend, que utiliza o modelo `llama3` da Ollama para responder perguntas relacionadas ao time FURIA Esports no cenário de Counter-Strike.

## 🛠️ Instalação e Execução Local

### 1. **Pré-requisitos**
- [Node.js](https://nodejs.org/) instalado.
- [Ollama](https://ollama.com/download) instalado e funcionando localmente.
- Modelo `llama3` carregado no Ollama:

```bash
ollama run llama3
```

### 2. **Clone o repositório**

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO_BACKEND.git
cd NOME_DO_REPOSITORIO_BACKEND
```

### 2. **Instale as dependências**

```bash
npm install
```

### 2. **Inicie o servidor**

```bash
node server.js
```

O backend será iniciado na porta 3000. A API estará acessível em:

http://localhost:3000/chat

O formato da requisição é de envio:

```bash
{
  "prompt": "Qual é o elenco atual da FURIA?"
}
```

E de devolução:

```bash
{
  "response": "Resposta gerada pelo modelo"
}
```

import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';
import 'dotenv/config';
import swagger from './swagger.js';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import connectDB from './src/config/db.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB()

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Configuração Swagger
swagger(app);

// Servindo arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rota principal para a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Página de login
  });  

// Rotas da API
app.use('/api', routes);

// Tratamento de erros globais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor!' });
});

app.get('/favicon.ico', (req, res) => res.status(204).send());

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`)
  console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`)
});
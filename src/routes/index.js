// Função para criação de rotas principais
import { Router } from "express";

// Importação dos middlewares
import verificaToken from "../middleware/verificarToken.js";
import verificaAdmin from "../middleware/verificarAdmin.js";

// Importação das rotas
import veiculosRoutes from "./veiculosRoutes.js";
import avariasRoutes from "./avariasRoutes.js";
import usuariosRoutes from "./usuariosRoutes.js";
import manutencoesRoutes from "./manutencoesRoutes.js";

const app = Router();

// Rotas principais

// Rota de veículos (necessário estar logado e ser admin)
app.use('/veiculos', verificaToken, verificaAdmin, veiculosRoutes);

// Rota de avarias (necessário estar logado)
app.use('/avarias', verificaToken, avariasRoutes);

// Rota de usuários (pode adicionar proteção se necessário)
app.use('/usuarios', usuariosRoutes);

// Rota de manutenções (necessário estar logado)
app.use('/manutencoes', verificaToken, manutencoesRoutes);

export default app;

import { Router } from 'express';
import usersController from '../controllers/usuariosController.js';
import verificaToken from '../middleware/verificarToken.js';
import verificaAdmin from '../middleware/verificarAdmin.js';
import criptografarSenha from '../middleware/criptografaSenha.js';

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Lista todos os usuários
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       500:
 *         description: Erro ao listar usuários
 */
router.get("/", verificaToken, verificaAdmin, usersController.index);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuários]
 *     summary: Obtém um usuário pelo ID
 *     security: [bearerAuth: []]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao listar usuário
 */
router.get("/:id", verificaToken, verificaAdmin, usersController.indexID);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags: [Usuários]
 *     summary: Cria um novo funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Funcionário criado com sucesso
 *       500:
 *         description: Erro ao adicionar funcionário
 */
router.post("/", criptografarSenha, usersController.createFuncionario);

/**
 * @swagger
 * /usuarios/admin:
 *   post:
 *     tags: [Usuários]
 *     summary: Cria um novo administrador
 *     security: [bearerAuth: []]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *       500:
 *         description: Erro ao adicionar administrador
 */
router.post("/admin", verificaToken, verificaAdmin, criptografarSenha, usersController.createAdmin);

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     tags: [Usuários]
 *     summary: Realiza o login de um usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro ao fazer login
 */
router.post("/login", usersController.login);

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     tags: [Usuários]
 *     summary: Atualiza um usuário pelo ID
 *     security: [bearerAuth: []]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */
router.put("/:id", verificaToken, verificaAdmin, usersController.update);

/**
 * @swagger
 * /usuarios:
 *   delete:
 *     tags: [Usuários]
 *     summary: Deleta todos os usuários
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Usuários deletados com sucesso
 *       500:
 *         description: Erro ao deletar usuários
 */
router.delete("/", verificaToken, verificaAdmin, usersController.delete);

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     tags: [Usuários]
 *     summary: Deleta um usuário pelo ID
 *     security: [bearerAuth: []]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */
router.delete("/:id", verificaToken, verificaAdmin, usersController.deleteID);

export default router;
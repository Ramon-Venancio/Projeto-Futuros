import { Router } from 'express';
import avariasController from '../controllers/avariasController.js';

const router = Router();

/**
 * @swagger
 * /avarias:
 *   get:
 *     tags: [Avarias]
 *     summary: Lista todas as avarias
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Lista de avarias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avaria'
 *       500:
 *         description: Erro ao listar avarias
 */
router.get('/', avariasController.index);

/**
 * @swagger
 * /avarias/{id}:
 *   get:
 *     tags: [Avarias]
 *     summary: Obtém uma avaria pelo ID
 *     security: [bearerAuth: []]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da avaria
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avaria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaria'
 *       404:
 *         description: Avaria não encontrada
 *       500:
 *         description: Erro ao listar avaria
 */
router.get('/:id', avariasController.indexID);

/**
 * @swagger
 * /avarias/{id}:
 *   post:
 *     tags: [Avarias]
 *     summary: Cria uma nova avaria
 *     security: [bearerAuth: []]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do veículo associado à avaria
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Avaria'
 *     responses:
 *       201:
 *         description: Avaria criada com sucesso
 *       500:
 *         description: Erro ao adicionar avaria
 */
router.post('/:id', avariasController.create);

/**
 * @swagger
 * /avarias/{id}:
 *   put:
 *     tags: [Avarias]
 *     summary: Atualiza uma avaria pelo ID
 *     security: [bearerAuth: []]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da avaria
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Avaria'
 *     responses:
 *       200:
 *         description: Avaria atualizada com sucesso
 *       404:
 *         description: Avaria não encontrada
 *       500:
 *         description: Erro ao atualizar avaria
 */
router.put('/:id', avariasController.update);

/**
 * @swagger
 * /avarias:
 *   delete:
 *     tags: [Avarias]
 *     summary: Deleta todas as avarias
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Avarias deletadas com sucesso
 *       500:
 *         description: Erro ao deletar avarias
 */
router.delete('/', avariasController.delete);

/**
 * @swagger
 * /avarias/{id}:
 *   delete:
 *     tags: [Avarias]
 *     summary: Deleta uma avaria pelo ID
 *     security: [bearerAuth: []]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID da avaria
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Avaria deletada com sucesso
 *       404:
 *         description: Avaria não encontrada
 *       500:
 *         description: Erro ao deletar avaria
 */
router.delete('/:id', avariasController.deleteID);

export default router;
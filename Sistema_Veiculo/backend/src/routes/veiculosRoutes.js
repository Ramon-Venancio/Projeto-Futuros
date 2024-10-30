import { Router } from 'express';
import veiculosController from '../controllers/veiculosController.js';

const router = Router();

/**
 * @swagger
 * /veiculos:
 *   get:
 *     tags: [Veículos]
 *     summary: Lista todos os veículos
 *     security: [bearerAuth: []]
 *     responses:
 *       200:
 *         description: Sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Veiculo'
 *       401:
 *         description: Não autorizado
 */
router.get('/', veiculosController.index);

/**
 * @swagger
 * /veiculos/{parametro}:
 *   get:
 *     tags: [Veículos]
 *     summary: Encontra um veículo pelo ID, placa ou modelo
 *     parameters:
 *       - name: parametro
 *         in: path
 *         required: true
 *         description: ID, placa ou modelo do veículo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Veículo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro ao listar veículo
 */
router.get('/:parametro', veiculosController.indexFind);

/**
 * @swagger
 * /veiculos:
 *   post:
 *     tags: [Veículos]
 *     summary: Adiciona um novo veículo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veiculo'
 *     responses:
 *       201:
 *         description: Veículo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       500:
 *         description: Erro ao adicionar veículo
 */
router.post('/', veiculosController.create);

/**
 * @swagger
 * /veiculos/{id}:
 *   put:
 *     tags: [Veículos]
 *     summary: Atualiza um veículo pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do veículo
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Veiculo'
 *     responses:
 *       200:
 *         description: Veículo atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Veiculo'
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro ao atualizar veículo
 */
router.put('/:id', veiculosController.update);

/**
 * @swagger
 * /veiculos:
 *   delete:
 *     tags: [Veículos]
 *     summary: Deleta todos os veículos
 *     responses:
 *       200:
 *         description: Banco de dados deletado com sucesso
 *       500:
 *         description: Erro ao deletar o banco de dados
 */
router.delete('/', veiculosController.delete);

/**
 * @swagger
 * /veiculos/{id}:
 *   delete:
 *     tags: [Veículos]
 *     summary: Remove um veículo pelo ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID do veículo
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Veículo deletado com sucesso
 *       404:
 *         description: Veículo não encontrado
 *       500:
 *         description: Erro ao deletar veículo
 */
router.delete('/:id', veiculosController.deleteID);

export default router;
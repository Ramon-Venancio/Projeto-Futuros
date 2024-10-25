import { Router } from 'express'
import veiculosController from '../controllers/veiculosController.js'

const router = Router()
/**
 * @swagger
 * /veiculos:
 *  get:
 *      summary: Lista todos os veículos
 *      security:
 *          - bearerAuth: []
 *      tags: [Veículos]
 *      responses:
 *          200:
 *              description: Lista de veículos com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Veiculo'
 *          401:
 *              description: Não autorizado. Token ausente ou inválido
 */
router.get('/', veiculosController.index)

/**
 * @swagger
 * /veiculos/{parametro}:
 *  get:
 *      summary: Retorna um veículo por ID, placa ou modelo
 *      tags: [Veículos]
 *      parameters:
 *          - in: path
 *            name: parametro
 *            required: true
 *            description: ID, placa ou modelo do veículo
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: Veículo encontrado
 *          400:
 *              description: Veículo não encontrado
 *           500:
 *              description: Erro ao listar veículo
 */
router.get('/:parametro', veiculosController.indexFind)

/**
 * @swagger
 * /veiculos:
 *  post:
 *      summary: Cria um novo veículo
 *      tags: [Veículos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Veiculo'
 *      responses:
 *          201:
 *              description: Veículo criado com sucesso
 *          500:
 *              description: Erro ao adicionar veículo
 */
router.post('/', veiculosController.create)

/**
 * @swagger
 * /veiculos/{id}:
 *  put:
 *      summary: Atualiza um veículo existente
 *      tags: [Veículos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do veículo
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Veiculo'
 *      responses:
 *          200:
 *              description: Veículo atualizado com sucesso
 *          404:
 *              description: Veículo não encontrado
 *          500:
 *              description: Erro ao atualizar veículo
 */
router.put('/:id', veiculosController.update)

/**
 * @swagger
 * /veiculos:
 *  delete:
 *      summary: Deleta todos os veículos
 *      tags: [Veículos]
 *      responses:
 *          200:
 *              description: Banco de dados deletado com sucesso
 *          500:
 *              description: Erro ao deletar o banco de dados
 */
router.delete('/', veiculosController.delete)

/**
 * @swagger
 * /veiculos/{id}:
 *  delete:
 *      summary: Deleta um veículo por ID
 *      tags: [Veículos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: ID do veículo
 *            schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Veículo deletado com sucesso
 *          404:
 *              description: Veículo não encontrado
 *          500:
 *              description: Erro ao deletar veículo
 */
router.delete('/:id', veiculosController.deleteID)

export default router
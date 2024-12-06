import { Router } from 'express';
import manutencoesController from '../controllers/manutencoesController.js';

const router = Router();

// Listar todas as manutenções
router.get("/", manutencoesController.index);

// Listar uma manutenção específica por ID
router.get("/:id", manutencoesController.indexID);

// Criar uma nova manutenção
router.post("/", manutencoesController.create);

// Atualizar uma manutenção específica por ID
router.put("/:id", manutencoesController.update);

// Apagar todas as manutenções
router.delete("/", manutencoesController.delete);

// Apagar uma manutenção específica por ID
router.delete("/:id", manutencoesController.deleteID);

export default router;
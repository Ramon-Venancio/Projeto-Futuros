import { listarAvarias, salvarAvarias } from "../models/avariasModel";

const avariasController = {
     index: async (req, res) => {
          try {
               const avarias = await listarAvarias()
               res.json(avarias)
          } catch (error) {
               res.status(500).json({ error: 'Erro ao listar avarias' })
          } 
     },
     indexID: async (req, res) => {
          try {
               const id = parseInt(req.params.id)
               const avarias = await listarAvarias()
               const avaria = avarias.find(a => a.id === id)

               if (!avaria) {
                    return res.status(400).json({ error: 'Avaria não encontrado' })
               }

               res.json(avaria)
          } catch (error) {
               res.status(500).json({ error: 'Erro ao listar avaria' })
          }
     },
     
}
import Avaria from '../models/avariasModel.js'
import Veiculo from '../models/veiculosModel.js'

const avariasController = {
    index: async (req, res) => {
        try {
            const avarias = await Avaria.find()
            
            res.json(avarias)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar avarias' })
        }
    },
    indexID: async (req, res) => {
        try {
            const id = req.params.id
            let avaria

            if (/^[0-9a-fA-F]{24}$/.test(id)) {
                // Verificar se é um ID válido do MongoDB
                avaria = await Avaria.findById(id)
            } else {
                return res.status(404).json({ error: 'ID errado!' })
            }

            if (!avaria) {
                return res.status(404).json({ error: 'Avaria não encontrado' })
            }

            res.json(avaria)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar avaria' })
        }
    },
    create: async (req, res) => {
        try {
            const { localizacao, idVeiculo } = req.body
            const veiculoExistente = await Veiculo.exists({ _id: idVeiculo })
            const avariaExistente = await Avaria.exists({ localizacao, idVeiculo })

            if (!veiculoExistente) {
                return res.status(404).json({ message: 'Veiculo não existe!' })
            }

            if (avariaExistente) {
                return res.status(404).json({ message: 'Avaria já existente' })
            }

            const novaAvaria = new Avaria(req.body)
            const avariaSalva = await novaAvaria.save()

            res.status(201).json({message: 'Avaria salva com sucesso', avaria: avariaSalva})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar avaria' })
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const novosDados = req.body

            const avariaAtualizada = await Avaria.findByIdAndUpdate(id, novosDados, {
                new: true, // Retorna o documento atualizado
                runValidators: true // Garante que as validações do modelo sejam aplicadas
            })
            
            if (!avariaAtualizada) {
                return res.status(404).json({ error: 'Avaria não encontrado' })
            }

            res.json({message: 'Avaria editada com sucesso', avaria: avariaAtualizada})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar veículo' })
        }
    },
    delete: async (req, res) => {
        try {
            await Avaria.deleteMany()

            res.json({message: 'Todas as avarias foram deletados com sucesso.'})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o banco de dados' })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = req.params.id

            const avariaRemovida = await Avaria.findByIdAndDelete(id)


            res.json({message: 'Avaria deleta com sucesso.', avaria: avariaRemovida})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar avaria' })
        }
    }
}

export default avariasController
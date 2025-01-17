import Manutencao from "../models/manutencoesModel.js"
import Avaria from "../models/avariasModel.js"
import Veiculo from "../models/veiculosModel.js"
import Usuario from "../models/usuariosModel.js"

const manutencoesController = {
    index: async (req, res) => {
        try {
            const manutencoes = await Manutencao.find()

            res.json(manutencoes)
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar manutenções" })
        }
    },
    indexID: async (req, res) => {
        try {
            const id = req.params.id
            let manutencao

            if (/^[0-9a-fA-F]{24}$/.test(id)) {
                // Verificar se é um ID válido do MongoDB
                manutencao = await Manutencao.findById(id)
            } else {
                return res.status(404).json({ error: 'ID incorreto!' })
            }

            if (!manutencao) {
                return res.status(404).json({ error: "Manutenção não encontrada" })
            }

            res.json(manutencao)
        } catch (error) {
            res.status(500).json({ error: "Erro ao mostrar a manutenção" })
        }
    },
    create: async (req, res) => {
        try {
            const { idVeiculo } = req.body
            const manutencaoExistente = await Manutencao.exists({ idVeiculo })

            if (manutencaoExistente) {
                return res.status(404).json({ message: 'Manutenção já agendada!' })
            }

            const novaManutencao = new Manutencao(req.body)
            const manutencaoSalva = novaManutencao.save()

            res.status(201).json({ message:'Manutenção agendada', manutencao: manutencaoSalva })
        } catch (error) {
            res.status(500).json({ error: "Erro ao adicionar manutenção" })
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const novosDados = req.body

            const manutencaoAtualizada = await Manutencao.findByIdAndUpdate(id, novosDados, {
                new: true, // Retorna o documento atualizado
                runValidators: true // Garante que as validações do modelo sejam aplicadas
            })

            if (!manutencaoAtualizada) {
                return res.status(404).json({ message: 'Manutenção não encontrada!' })
            }

            res.json({ message: "Manutenção editada com sucesso", manutencao: manutencaoAtualizada, })
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar manutenção" })
        }
    },
    delete: async (req, res) => {
        try {
            await Manutencao.deleteMany()

            res.json({ message: "Todas as manutenções foram deletadas." })
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar o banco de dados" })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = req.params.id

            const manutencaoRemovida = Manutencao.findByIdAndDelete(id)

            res.json(manutencaoRemovida)
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar manutenção" })
        }
    },
}

export default manutencoesController
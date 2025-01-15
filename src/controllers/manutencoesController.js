import Manutencao from "../models/manutencoesModel.js"
import Avaria from "../models/avariasModel.js"
import Veiculo from "../models/veiculosModel.js"

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
                manutencao = Manutencao.findById(id)
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
            const novaManutencao = req.body
            const manutencoes = await listarManutencoes()

            const novaManutencaoComId = {
                id: manutencoes.length > 0 ? manutencoes[manutencoes.length - 1].id + 1 : 1,
                ...novaManutencao,
            }

            manutencoes.push(novaManutencaoComId)

            await salvarManutencoes(manutencoes)
            res.status(201).json(novaManutencaoComId)
        } catch (error) {
            res.status(500).json({ error: "Erro ao adicionar manutenção" })
        }
    },
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10)
            const novosDados = req.body
            console.log(id)

            const manutencoes = await listarManutencoes()
            const index = manutencoes.findIndex((a) => a.id === id)

            if (index === -1) {
                return res.status(404).json({ error: "Manutenção não encontrada" })
            }

            manutencoes[index] = { ...manutencoes[index], ...novosDados }

            await salvarManutencoes(manutencoes)
            res.json({
                message: "Manutenção editada com sucesso",
                manutencao: manutencoes[index],
            })
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar manutenção" })
        }
    },
    delete: async (req, res) => {
        try {
            await salvarManutencoes([])
            res.json({ message: "Banco de dados deletado com sucesso." })
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar o banco de dados" })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10)

            const manutencoes = await listarManutencoes()
            const index = manutencoes.findIndex((a) => a.id === id)

            if (index === -1) {
                return res.status(404).json({ error: "Manutenção não encontrada" })
            }

            const [manutencaoRemovida] = manutencoes.splice(index, 1)

            await salvarManutencoes(manutencoes)
            res.json(manutencaoRemovida)
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar manutenção" })
        }
    },
}

export default manutencoesController
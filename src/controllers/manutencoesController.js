import { listarManutencoes, salvarManutencoes } from "../models/manutencoesModel"
import { listarVeiculos } from "../models/veiculosModel"

const manutencoesController = {
    index: async (req, res) => {
        try {
            const manutencoes = await listarManutencoes()
            res.json(manutencoes)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar manutencoes' })
        }
    },
    indexID: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const manutencoes = await listarManutencoes()
            const manutencao = manutencoes.find(a => a.id === id)

            if (!manutencao) {
                return res.status(404).json({ error: 'manutencao não encontrado' })
            }

            res.json(manutencao)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao mostrar a manutencao' })
        }
    },
    create: async (req, res) => {
        try {
            let novaManutencao = req.body
            const idVeiculo = parseInt(req.params.id)
            const veiculos = await listarVeiculos()
            const manutencoes = await listarManutencoes()

            let veiculo = veiculos.find(v => v.id === idVeiculo)

            if (!veiculo) {
                return res.status(404).json({ error: 'Veiculo não existente nos dados!' })
            }

            novaManutencao = {
                id: manutencoes.length > 0 ? manutencoes[manutencoes.length - 1].id + 1 : 1,
                ...novaManutencao
            }

            await salvarManutencoes(manutencoes)
            res.status(201).json(novaManutencao)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar manutenção' })
        }
    },
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const novosDados = req.body

            let manutencoes = await listarManutencoes()
            const index = manutencoes.findIndex(a => a.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Manutenção não encontrada' })
            }

            manutencoes[index] = { ...manutencoes[index], ...novosDados }

            await salvarManutencoes(manutencoes)
            res.json({message: 'Manutenção editada com sucesso', manutencao:manutencoes[index]})
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar manutenção' })
        }
    },
    delete: async (req, res) => {
        try {
            let manutencoes = await listarManutencoes()

            manutencoes.length = 0

            await salvarManutencoes(manutencoes)
            res.json('Banco de dados deletado com sucesso.')
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o banco de dados' })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = parseInt(req.params.id)

            let manutencoes = await listarManutencoes()
            const index = manutencoes.findIndex(a => a.id === id)
            if (index === -1) {
                return res.status(404).json({ error: 'manutenção não encontrado' })

            }
            const manutencaoRemovida = manutencoes.splice(index, 1)

            await salvarManutencoes(manutencoes)
            res.json(manutencaoRemovida)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar manutenção' })
        }
    }
}
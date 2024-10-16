import { listarAvarias, salvarAvarias } from "../models/avariasModel.js";
import { listarVeiculos } from "../models/veiculosModel.js";

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
                return res.status(404).json({ error: 'Avaria não encontrado' })
            }

            res.json(avaria)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar avaria' })
        }
    },
    create: async (req, res) => {
        try {
            const novaAvaria = req.body
            const idVeiculo = parseInt(req.params.id)
            const veiculos = await listarVeiculos()
            const avarias = await listarAvarias()

            const verificacaoVeiculo = veiculos.some(v => v.id === idVeiculo)

            if (!verificacaoVeiculo) {
                return res.status(404).json({ error: 'Veiculo não existente nos dados!' })
            }

            if (avarias.length === 0) {
                novaAvaria.id = 1
                avarias.push(novaAvaria)
            } else {
                const maiorID = avarias.reduce((maior, atual) => {
                    return atual.id > maior ? atual.id : maior
                }, 0)
                novaAvaria.id = maiorID + 1
                avarias.push(novaAvaria)
            }

            await salvarAvarias(avarias)
            res.status(201).json(novaAvaria)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar avaria' })
        }
    },
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const novosDados = req.body

            let avarias = await listarAvarias()
            const index = avarias.findIndex(a => a.id === id)

            if (index === -1) {
                return res.status(404).json({ error: 'Avaria não encontrada' })
            }

            avarias[index] = { ...avarias[index], ...novosDados }

            await salvarAvarias(avarias)
            res.json(avarias[index])
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar veículo' })
        }
    },
    delete: async (req, res) => {
        try {
            let avarias = await listarAvarias()

            avarias.length = 0

            await salvarAvarias(avarias)
            res.json('Banco de dados deletado com sucesso.')
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o banco de dados' })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = parseInt(req.params.id)

            let avarias = await listarAvarias()
            const index = avarias.findIndex(a => a.id === id)
            if (index === -1) {
                return res.status(404).json({ error: 'avaria não encontrado' })

            }
            const avariaRemovida = avarias.splice(index, 1)

            await salvarAvarias(avarias)
            res.json(avariaRemovida)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar avaria' })
        }
    }
}

export default avariasController
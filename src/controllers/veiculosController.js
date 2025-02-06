import Veiculo from "../models/veiculosModel.js";

const veiculosController = {
    index: async (req, res) => {
        try {
            const veiculos = await Veiculo.find()
            
            res.status(200).json(veiculos)
        } catch (error) {
            console.error('Erro ao listar veículos:', error.message)
            res.status(500).json({ error: 'Erro ao listar veículos' })
        }
    },
    indexFind: async (req, res) => {
        try {
            const parametro = req.params.parametro
            let veiculo
            if (/^[0-9a-fA-F]{24}$/.test(parametro)) {
                // Verificar se é um ID válido do MongoDB
                veiculo = await Veiculo.findById(parametro)
            } else if (/^[A-Z]{3}-\d{4}$/.test(parametro.toUpperCase())) {
                // Buscar por placa
                veiculo = await Veiculo.findOne({ placa: parametro.toUpperCase() })
            } else {
                return res.status(400).json({ error: 'ID ou placa inválidos!' });
            }

            if (!veiculo) {
                return res.status(404).json({ error: 'Veículo não encontrado' })
            }

            res.status(200).json(veiculo)
        } catch (error) {
            console.error('Erro ao buscar veículo:', error.message)
            res.status(500).json({ error: 'Erro ao listar veículo' })
        }
    },
    create: async (req, res) => {
        try {
            const { placa, modelo, ano } = req.body;

            if (!placa || !modelo || !ano) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
            }

            const veiculoExistente = await Veiculo.exists({ placa })

            if (veiculoExistente) {
                return res.status(409).json({ message: 'Veículo já existente!' });
            }

            const novoVeiculo = new Veiculo(req.body)
            const veiculoSalvo = await novoVeiculo.save()

            res.status(201).json(veiculoSalvo)
        } catch (error) {
            console.error('Erro ao adicionar veículo:', error.message)
            res.status(500).json({ error: 'Erro ao adicionar veículo' })
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id
            const novosDados = req.body

            const veiculoAtualizado = await Veiculo.findByIdAndUpdate(id, novosDados, {
                new: true, // Retorna o documento atualizado
                runValidators: true // Garante que as validações do modelo sejam aplicadas
            })
            
            if (!veiculoAtualizado) {
                return res.status(404).json({ error: 'Veiculo não encontrado' })
            }

            res.status(200).json(veiculoAtualizado)
        } catch (error) {
            console.error('Erro ao atualizar veículo:', error.message)
            res.status(500).json({ error: 'Erro ao atualizar veículo' })
        }
    },
    delete: async (req, res) => {
        try {
            await Veiculo.deleteMany()

            res.status(200).json({ message: 'Todos os veículos foram deletados com sucesso.' })
        } catch (error) {
            console.error('Erro ao deletar veículos:', error.message)
            res.status(500).json({ error: 'Erro ao deletar o banco de dados' })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = req.params.id

            if (!/^[0-9a-fA-F]{24}$/.test(id)) {
                return res.status(400).json({ error: 'ID inválido!' })
            }

            const veiculoRemovido = await Veiculo.findByIdAndDelete(id)

            if (!veiculoRemovido) {
                return res.status(404).json({ error: 'Veiculo não encontrado' })
            }
            
            res.status(204).send()
        } catch (error) {
            console.error('Erro ao deletar veículo:', error.message)
            res.status(500).json({ error: 'Erro ao deletar veiculo' })
        }
    }
}

export default veiculosController
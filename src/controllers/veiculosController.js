import Veiculo from "../models/veiculosModel.js";

const veiculosController = {
    index: async (req, res) => {
        try {
            const veiculos = await Veiculo.find()
            res.json(veiculos)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar veículos' })
        }
    },
    indexFind: async (req, res) => {
        try {
            const parametro = req.params.parametro
            let veiculo;
            if (/^[0-9a-fA-F]{24}$/.test(parametro)) {
                // Verificar se é um ID válido do MongoDB
                veiculo = await Veiculo.findById(parametro);
            } else if (/^[A-Z]{3}-\d{4}$/.test(parametro.toUpperCase())) {
                // Buscar por placa
                veiculo = await Veiculo.findOne({ placa: parametro.toUpperCase() });
            } else {
                return res.status(404).json({ error: 'Veículo não encontrado' })
            }

            res.json(veiculo)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar veículo' })
        }
    },
    create: async (req, res) => {
        try {
            const novoVeiculo = new Veiculo(req.body)
            const veiculoSalvo = await novoVeiculo.save()

            res.status(201).json(veiculoSalvo)
        } catch (error) {
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

            res.json(veiculoAtualizado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar veículo' })
        }
    },
    delete: async (req, res) => {
        try {
            await Veiculo.deleteMany()

            res.json({ message: 'Todos os veículos foram deletados com sucesso.' })
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o banco de dados' })
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = parseInt(req.params.id)

            const veiculoRemovido = await Veiculo.findByIdAndDelete(id)

            if (!veiculoRemovido) {
                return res.status(404).json({ error: 'Veiculo não encontrado' })
            }
            
            res.json(veiculoRemovido)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar veiculo' })
        }
    }
}

export default veiculosController
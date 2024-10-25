import { listarVeiculos, salvarVeiculos } from "../models/veiculosModel.js";

const veiculosController = {
    index: async (req, res) => {
        try {
            const veiculos = await listarVeiculos()
            res.json(veiculos)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar veículos' })
        }
    },
    indexFind: async (req, res) => {
        try {
            const parametro = req.params.parametro
            const veiculos = await listarVeiculos()

            if (!isNaN(parametro)) {
                const id = parseInt(parametro)
                const veiculo = veiculos.find(v => v.id === id)
                if (!veiculo) {
                    return res.status(400).json({ error: 'Veículo não encontrado' })
                }

                res.json(veiculo)
            }
            else if (/^[A-Z]{3}-\d{4}$/.test(parametro.toUpperCase())) {
                const placa = parametro.toUpperCase();
                const veiculo = veiculos.find(veiculo => veiculo.placa === placa);
                if (!veiculo) {
                    return res.status(400).json({ error: 'Veículo não encontrado' })
                }

                res.json(veiculo)
            }
            else {
                const modelo = parametro.toLowerCase();
                const veiculosModelo = veiculos.filter(veiculo => veiculo.modelo.toLowerCase() === modelo)
                if (!veiculosModelo) {
                    return res.status(400).json({ error: 'Veículo não encontrado' })
                }

                res.json(veiculosModelo)
            }
    
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar veículo' })
        }
    },
    create: async (req, res) => {
        try {
            let novoVeiculo = req.body
            const veiculos = await listarVeiculos()

            const novaPropriedade = {id: veiculos.length > 0 ? veiculos[veiculos.length - 1].id + 1 : 1}
            novoVeiculo = {...novaPropriedade, ...novoVeiculo}
            
            veiculos.push(novoVeiculo)

            await salvarVeiculos(veiculos)
            res.status(201).json(novoVeiculo)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar veículo' })
        }
    },
    update: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            const novosDados = req.body
    
            let veiculos = await listarVeiculos()
            const index = veiculos.findIndex(v => v.id === id)
    
            if (index === -1) {
                return res.status(404).json({ error: 'Veiculo não encontrado' })
            }
    
            veiculos[index] = {...veiculos[index], ...novosDados}
    
    
            await salvarVeiculos(veiculos)
            res.json(veiculos[index])
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar veículo' })
        }
    },
    delete: async (req, res) => {
        try {
            let veiculos = await listarVeiculos()
        
            veiculos.length = 0
        
            await salvarVeiculos(veiculos)
            res.json('Banco de dados deletado com sucesso.')
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar o banco de dados'})
        }
    },
    deleteID: async (req, res) => {
        try {
            const id = parseInt(req.params.id)
            
            let veiculos = await listarVeiculos()
            const index = veiculos.findIndex(v => v.id === id)
        
            if (index === -1) {
                return res.status(404).json({ error: 'Veiculo não encontrado' })
            }
        
    
            const veiculoRemovido = veiculos.splice(index,1)
        
            await salvarVeiculos(veiculos)
            res.json(veiculoRemovido)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar veiculo' })
        }
    }
}

export default veiculosController
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const caminhoArquivo = path.join(__dirname, '..', 'data', 'veiculos.json')

export const listarVeiculos = async () => {
    try {
        const dados = await fs.promises.readFile(caminhoArquivo, 'utf8')
        return JSON.parse(dados)
    } catch (error) {
        console.error(`Erro ai ler o arquivo de veiculos: ${error}`)
        return []
    }
}

export const adicionarVeiculo = async (novoVeiculo) => {
    try {
        const dados = await fs.promises.readFile(caminhoArquivo, 'utf8')
        const veiculos = JSON.parse(dados)

        if (veiculos.length === 0) {
            novoVeiculo.id = veiculos.length + 1;
            veiculos.push(novoVeiculo)
        } else {
            const maiorID = veiculos.reduce((maior,atual) => {
                return atual.id > maior ? atual.id : maior
            }, 0)
            novoVeiculo.id = maiorID + 1
            veiculos.push(novoVeiculo)
        }

        await fs.promises.writeFile(caminhoArquivo, JSON.stringify(veiculos, null, 2))
        return novoVeiculo
    } catch (error) {
        console.error(`Erro ao salvar o veículo: ${error}`)
        throw new Error('Erro ao salvar o veículo')
    }
}

export const salvarVeiculos = async (veiculos) => {
    try {
        await fs.promises.writeFile(caminhoArquivo, JSON.stringify(veiculos, null, 2))
    } catch (error) {
        console.error(`Erro ao salvar o veículo: ${error}`)
        throw new Error('Erro ao salvar o veículo')
    }
}
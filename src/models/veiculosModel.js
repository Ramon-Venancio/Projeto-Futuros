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
        console.error(`Erro ao ler o arquivo de veículos: ${error}`)
        return []
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
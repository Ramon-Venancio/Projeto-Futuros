import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const caminhoArquivo = path.join(__dirname, '..', 'data', 'usuarios.json')

export const listarUsuarios = async () => {
    try {
        const dados = await fs.promises.readFile(caminhoArquivo, 'utf8')
        return JSON.parse(dados)
    } catch (error) {
        console.error(`Erro ao acessar os dados de usuarios: ${error}`)
        return []
    }
}

export const salvarUsuarios = async (usuarios) => {
    try {
        await fs.promises.writeFile(caminhoArquivo, JSON.stringify(usuarios, null, 2))
    } catch (error) {
        console.error(`Error ao salvar os dados de usuários: ${error}`)
        throw new Error('Error ao salvar usuários')
    }
}
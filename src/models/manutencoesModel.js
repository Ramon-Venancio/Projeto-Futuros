import fs from 'fs'
import path from 'path'
import { fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const caminhoArquivo = path.join(__dirname, '..', 'data', 'manutencoes.json')

export const listarManutencoes = async () => {
     try {
          const dados = await fs.promises.readFile(caminhoArquivo, 'utf8')
          return JSON.parse(dados)
     } catch (error) {
          console.error(`Error ao ler o arquivo de manutencções: ${error}`)
          return []
     }
}

export const salvarManutencoes = async (manutencoes) => {
     try {
          await fs.promises.writeFile(caminhoArquivo, JSON.stringify(manutencoes, null, 2))
     } catch (error) {
          console.error(`Erro ao salvar a manutenção: ${error}`)
          throw new Error('Erro ao salvar a manutenção')
     }
}
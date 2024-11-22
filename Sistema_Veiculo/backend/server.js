import express from 'express'
import cors from 'cors'
import routes from './src/routes/index.js'
import 'dotenv/config'
import swagger from './swagger.js'


const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json());

swagger(app)

app.use('/api', routes)

app.listen(PORT, () =>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
    console.log(`Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`)
})
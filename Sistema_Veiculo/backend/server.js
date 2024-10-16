import express from 'express'
import cors from 'cors'
import routes from './src/routes/index.js'
import 'dotenv/config'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json());

app.use('/api', routes)

app.listen(PORT, () =>{
    console.log(`Servidor rodando em:\nhttp://localhost:${PORT}`)
})
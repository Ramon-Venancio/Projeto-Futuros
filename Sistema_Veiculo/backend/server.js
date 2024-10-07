import express from 'express'
import cors from 'cors'
import veiculosRoutes from './src/routes/veiculosRoutes.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json());

app.use('/api', veiculosRoutes)

app.listen(PORT, () =>{
    console.log(`Servidor rodando em:\nhttp://localhost:3000`)
})
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

app.listen(PORT, () =>{
    console.log(`Servidor rodando em:\nhttp://localhost:3000`)
})
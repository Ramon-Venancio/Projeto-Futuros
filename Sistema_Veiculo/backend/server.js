import express from 'express'
import cors from 'cors'
import routes from './src/routes/index.js'
import 'dotenv/config'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerOptions from './config/swaggerConfig.js'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json());

swaggerOptions(app)
app.use('/api', routes)

app.listen(PORT, () =>{
    console.log(`Servidor rodando em:\nhttp://localhost:${PORT}`)
})
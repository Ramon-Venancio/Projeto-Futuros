import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Versão do OpenAPI
    info: {
      title: 'Sistema de Manutenção de Veículos API', // Nome da API
      version: '1.0.0', // Versão da API
      description: 'Documentação da API do Sistema de Manutenção de Veículos', // Descrição
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL base da sua API
        description: 'Servidor local',
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT' // Tipo de token utilizado
        },
      },
    },
    security: [
      {
        bearerAuth: [] // Aplica o JWT como esquema de segurança padrão
      },
    ],
  },
  apis: ['./src/routes/*.js'] // Caminho para os arquivos de rotas com anotações
};

const swaggerDocs = swaggerJsdoc(swaggerOptions)

const swaggerConfig = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)) // Define a rota da documentação
  console.log('Swagger documentado em http://localhost:3000/api-docs')
};

export default swaggerConfig
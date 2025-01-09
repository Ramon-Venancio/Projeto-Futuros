// src/config/swaggerConfig.js
const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // ou '2.0' para Swagger 2.0
        info: {
            title: 'Sistema de Manutenção de Veículos API',
            description: 'Documentação da API do Sistema de Manutenção de Veículos',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000/api', // URL base da sua API
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Veiculo: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        modelo: {
                            type: 'string',
                            example: 'Fusca',
                        },
                        placa: {
                            type: 'string',
                            example: 'ABC-1234',
                        },
                        ano: {
                            type: 'integer',
                            example: '2018',
                        },
                        ultima_manuntencao: {
                            type: 'string',
                            example: "2028-10-13"
                        },
                        status: {
                            type: 'string',
                            example: 'Disponivel'
                        }
                    },
                },
                Avaria: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        placa: {
                            type: 'string',
                            example: 'MKT-2134',
                        },
                        localizacao: {
                            type: 'string',
                            example: 'em baixo',
                        },
                        descricao: {
                            type: 'string',
                            example: 'Pneu furado',
                        },
                    },
                },
                Usuario: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1,
                        },
                        nome: {
                            type: 'string',
                            example: 'admin',
                        },
                        password: {
                            type: 'string',
                            example: '1234',
                        },
                        email: {
                            type: 'string',
                            example: 'admin@example.com',
                        },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
        tags: [
            { name: 'Veículos', description: 'Operações relacionadas a veículos' },
            { name: 'Avarias', description: 'Operações relacionadas a avarias' },
            { name: 'Usuários', description: 'Operações relacionadas a usuários' },
        ],
    },
    apis: ['./src/routes/*.js'], // O caminho para os arquivos que contêm as anotações Swagger
};

export default swaggerOptions;
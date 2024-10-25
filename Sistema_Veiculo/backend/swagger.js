// swagger.js
import swaggerAutogen from ''

const outputFile = './swagger.json'; // O arquivo de saída para a documentação
const endpointsFiles = ['./src/routes/*.js']; // As rotas do seu aplicativo

// Gera a documentação
swaggerAutogen(outputFile, endpointsFiles);
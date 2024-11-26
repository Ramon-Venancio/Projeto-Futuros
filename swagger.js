import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import swaggerOptions from './src/config/swaggerConfig.js';

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const swagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default swagger
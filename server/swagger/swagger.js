import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'belovely1 API',
    version: '1.0.0',
    description: 'API para sorpresas románticas',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      Surprise: {
        type: 'object',
        required: ['userName', 'reasons', 'partnerName', 'timestamp'],
        properties: {
          userName: { type: 'string' },
          reasons: { type: 'array', items: { type: 'string' } },
          partnerName: { type: 'string' },
          timestamp: { type: 'number' }
        }
      }
    }
  },
  security: [{ bearerAuth: [] }],
  tags: [{ name: 'Surprise', description: 'Operaciones de sorpresas' }]
};

const options = {
  swaggerDefinition,
  apis: ['./server/routes/*.js'],
};

export default swaggerJSDoc(options);
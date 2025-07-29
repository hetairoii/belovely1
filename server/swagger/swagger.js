import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'belovely1 API',
    version: '1.0.0',
    description: 'API para sorpresas románticas',
  },
  components: {
    schemas: {
      Surprise: {
        type: 'object',
        required: ['userName', 'reasons', 'partnerName', 'timestamp'],
        properties: {
          userName: { type: 'string' },
          reasons: { type: 'array', items: { type: 'string' } },
          partnerName: { type: 'string' },
          timestamp: { type: 'number' },
          photo: { type: 'string', nullable: true }, // base64 o URL
          extraReasons: {
            type: 'array',
            items: { type: 'string' },
            maxItems: 100,
            nullable: true
          }
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
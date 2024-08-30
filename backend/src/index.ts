import { type ENVS } from './environment'
import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

import { uploadImage } from './features/uploadImage'
import { getImage } from './features/getImage'

// Root Application
const app = new OpenAPIHono<{ Bindings: ENVS }>();

// Application Feature Routes
app.route('/',uploadImage);
app.route('/',getImage);

// SwaggerUI component
app.get('/ui', swaggerUI({ url: '/doc' }));

// Used to access the OpenAPI JSON Document
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
      version: "1.0.0",
      title: "Photo Sharing App",
  },
});

export default app;
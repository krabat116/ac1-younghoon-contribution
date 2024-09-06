import { type ENVS } from './environment'
import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'

import { uploadImage } from './features/image/uploadImage'
import { getImage } from './features/image/getImage'
import { updateImage } from './features/image/updateImage'
import { deleteImage } from './features/image/deleteImage'
import { createComment } from './features/comment/createComment'
import { getComments } from './features/comment/getComments'
import { deleteComment } from './features/comment/deleteComment'

// Root Application
const app = new OpenAPIHono<{ Bindings: ENVS }>();

// Application Feature Routes
app.route('/',uploadImage);
app.route('/',getImage);
app.route('/',updateImage);
app.route('/',deleteImage);

app.route('/',createComment);
app.route('/',getComments);
app.route('/',deleteComment);

// SwaggerUI component
app.get('/ui', swaggerUI({ url: '/doc' }));

// Used to access the OpenAPI JSON Document
app.doc("/doc", {
  openapi: "3.0.0",
  info: {
      version: "1.0.1",
      title: "Photo Sharing App",
  },
});

export default app;
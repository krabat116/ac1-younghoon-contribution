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
import { getAllImages } from './features/image/getAllImages'
import { createGroupMember } from './features/groupmember/createGroupMember'
import { getGroupMembers } from './features/groupmember/getGroupMembers'
import { deleteGroupMember } from './features/groupmember/deleteGroupMember'
import { updateGroupMember } from './features/groupmember/updateGroupMember'
import { createAlbumMember } from './features/albummember/createAlbumMember'
import { deleteAlbumMember } from './features/albummember/deleteAlbumMember'
import { getAlbumMembers } from './features/albummember/getAlbumMembers'
import { updateAlbumMember } from './features/albummember/updateAlbumMember'
import { createPublicLink } from './features/publiclink/createPublicLink'
import { deletePublicLink } from './features/publiclink/deletePublicLink'
import { getPublicLink } from './features/publiclink/getPublicLink'
import { updatePublicLink } from './features/publiclink/updatePublicLink'
import { createUser } from './features/user/createUser'
import { deleteUser } from './features/user/deleteUser'
import { getUser } from './features/user/getUser'
import { updateUser } from './features/user/updateUser'

// Root Application
const app = new OpenAPIHono<{ Bindings: ENVS }>();

// Application Feature Routes
app.route('/',uploadImage);
app.route('/',getImage);
app.route('/',updateImage);
app.route('/',deleteImage);
app.route('/',getAllImages);

app.route('/',createComment);
app.route('/',getComments);
app.route('/',deleteComment);

app.route('/',createGroupMember);
app.route('/',getGroupMembers);
app.route('/',deleteGroupMember);
app.route('/',updateGroupMember);

app.route('/',createAlbumMember);
app.route('/',deleteAlbumMember);
app.route('/',getAlbumMembers);
app.route('/',updateAlbumMember);

app.route('/',createPublicLink);
app.route('/',deletePublicLink);
app.route('/',getPublicLink);
app.route('/',updatePublicLink);

app.route('/',createUser);
app.route('/',deleteUser);
app.route('/',getUser);
app.route('/',updateUser);

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
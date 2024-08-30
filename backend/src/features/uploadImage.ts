import { z,createRoute,OpenAPIHono } from '@hono/zod-openapi'
import { getObjectStorage } from '../external/objectstorage/types';
import { ENVS } from '../environment';

/**
 * This defines the structure of our routes input or body of the request
 */
const uploadImageSchema = z.object({
    ownerId: z.string().openapi({example:'user1'}),
    albumId: z.string().openapi({example:'album1'}),
    description: z.string().optional().openapi({example:"A photo of a cow. Moo!"}),
    order: z.coerce.number().int().positive().openapi({example:1}),
    widthPx: z.coerce.number().int().positive().openapi({example:1080}),
    heightPx: z.coerce.number().int().positive().openapi({example:1920}),
    image: z.instanceof(File)
            .refine((file) => file.type.startsWith('image/'), {
                message: 'Only image files are allowed.',
            })
  }).openapi('ImageCreate')


/**
 * This both defines our routes setup, but also generates the openAPI documentation.
 */
const createImageRoute = createRoute({
    method:'post',
    path:'/image',
    request: {
        body: {
          content: {
            'multipart/form-data': {
              schema: uploadImageSchema
            }
          }
        }
    },
    responses: {
        200: {
            description:'upload a new image object.',
            content:{
                'application/json':{
                    schema: z.object({
                        result:z.string()
                    })
                }
            }
        }
    }
})

export const uploadImage = new OpenAPIHono<{ Bindings: ENVS }>();

/**
 * This is the actual logic part of our route / feature. 
 */
uploadImage.openapi(createImageRoute,async (c) => {
    const objectStorage = getObjectStorage(c.env.OBJECT_STORAGE)
    const body = c.req.valid("form");
  
    if (body.image instanceof File) {
      await objectStorage.put(body.albumId,body.image)
    }
  
    return c.json({
      result:'success'
    })
  })
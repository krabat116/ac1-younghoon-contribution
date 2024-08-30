import { z,createRoute,OpenAPIHono } from '@hono/zod-openapi'
import { getObjectStorage } from '../external/objectstorage/types';
import { ENVS } from '../environment';


const getImageParams = z.object({
    id: z.string().min(1).openapi({
        param:{
            in:'path',
            name:'id'
        },
        description:'Id of image you wish to fetch.'
    })
})

const getImageResponseSchema = z.object({
    
})

/**
 * This both defines our routes setup, but also generates the openAPI documentation.
 */
const getImageRoute = createRoute({
    method:'get',
    path:'/image/{id}',
    request: {
        params: getImageParams
    },
    responses: {
        200: {
            description:'Fetch an image object.',
            content:{
                'application/json':{
                    schema: getImageResponseSchema
                }
            }
        }
    }
})

export const getImage = new OpenAPIHono<{ Bindings: ENVS }>();

/**
 * This is the actual logic part of our route / feature. 
 */
getImage.openapi(getImageRoute,async (c) => {
    const objectStorage = getObjectStorage(c.env.OBJECT_STORAGE)
    const imageId = c.req.param('id')
  
    const image = await objectStorage.get(imageId)
  
    return c.json({
      result:'success',
      image
    })
  })
import { z,createRoute,OpenAPIHono } from '@hono/zod-openapi'
import { getObjectStorage } from '../../external/objectstorage/types';
import { getDB } from '../../external/database/db';
import { type ENVS } from '../../environment';
import { getNewId } from '../../external/ids/getId';

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
            }).openapi({type:'string',format:'binary'})
  }).openapi('ImageCreate')


/**
 * Defines the return type the UI should recieve.
 */
const Response = z.object({
  type: z.string(),
  message: z.string()
})


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
        201: {
            description:'upload a new image object.',
            content:{
                'application/json':{
                    schema: Response
                }
            }
        },
        500: {
          description:'failed to save new image.',
          content:{
            'application/json':{
              schema: Response
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
    const objectStorage = getObjectStorage(c.env);
    const db = getDB(c.env.DB);

    const body = c.req.valid("form");
  
    const newImageId = getNewId();
    if (body.image instanceof File) {
      try{
        //TODO: check if this image or orderid is taken?
        const albumImages = await db.selectFrom('Images')
                          .select(['id','order'])
                          .where('albumid','=',body.albumId)
                          .execute();

        if(albumImages.find(i => i.order == body.order) != undefined){
          // error - this image ordering is already taken by another image.
          return c.json({
            type:"ERROR",
            message:`Failed to upload new image; An image already has the order ${body.order}`
          },500)
        }

        await db.insertInto('Images').values({
          id: newImageId,
          albumid:body.albumId,
          owner:body.ownerId,
          description: body.description,
          heightpx:body.heightPx,
          widthpx:body.widthPx,
          imageUrl:'',//TODO: these may be unecessary due to use of presigned urls.
          thumbnailUrl:'',
          order:body.order
        }).execute();

        await objectStorage.put(newImageId,body.image);


      } catch (e) {
        console.error(e)
        return c.json({
          type:"ERROR",
          message:"Failed to upload new image."
        },500)
      }
    }
  
    return c.json({
      type:"SUCCESS",
      message:`successfully saved image with id:${newImageId}`,
    },201)
  })
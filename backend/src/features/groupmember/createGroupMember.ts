import { z,createRoute,OpenAPIHono } from '@hono/zod-openapi'
import { getDB } from '../../external/database/db';
import { ROLES, type ENVS } from '../../environment';

/**
 * This defines the structure of our routes input or body of the request
 */
const createGroupMemberSchema = z.object({
    role: z.nativeEnum(ROLES).optional().openapi({example:ROLES.CONTRIBUTOR}),
  }).openapi('GroupMemberCreate')

const createGroupMemberParams = z.object({
  groupId: z.string().min(1).openapi({
      param:{
          in:'path',
          name:'groupId'
      },
      description:'Id of the group you wish to add a member to.'
  }),
  userId: z.string().min(1).openapi({
    param:{
        in:'path',
        name:'userId'
    },
    description:'Id of the user you wish to add as member of the group.'
})
})


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
const createGroupMemberRoute = createRoute({
    method:'post',
    path:'/groupmember/{groupId}/{userId}',
    request: {
      params: createGroupMemberParams,
      body: {
        content: {
          'multipart/form-data': {
            schema: createGroupMemberSchema
          }
        }
      }
    },
    responses: {
        201: {
            description:'add new group member.',
            content:{
                'application/json':{
                    schema: Response
                }
            }
        },
        409: {
          description:'failed to add new group member. May already exist.',
          content:{
            'application/json':{
              schema: Response
            }
          }
        }
    }
})

export const createGroupMember = new OpenAPIHono<{ Bindings: ENVS }>();

/**
 * This is the actual logic part of our route / feature. 
 */
createGroupMember.openapi(createGroupMemberRoute,async (c) => {
  const db = getDB(c.env.DB);

  const groupId = c.req.param("groupId")
  const userId = c.req.param("userId")

  const body = c.req.valid("form");

  // Add user to group
  try {
    await db.insertInto('GroupMembers')
            .values({
              GroupId:groupId,
              userId,
              // Default to viewer for security - minimum permissions by default.
              Role: body.role || ROLES.VIEWER
            }).execute()
  } catch(error){
    return c.json({
      type:"ERROR",
      message:`Failed to add user to group.`,
    },201)
  }

  
  return c.json({
    type:"SUCCESS",
    message:`Successfully added member to group`,
  },201)
  })
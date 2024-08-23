import { Hono } from 'hono'
import { ENVS } from './environment'
import { getDB } from './external/database/db'

const app = new Hono<{ Bindings: ENVS }>()


app.get('/', async (c) => {
  const db = getDB(c.env.DB);

  const result = await db.insertInto('Users').values({
    id:"2",
    firstName:"tyler",
    lastName:"Beaumont",
  }).executeTakeFirst()

  return c.text(`Hello Hono!, ${JSON.stringify(result,(_, v) =>
    typeof v === "bigint" ? v.toString() : v,)}`)
})

export default app

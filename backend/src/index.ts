import { Hono } from 'hono'
import { ENVS } from './environment'
import { getDB } from './external/database/db'

const app = new Hono<{ Bindings: ENVS }>()


app.get('/', async (c) => {
  const db = getDB(c.env.DB);

  const result = await db.selectFrom('Users').selectAll().execute()

  return c.text(`Hello Hono!, ${JSON.stringify(result)}`)
})

export default app

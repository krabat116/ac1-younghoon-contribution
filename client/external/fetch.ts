import createClient from 'openapi-fetch'
import type { paths } from './schema'

const serverURL = 'http://10.0.2.2:8787'

export const api = createClient<paths>({ baseUrl: serverURL })

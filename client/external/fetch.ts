import createClient from "openapi-fetch";
import type { paths } from "./schema";

const serverURL = 'http://localhost:8787'

export const api = createClient<paths>({baseUrl:serverURL});
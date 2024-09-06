import { z } from "@hono/zod-openapi";


/**
 * This file contains the types of required environment variables.
 */
export type ENVS = {
  DB: D1Database;
  OBJECT_STORAGE: R2Bucket;
  R2_ACCESS_KEY_ID:string;
  R2_SECRET_ACCESS_KEY:string;
  BUCKET_NAME:string;
  ACCOUNT_ID:string;
}

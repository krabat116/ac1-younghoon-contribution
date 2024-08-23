import { DB } from 'kysely-codegen';
import { Kysely, SqliteDialect } from 'kysely'
// import Database from 'better-sqlite3'
import { D1Dialect } from 'kysely-d1'

//TODO: need to create a factory to use different adapters depending on the env state.
export type KyselyClient = Kysely<DB>;
// export const getDB = (
//     // db_name: string, 
//     // db_host:string, 
//     // db_user:string,
//     // db_pass:string,
//     // db_port:number
// ) => {
//     const dialect = new SqliteDialect({
//       database: new Database('./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/ba6c6054bf48771b6665939ab9356249a3ff4b27cb511de56f0735faa4d12766.sqlite')
//     })

//       return new Kysely<DB>({
//         dialect,
//       })
//   }

export const getDB = (
  DBBinding:D1Database
) => {
  const dialect = new D1Dialect({
      database: DBBinding
  });

    return new Kysely<DB>({
      dialect,
    })
}

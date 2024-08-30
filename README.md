# Photo-Sharing-App

The implementation for the Swinburne University Capstone Project (COS80029) group AC1.


**Team:**

* @Beauy152
* @krabat116
* @Mhnguye
* @mitchFraser11
* @Nhat1986
* @{missing}


## Repository Structure

The repository is a mono-repository style, with both frontend & backend codebases being co-located. This choice allows for improved development velocity within small teams, and allows commits to be atomic, containing all changes related to a given feature or fix across both backend & client. 

This structure also simplifies CI/CD implementations.

### API Route development & structuring

This repository uses an approach to software design & organisation known as `Vertical Slice Architecture`, the primary result of which is to prefer to co-locate relevant business logic assoicated with a given feature. 


## API Documentation

All API routes are automatically documented with openAPI compliant specifications generated thanks to an integration with `@hono/zod-openapi`, which both creates the documentation automatically, while also allowing strong typing & autocomletions.

To access the raw JSON of the openAPI definition, first [start the development server](#start-the-development-server), then nagivate to `localhost:8787/doc`.

To access a prettier GUI version of the openAPI definition using the SwaggerUI, first [start the development server](#start-the-development-server), then nagivate to `localhost:8787/ui`.


## Backend

### **Start the development server**

Since this project uses cloudflare workers, D1 & Wrangler, the development environment is very simple to setup, and a local database is automatically created. To start the development environent, run:

```bash
npm run dev
```

> **Note**: <br>D1 database is based upon SQLite, and so when running a local database a local filebased sqlite database instance is created in the directory `/backend/.wrangler/state/v3/d1/<databaseid>.sqlite` - Because of this you typically cannot connect to it using traditional database tools, but should instead use tools for accessing sqlite databases.

### Stack
This project uses the following tools & libraries for the backend:
* Cloudflare Workers - severless deployment model.
* Cloudflare D1 - serverless edge SQL database.
* Hono - Typescript framework, compatible with Cloudflare Workers.
* Kysely - SQL Query-builder.
* Wrangler - environment manager for Cloudflare worker environments. provides local development environments & DB tooling (migrations), as well as handling serverless deployments.

#### Database
Due to the way in which Cloudflare Workers operates, the way in which Database resources are used & accessed is not straight-forward. 

Initially we had planned to use planetscale, which would require the `mysql2` database dialect driver to be compatible with Kysely; However due to the contrained environment of cloudflare workers, much of the required system utilities are not available, and so cannot be used at the time of writing. This requires the use of an edge-first serverless database. While Planetscale does have this functionality, along with a serverless-db driver which can be used with kysely, there is no known method for creating a local development database for planetscale. 

However we found that Cloudflare D1 has a serverless driver compatible with kysely, and natively supports local development databases through Wrangler, and so it was chosen for use with this project. Again, it's worth noting that planetscale would have been supported, however due to the lack of a free-tier and local-development resources, it was not suitable for this project in it's current state, although if required will be easy to migrate to in the future due to Kyselys simplicity in swapping out Database drivers.

##### Migrations & Seeding
Migrations are a means to create & apply changes to a database schema in an atomic way which may be reverted if it fails. Migrations are supported using Wrangler & D1 out of the box, and since they are implemented using plain SQL files, may also be used to perform Seeding.

A given migration file is only every executed once against a database, which is tracked in a special reserved table to ensure a migration is not re-run on the same database.


---
### **Create a migration**

If a change is required to be made to the database schema, like updating a table, adding a new table, or dropping some columns, then a new migration should be created. Typically, avoid editing existing migrations, if a change way made to a table in a previous migration that now needs to be undone, simply drop the column in a new migration instead of removing it from the existing migration.

To create a new migration file, run the following command from the `/backend` directory:
```bash
npm run migration:create <migration-name>
```

This will create a new migration `.sql` file under the `/backend/migrations/` directory. There you may define your changes.

---
### **Run a migration locally**

Once a migration has been created, you will need to apply it to your local environment for testing. To do so, run the following:
```bash
npm run migration:apply
```
> **Note:** you will be prompted to accept the changes before they are applied via (y/n)


---
### **Deploy a migration to production**

Once you have verified your migration locally, you can propogate it to the production database, using:

```bash
npm run migration:deploy
```
> **Note**: you will be prompted to accept the changes before they are applied via (y/n)


## Frontend
...


## Coding Practices

### Branching Convention
...

### Naming Conventions
...
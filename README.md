# SvelteKit-Template

This template aims to serve as a boilerplate project with both Node.js and external dependencies that is easy to setup. It contains pre-configured functionality for a PostgreSQL database, Prisma ORM, authentication, testing, and more.

This project also contains pre-configured VSCode workspace settings and recommended plugins, helping developers integrate SvelteKit easily into their environment.

## Stack

- SvelteKit
- NodeJS
- Tailwind CSS
- PostgreSQL/pgAdmin (Docker)
  <<<<<<< HEAD
- Prisma ORM
- Auth.js

## Missing

- # Testing Library
- Prisma

## Missing

- Testing
- Authentication
  > > > > > > > 1cfff795e2271a08d7a3295d56d2c0bbd83f5b20

# Setup Environment

## Installing External Dependencies

Install [Node.js](https://nodejs.org/en/download/)\
Install [VSCode](https://code.visualstudio.com/) \
Install [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)

> **Note:** When Docker Desktop opens simply skip through sign up/options and start Docker engine. We will not need docker setup as we will manage it through the command line.

## Clone Project Repository

1. Open a terminal where you would like to place the project

2. Run `git clone https://github.com/username/repository` (replace with GitHub repository URL)

3. Change directory into repository (`cd project_name`) and run `code .` to open in VSCode

## Install VSCode Extensions

Install the following VSCode extensions:

- Svelte for VSCode
- Svelte Intellisense
- Svelte 3 Snippets
- Tailwind CSS Intellisense
- Prettier
- ESLint
- Prisma

Restart VSCode to ensure extensions run.

## Running External Dependencies

External dependencies such as PostgreSQL and pgAdmin will be ran in Docker containers to create a standard environment and remove the need for manual installation.

These containers can be started by executing `docker compose up -d` in the project directory and will continue running in the background. You can open the VSCode.

> **Hint:** Open integrated VSCode terminal using ctrl + `

> **Note:** If Docker throws an error, ensure you restarted your computer after installation and start Docker Desktop to run the Docker Engine.

To stop running services, run `docker-compose down` in project directory.

## Prepare Environment

Run `npm install` in project directory command to install Node dependencies.

Copy `.env.example` and rename copy to `.env` (be sure not to delete the example file). Change environmental variables as needed.

## Start Dev Server

To start the SvelteKit dev server and run dependencies, enter the following command in the project directory.

```bash
# Only needs ran if containers aren't already running
docker compose up -d

# Run dev server and open page in browser
npm run dev -- --open
```

The dev server will automatically rebuild the project and reload the page when a change is saved.

# Database

Prisma is an object relational mapper, meaning it was let us interact with the database using TypeScript objects rather than writing queries. This ensures type-safety and will avoid many errors and vulnerabilities with unsafe queries.

Prisma Schemas, similar to SQL Schemas, will generate both the database tables as well as the type-safe client object we will use in our program. They can be found in the `prisma` folder.

After updating/creating schemas first `migrate` to create the tables in the database and to create the client:

> **NOTE:** Run these after any schema changes are made.

```bash
# the name can be anything identifiable, similar to a Git commit message
npx prisma migrate dev --name name
```

If the Prisma client isn't working (missing attributes, etc.), use `npx prisma generate` to manually generate the client, though this should run automatically with the above `migrate` command.

pgAdmin, which runs alongside PostgreSQL in a Docker container, provides useful tools to manage the database.
It can be accessed in a browser at http://localhost:5050 using the email "admin@example.com" and password "admin".

Once signed in, under "Servers" select PostgreSQL and enter password "devpassword". You can now manually edit the database.

# Email

By default, Auth.js will use email to send a "magic link" to sign in, rather than password authentication (this is considered more secure, it doesn't support regular password auth by default).

In development, you can view any sent emails from MailDev by navigating to http://localhost:8080. Ensure that external dependencies (Docker containers) are running.

## Other Notes

- If you are getting odd linting errors (such as `./$types` not found) run command `npm run check` or run the dev server.

# SvelteKit-Template

This template aims to serve as a boilerplate project, with both Node.js and external dependencies, that is easy to setup. It contains pre-configured functionality for a PostgreSQL database, Prisma ORM, authentication, testing, and more.

This project also contains pre-configured VSCode workspace settings and recommended plugins, helping developers integrate SvelteKit easily into their environment.

## Stack

- SvelteKit
- NodeJS
- Tailwind CSS
- Prisma ORM
- Lucia authentication guide

## External Dependencies (Docker)

- PostgreSQL/pgAdmin Database
- Maildev SMTP (for testing email sending)

## To Be Implemented

- Testing
- File storage

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

## Setup Script

The setup batch script will automatically handle the following steps, including installing dependencies, starting Docker containers, setting environment variables, and installing VSCode extensions.

Simply run this after cloning the repository, then skip to the "Start Dev Server" step:
`./setup.bat`

> **NOTE:** This can be ran to fix many issues related to the environment or database. **By default, this will reset all docker containers (the database) and overwrite the local `.env` file.** Use flags `--keep-docker`/`-k` and `--no-env`/`-n` to keep containers and environment variables.

If you have any issues with the setup script or want more details on the project (or are not running Windows), read the following steps.

## Install VSCode Extensions

> **Hint**: You should be prompted to install these extensions when opening the workspace for the first time. Otherwise, navigate to extensions with the workpace open and search for `@recommended`.

Install the following VSCode extensions:

- Svelte for VSCode
- Svelte Intellisense
- Svelte 3 Snippets
- Tailwind CSS Intellisense
- Prettier
- ESLint
- Prisma
- npm Intellisense

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
# Only needs ran if containers aren't already running (they will be if the setup script was ran)
docker compose up -d

# Run dev server and open page in browser
npm run dev -- --open
```

The dev server will automatically rebuild the project and reload the page when a change is saved.

# Database

Prisma is an object relational mapper, meaning it was let us interact with the database using TypeScript objects rather than writing queries. This ensures type-safety and will avoid many errors and vulnerabilities with unsafe queries.

Prisma Schemas, similar to SQL Schemas, will generate both the database tables as well as the type-safe client object we will use in our program. They can be found in the `prisma` folder.

After making/pulling schema changes, `migrate` to update:

> **NOTE:** Run these after any schema changes are made or pulled from Git.

```bash
# If asked for a name, name it something identifiable, similar to a Git commit message.
npx prisma migrate dev
```

> **NOTE:** If migration fails, run `docker compose down -v` and restart the containers. **THIS WILL RESET ALL DATA IN THE DATABASE.**

If the Prisma client isn't working (missing object attributes, etc.), use `npx prisma generate` to manually generate the client, though this should run automatically with the above `migrate` command.

pgAdmin, which runs alongside PostgreSQL in a Docker container, provides useful tools to manage the database.
It can be accessed in a browser at http://localhost:5050 using the email "admin@example.com" and password "admin".

Once signed in, under "Servers" select PostgreSQL and enter password "devpassword". You can now manually edit the database.

# Email

By default, authentication will use email to send a "magic link" to sign in, rather than password authentication (passwordless and oauth is now the recommended standard).

In development, you can view any sent emails from MailDev by navigating to http://localhost:8080. Ensure that external dependencies (Docker containers) are running.

## Debugging & Errors

- If you are getting odd linting errors (such as `./$types` not found) run command `npm run check` or run the dev server.

- For **[auth] TypeError: Cannot read properties of undefined (reading 'create')** or other database errors, run `npx prisma migrate dev` to synchronize the client and DB.

- If database migrations fail to apply (and the Docker containers are running), run `docker compose down -v` to completely clear the database. This will delete all data, since this is just for development.

# TODO

- Add testing (unit and web)
- Add logger
- fix vuln: OTP can be used on different device than it was requested from

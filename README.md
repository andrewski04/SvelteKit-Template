# SvelteKit-Template

This template aims to serve as a boilerplate project, with both Node.js and external dependencies, that is easy to setup. It contains pre-configured functionality for a PostgreSQL database, Prisma ORM, authentication, testing, and more.

This project also contains pre-configured VSCode workspace settings and recommended plugins, helping developers integrate SvelteKit easily into their environment.

## Stack

- SvelteKit
- NodeJS
- Tailwind CSS
- Prisma ORM
- PostgreSQL

# Setup Environment

### Installing External Dependencies

Install [Node.js](https://nodejs.org/en/download/)\
Install [VSCode](https://code.visualstudio.com/) \
Install [Docker](https://docs.docker.com/desktop/setup/install/windows-install/)

> **Note:** After installing Docker, ensure that you restart your computer and open Docker Desktop to start the Docker Engine for the first time. After that, it will run on startup by default.

### Run the Setup Script

The setup batch script will handle installing Node dependencies, starting Docker containers, setting environment variables, initializing the database, and installing VSCode extensions.

Simply run this after cloning the repository: `./setup.bat`

> **NOTE:** This can be ran to fix many issues related to the environment or database. **By default, this will reset all docker containers (the database) and overwrite the local `.env` file.** Use flags `--docker-keep`/`-d` and `--env-keep`/`-e` to keep containers and environment variables.

Read [Development Environment Setup](docs/docs/getting-started/dev-env-setup.md) for the manual steps if you are having issues or want more details.

### Start Dev Server

To start the SvelteKit dev server and run dependencies, enter the following command while in the project root directory.

```bash
# Run containers, if not already running
docker compose up -d

# Run dev server and open page in browser
npm run dev -- --open
```

The dev server will automatically rebuild the project and reload the page when a change is saved.

## Post Setup Tips

## Debugging & Errors

- If you are getting odd linting errors (such as `./$types` not found) run command `npm run check` or run the dev server.

- For **[auth] TypeError: Cannot read properties of undefined (reading 'create')** or other database errors, run `npx prisma migrate dev` to synchronize the client and DB.

- If database migrations fail to apply (and the Docker containers are running), run `docker compose down -v` to completely clear the database. This will delete all data, since this is just for development.

# TODO

- Add testing (unit and web)
- Add logger
- fix vuln: OTP can be used on different device than it was requested from
- add auth rate limiting and IP logging
- implement front end error handling

# SvelteKit-Template

This template aims to serve as a boilerplate project with both Node.js and external dependencies that is easy to setup. It contains pre-configured functionality for a PostgreSQL database, Prisma ORM, authentication, testing, and more.

This project also contains pre-configured VSCode workspace settings and recommended plugins, helping developers integrate SvelteKit easily into their environment.

## Stack

- SvelteKit
- NodeJS
- Tailwind CSS
- PostgreSQL/pgAdmin (Docker)

## Missing

- Prisma
- Testing
- Authentication

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

Restart VSCode to ensure extensions run.

## Installing Node Dependencies

Run `npm install` in project directory command to install Node dependencies.

> **Hint:** Open integrated VSCode terminal using ctrl + `

## Running External Dependencies

External dependencies such as PostgreSQL and pgAdmin will be ran in Docker containers to create a standard environment and remove the need for manual installation.

These containers will automatically download and run when the dev server is ran (see next section) but can be manually started by running `docker compose up -d` (-d will _detach_ the container and run it in the background).

> **Note:** If Docker throws an error, ensure you restarted your computer and started Docker Desktop (should open automatically) after installation.

To stop running services, run `docker-compose down` in project directory.

## Start Dev Server:

To start the SvelteKit dev server and run dependencies, enter the following command in the project directory.

```bash
npm run dev -- --open   # (open page in browser)
```

The dev server will automatically rebuild the project and reload the page when a change is saved.

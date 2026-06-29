# SSBW

SSBW is a full-stack web project that combines a Node.js/Express application with Prisma, PostgreSQL, a React/Vite SPA, and an Astro static site.

## Features

- Product and user management through an Express backend
- Prisma ORM with PostgreSQL
- Server-rendered views with Nunjucks
- React-based SPA under the react-spa folder
- Astro-based static site under the astro-ssg folder

## Prerequisites

- Node.js 18 or newer
- npm
- Docker and Docker Compose

## Installation

1. Install the root dependencies:
   ```bash
   npm install
   ```

2. Install the frontend dependencies:
   ```bash
   cd react-spa && npm install
   cd ../astro-ssg && npm install
   ```

3. Start the PostgreSQL database:
   ```bash
   docker compose up -d
   ```

4. Create a .env file in the project root with at least:
   ```env
   DATABASE_URL="postgresql://yo:una_clave_muy_segura_123@localhost:5432/ssbw"
   SECRET_KEY="change-me"
   ```

5. Run Prisma migrations:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

## Running the app

Start the main server:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Project structure

- root: Express server and shared routes
- prisma/: Prisma schema and migrations
- routes/: API and page routes
- views/: Nunjucks templates
- react-spa/: Vite + React application
- astro-ssg/: Astro static site

## Notes

- The database is configured through Docker Compose using the service defined in docker-compose.yml.
- Seed or sample data scripts can be used from the root project files as needed.

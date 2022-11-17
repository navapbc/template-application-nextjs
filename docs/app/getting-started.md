# Getting Started

## How to Run

### Without Docker

You can run the Next.js app without docker as follows:

1. `npm install`
2. `npm run dev`
3. Navigate to `localhost:3000` in your browser to view the application

You can run storybook without docker by running:

1. `npm run storybook`
2. Navigate to `localhost:6006` in your browser to view storybook

### With Docker

The Next.js application is dockerized. Take a look at `./app/Dockerfile` to see how it works.

A `docker-compose.yml` has been included to support local development and deployment. Take a look at `./docker-compose.yml` for more information.

1. In your terminal, `cd` to this repo.
2. Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed & running.
3. Run `docker-compose up -d --build` to build the image and start the container.
4. Navigate to `localhost:3000` in your browser to view the application. Note that it takes a few minutes for the initial sass compiling to complete and load.
5. Run `docker-compose exec nextjs npm run storybook` to build and run storybook. Note that the initial sass compiling for storybook also takes a few  minutes to complete and load
6. Navigate to `localhost:6006` in your browser to view storybook.
7. Run `docker-compose down` when you are done to delete the container.

To support local development, the `docker-compose.yml` runs the `nextjs` container in development mode (i.e. `npm run dev`) instead of production mode (i.e. `npm run start`). This allows Next.js to do things like hot reload.

The docker-compose file bind mounts `app` on the host machine to `/srv` in the guest machine. However, to ensure that the container uses the correct packages in `node_modules`, we use a named docker volume for the `node_modules` dir. The named volume will take precedence over the bind mount, so that the `node_modules` dir in the guest machine will not be overwritten with the host machine's `node_modules` dir. This also means that if you run `npm install <package>` on the host machine in development (which will update `package-lock.lock`), you'll also need to run `docker-compose exec nextjs npm ci` to update `node_modules` in the guest machine.

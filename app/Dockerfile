# Use the Active LTS version of Node.
# See https://nodejs.org/en/about/releases/
FROM node:16-alpine
# Keep container packages up-to-date.
# -U runs both apk update and apk upgrade.
RUN apk -U upgrade
# Copy just the package data to the working directory.
COPY package-lock.json /srv
COPY package.json /srv
WORKDIR /srv
# Copy all the remaining application files (ignoring files in .dockerignore) to the working directory.
COPY . /srv
# Install application dependencies.
RUN npm ci
# Build the application.
RUN npm run build
# Run the application.
CMD npm run start

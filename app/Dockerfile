# Use the Active LTS version of Node.
# See https://nodejs.org/en/about/releases/
FROM node:16-alpine
# Keep container packages up-to-date.
# -U runs both apk update and apk upgrade.
RUN apk -U upgrade


# setup user stuff
ARG RUN_UID
ARG RUN_USER

# The following logic creates the RUN_USER home directory and the directory where
# we will be storing the application in the image. This runs when the user is not root
RUN : "${RUN_USER:?RUN_USER and RUN_UID need to be set and non-empty.}" && \
  [ "${RUN_USER}" = "root" ] || \
  (addgroup -S "${RUN_USER}" && adduser -S -G "${RUN_USER}" -h "/home/${RUN_USER}" -u ${RUN_UID} "${RUN_USER}" \
  && mkdir /app \
  && chown -R "${RUN_USER}:${RUN_USER}" "/home/${RUN_USER}" /app)

USER ${RUN_USER}
WORKDIR /app

# Copy all the application files (ignoring files in .dockerignore) to the working directory.
COPY --chown="${RUN_USER}:${RUN_USER}" . /app
# Install application dependencies.
RUN npm ci
# Build the application.
RUN npm run build
# Run the application.
CMD ["npm", "run", "start"]

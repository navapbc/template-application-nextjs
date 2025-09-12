# This file is largely based on the template-application-flask Dockerfile and
# Next.js Docker example: https://github.com/vercel/next.js/blob/canary/examples/with-docker-compose
# =============================================================================
FROM node:20.19.5-bullseye-slim AS base
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
COPY public ./public
COPY scripts ./scripts
RUN npm ci --no-audit

# =============================================================================
# Development stage
# =============================================================================
FROM base AS dev
WORKDIR /app

COPY tsconfig.json .
COPY *.config.[j,t]s .
COPY *.d.ts .
COPY src ./src
COPY stories ./stories
COPY .storybook ./.storybook

ENV NEXT_TELEMETRY_DISABLED=1

CMD ["npm", "run", "dev"]

# =============================================================================
# Release stage
# =============================================================================

# Build the Next.js app
# =====================================
FROM base AS builder
WORKDIR /app

COPY tsconfig.json .
COPY *.config.[j,t]s .
COPY *.d.ts .
COPY src ./src

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
# ARG ENV_VARIABLE
# ENV ENV_VARIABLE=${ENV_VARIABLE}
# ARG NEXT_PUBLIC_ENV_VARIABLE
# ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

ENV NEXT_TELEMETRY_DISABLED=1

# Skip lint because it should have happened in the CI already
RUN npm run build -- --no-lint

# Run the Next.js server
# =====================================
# Use clean image for release, excluding any unnecessary files or dependencies
FROM node:20.19.5-bullseye-slim AS release
WORKDIR /app

RUN apt-get update \
    # Install security updates
    # https://pythonspeed.com/articles/security-updates-in-docker/
    && apt-get upgrade --yes \
    # Install wget, required for health checks
    wget \
    # Reduce the image size by clearing apt cached lists
    && rm -fr /var/lib/apt/lists/* \
    # Release stage doesn't have a need for `npm`, so remove it to avoid
    # any vulnerabilities specific to NPM
    && npm uninstall -g npm \
    # Remove yarn as well (https://github.com/nodejs/docker-node/issues/777)
    && rm -rf /opt/yarn-v*\
    # Don't run production as root
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs \
    # Support <Image> cache
    && mkdir -p .next/cache/images/ \
    && chown nextjs:nodejs .next/cache/images/

USER nextjs

COPY bin/healthcheck /usr/bin/healthcheck

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
# ARG ENV_VARIABLE
# ENV ENV_VARIABLE=${ENV_VARIABLE}
# ARG NEXT_PUBLIC_ENV_VARIABLE
# ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}
ENV NEXT_TELEMETRY_DISABLED=1

# Ideally this would be something like:
#
# ENV BIND_ADDRESS=0.0.0.0
#
# once https://github.com/vercel/next.js/pull/77612 has landed. But until then,
# Next.js unfortunately uses $HOSTNAME to set its address to listen on. This is
# unfortunate because AWS ECS (running on Fargate/in awsvpc networking mode)
# sets $HOSTNAME to its internal IP/network interface, which breaks the typical
# healthcheck calls, which just look for the service running on "localhost". The
# bin/healthcheck script works around this to avoid having to do manual tweaks
# to the runtime environment, but you can set HOSTNAME=0.0.0.0 in the
# environment variables for the service yourself to override the ECS default.
#
# For simplicity, we want to set the host to 0.0.0.0 to make the server
# available external to the Docker container that it's running in. As noted
# above, this is overridden by ECS, and so is mostly for local development at
# the moment.
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]

# Dockerfile for building a production image for deployment.
# This file is largely based on the Next.js Docker example:
# https://github.com/vercel/next.js/blob/canary/examples/with-docker-compose
# =============================================================================
FROM node:18-alpine AS base

# =============================================================================
# Stage 1: Build the Next.js app
# =============================================================================
FROM base AS builder
WORKDIR /app

# 1.1: Install dependencies
COPY package.json package-lock.json ./
COPY public ./public
COPY scripts ./scripts
RUN npm ci --no-audit

# 1.2: Build the app
COPY tsconfig.json .
COPY *.config.js .
COPY *.d.ts .
COPY src ./src

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
# ARG ENV_VARIABLE
# ENV ENV_VARIABLE=${ENV_VARIABLE}
# ARG NEXT_PUBLIC_ENV_VARIABLE
# ENV NEXT_PUBLIC_ENV_VARIABLE=${NEXT_PUBLIC_ENV_VARIABLE}

ENV NEXT_TELEMETRY_DISABLED 1

# Skip lint because it should have happened in the CI already
RUN npm run build -- --no-lint

# =============================================================================
# Stage 2: Run the Next.js server
# =============================================================================
FROM base AS release
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

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
ENV NEXT_TELEMETRY_DISABLED 1

# Don't expose ports here, `compose` will handle that for us
CMD ["node", "server.js"]
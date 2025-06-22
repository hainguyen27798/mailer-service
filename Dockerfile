## Development stage
FROM node:22.16-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm --activate

# Copy package.json and yarn.lock (if available)
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install only production deps for later, keep full deps for build
RUN pnpm install --frozen-lockfile

# Copy the source code
COPY . .

# build
RUN pnpm build

## Dependencies stage
FROM node:22.16-alpine AS deps

RUN corepack enable && corepack prepare pnpm --activate

WORKDIR /app

# Run with minimal footprint
RUN apk add --no-cache tini

# Copy package.json and yarn.lock (if available)
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install only production deps for later, keep full deps for build
RUN pnpm install --frozen-lockfile --prod

# Production Stage
FROM node:22.16-alpine

# Set the working directory inside the container
WORKDIR /app

ENV NODE_ENV=prod
ENV GRPC_VERBOSITY=DEBUG
ENV GRPC_TRACE=all

# Copy bundle build
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 50051

CMD ["node", "dist/main"]

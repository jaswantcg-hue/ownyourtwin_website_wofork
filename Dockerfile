# ---- Stage 1: Build ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the SvelteKit app
RUN npm run build

# ---- Stage 2: Production ----
FROM node:22-alpine AS production

WORKDIR /app

# Copy dependency files and install production-only deps
# Copy dependency files and install production-only deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && apk add --no-cache openssl

# Copy Prisma schema + generated client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

# Copy built SvelteKit output
COPY --from=builder /app/build ./build

# Expose default SvelteKit port
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000

# Run Prisma migrations then start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node build"]

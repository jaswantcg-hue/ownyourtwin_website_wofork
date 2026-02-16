# ---- Stage 1: Build ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the SvelteKit app
RUN npm run build

# ---- Stage 2: Production ----
FROM node:22-alpine AS production

WORKDIR /app

# Copy dependency files and install production-only deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy built SvelteKit output
COPY --from=builder /app/build ./build

# Expose default SvelteKit port
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000

# Start the app
CMD ["node", "build"]

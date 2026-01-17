# Kenco Website Dockerfile
# Multi-stage build for optimized production image

# Stage 1: Build stage
FROM node:22-alpine AS builder

# Build arguments for Vite environment variables
ARG VITE_APP_TITLE
ARG VITE_APP_LOGO
ARG VITE_ANALYTICS_ENDPOINT
ARG VITE_ANALYTICS_WEBSITE_ID

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (needed for build and runtime since we use --packages=external)
RUN npm install

# Copy source code
COPY . .

# Set environment variables for build
ENV VITE_APP_TITLE=${VITE_APP_TITLE}
ENV VITE_APP_LOGO=${VITE_APP_LOGO}
ENV VITE_ANALYTICS_ENDPOINT=${VITE_ANALYTICS_ENDPOINT}
ENV VITE_ANALYTICS_WEBSITE_ID=${VITE_ANALYTICS_WEBSITE_ID}

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files and install ALL dependencies
# Note: We need all deps because esbuild uses --packages=external
COPY package*.json ./
RUN npm install

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Copy necessary runtime files
COPY drizzle ./drizzle
COPY drizzle.config.ts ./drizzle.config.ts
COPY shared ./shared

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "dist/index.js"]

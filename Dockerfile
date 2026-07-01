# Use an official Node base image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production runtime using a minimal web server
FROM node:20-alpine AS runner

WORKDIR /app

# Install simple static server
RUN npm install -g serve

# Copy build artifacts from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Run static file server
CMD ["serve", "-s", "dist", "-l", "3000"]

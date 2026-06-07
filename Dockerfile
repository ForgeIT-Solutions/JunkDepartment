# syntax=docker/dockerfile:1

# ---------- Build stage ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies against the lockfile for reproducible builds
COPY package.json package-lock.json ./
RUN npm ci

# Build the static export (next.config.ts has output: "export" -> /app/out)
COPY . .
RUN npm run build

# ---------- Serve stage ----------
FROM nginx:alpine AS runner

# Custom config handles Next.js trailingSlash routing + 404s
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static export output
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

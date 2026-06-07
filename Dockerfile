# syntax=docker/dockerfile:1

# ---------- Build stage ----------
# Debian/glibc (not alpine/musl): Next.js + Tailwind v4 native binaries have
# first-class glibc builds, avoiding the musl wasm-fallback (@emnapi) chain.
FROM node:20-slim AS builder
WORKDIR /app

# npm install (not ci): tolerates a lockfile generated on another platform and
# resolves the correct Linux binaries in-container.
COPY package.json package-lock.json ./
RUN npm install --no-audit --no-fund

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

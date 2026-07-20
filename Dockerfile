# ─────────────────────────────────────────
# STAGE 1: Builder
# ─────────────────────────────────────────
# Node.js se React app build karo
FROM node:20-alpine AS builder

WORKDIR /app

# package.json PEHLE copy karo (layer caching)
# node_modules change nahi hua → npm ci cache se
COPY package*.json ./

# npm ci vs npm install:
# ci = clean install
# → package-lock.json se exact versions install
# → Faster, deterministic, CI/CD ke liye best
RUN npm ci

# Build time environment variables
# Vite ke env vars build time pe bake ho jaate hain
# Runtime pe change nahi ho sakte
# ISLIYE ARG use karo → build time pe pass karo
ARG VITE_API_BASE_URL
ARG VITE_RAZORPAY_KEY_ID
ARG VITE_SENTRY_DSN
ARG VITE_ENV=production

# ARG ko ENV mein set karo taaki Vite read kar sake
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_RAZORPAY_KEY_ID=$VITE_RAZORPAY_KEY_ID
ENV VITE_SENTRY_DSN=$VITE_SENTRY_DSN
ENV VITE_ENV=$VITE_ENV

# Baaki files copy karo
COPY . .

# Production build
# → dist/ folder mein optimized files aayengi
# → Minified JS, CSS
# → Chunked files (lazy loading ke liye)
RUN npm run build


# ─────────────────────────────────────────
# STAGE 2: Nginx
# ─────────────────────────────────────────
# Nginx = static files serve karne ka best tool
# Node.js ki zaroorat nahi production mein
# Sirf dist/ folder aur nginx chahiye
# Image size: ~800MB (node) → ~25MB (nginx-alpine)
FROM nginx:alpine AS production

# Builder se built files copy karo
COPY --from=builder /app/dist /usr/share/nginx/html

# Custom nginx config copy karo
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# daemon off: nginx background mein nahi jaaye
# Docker ko foreground process chahiye
# Background gaya → Docker samjhega container stop ho gaya
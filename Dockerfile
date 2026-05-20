FROM node:20-alpine

# Chromium + required system libs for Puppeteer on Alpine
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    font-noto

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY api/ ./api/
COPY server.js ./
COPY docs/ ./docs/
EXPOSE 3000
CMD ["node", "server.js"]

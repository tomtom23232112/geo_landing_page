FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY api/ ./api/
COPY server.js ./
COPY docs/ ./docs/
EXPOSE 3000
CMD ["node", "server.js"]

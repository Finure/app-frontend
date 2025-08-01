FROM node:22-slim AS builder

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine AS production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactapp -u 1001

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

RUN chown -R reactapp:nodejs /app

USER reactapp

EXPOSE 3000

CMD ["serve", "-s", "dist"]

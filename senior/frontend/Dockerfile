FROM node:20-alpine AS builder

WORKDIR /app

COPY codes/package*.json ./
COPY codes/next.config.mjs ./
COPY codes/tsconfig.json ./
COPY codes/tailwind.config.ts ./
COPY codes/postcss.config.mjs ./

RUN npm install

COPY codes/ ./

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "start"]

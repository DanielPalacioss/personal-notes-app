# Etapa de build
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Genera el cliente de Prisma y compila el backend Nest
RUN npx prisma generate
RUN npm run build

# Etapa de producción
FROM node:20-alpine

WORKDIR /app

# Copia lo necesario desde la etapa anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Copia el script de arranque inteligente
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Comando de inicio del contenedor
CMD ["./entrypoint.sh"]

#!/bin/sh

echo "⏳ Esperando 25 segundos antes de iniciar..."
sleep 25

echo "🔍 Verificando si existe migración llamada 'init'..."

if [ ! -d "prisma/migrations" ] || ! ls prisma/migrations | grep -q "init"; then
  echo "📦 Migración 'init' no existe. Creando y aplicando con migrate dev..."
  npx prisma migrate dev --name init
else
  echo "✅ Migración 'init' ya existe. Saltando creación."
fi

echo "🚀 Aplicando migraciones con deploy..."
npx prisma migrate deploy

echo "🚀 Iniciando servidor NestJS..."
npm run start:prod
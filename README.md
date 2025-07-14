# Guia de paso a paso para usar la app
https://excalidraw.com/#json=rEM5myzzfFSJXYs-mMg4S,Ur0oaU2cA8DrpivPoAmhxg


# Advertencia
## Si se modifica la variable de entorno DB_PASSWORD o si tiene el puerto 1433 de la base de datos ocupado, cambiar el puerto que se expone la base de datos con el container, y cambiar la contraseña en la url y el container db_init.
## Si se va ejecutar la app en local y no en docker eliminar la linea >binaryTargets = ["native", "linux-musl-openssl-3.0.x"]< que se encuentra en el archivo prisma/schema.prisma.


# 📝 Personal Notes App

Aplicación para la gestión de notas personales con frontend en **Next.js** y backend en **NestJS**, utilizando una base de datos **SQL Server**.

## 📁 Estructura del proyecto

personal-notes-app/
├── backend/ # NestJS backend
│ └── Dockerfile
├── frontend/ # Next.js frontend
│ └── Dockerfile
├── docker-compose.yml
└── .env # Variables de entorno para Docker Compose


---

## 🚀 Ejecución con Docker Compose

### 1. Configura tu archivo `.env`

Crea un archivo `.env` en la raíz del proyecto (junto a `docker-compose.yml`):


# .env
DATABASE_URL="sqlserver://sqlserver:1433;database=personal_notes_db;user=SA;password=Luda1202*;encrypt=false;trustServerCertificate=true;"
DB_PASSWORD=Luda1202*
JWT_SECRET=Megustaelarrozconqueso1*
CORS_ORIGIN_PORT=http://localhost:3000
PORT_BACKEND=4000
PORT_FRONTEND=3000

### env de USUARIO ADMIN
ADMIN_NAME=Root
ADMIN_LASTNAME=SUPER
ADMIN_EMAIL=ADMIN@gmail.com
ADMIN_USERNAME=ADMIN
ADMIN_PASSWORD=ADMIN1202*

Puedes modificar DB_PASSWORD, PORT_BACKEND, DATABASE_URL u otros valores según tus necesidades.

# Ejecutar la app
Desde la raíz del proyecto: docker-compose up --build

## Esto hará lo siguiente:

Levantar un contenedor con SQL Server.

Inicializar la base de datos personal_notes_db si no existe.

Construir y levantar el backend en el puerto 4000.

Construir y levantar el frontend en el puerto 3000.

Accede a la app en: http://localhost:3000




# Ejecución en entorno local (sin Docker)
Puedes ejecutar el backend y el frontend localmente si ya tienes Node.js y SQL Server instalados.

# Backend (NestJS)
## 📦 Instalación

### Comandos(asegurarse de ejecutar cada comando sin excepción):
cd personal-notes-app/backend
rm -rf node_modules package-lock.json
npm install


# ⚙️ Variables de entorno
Crea un archivo .env en backend/ con los siguientes valores:

DATABASE_URL="sqlserver://localhost:1433;database=personal_notes_db;user=SA;password=Luda1202*;encrypt=false;trustServerCertificate=true;"
DB_PASSWORD=Luda1202*
JWT_SECRET=Megustaelarrozconqueso1*
CORS_ORIGIN_PORT=http://localhost:3000
PORT_BACKEND=4000

correr el comando: npx prisma generate

# ▶️ Ejecución
npm run start:dev




# Frontend (Next.js)
### 📦 Instalación

cd personal-notes-app/frontend
npm install

## ⚙️ Variables de entorno
### Crea un archivo .env en frontend/:
JWT_SECRET=Megustaelarrozconqueso1*
NEXT_PUBLIC_API_URL=http://localhost:4000

# ▶️ Ejecución
npm run dev
Accede en: http://localhost:3000


# 🐳 Notas sobre Docker
El volumen personal_notes_data asegura persistencia de datos del contenedor SQL Server.

El servicio db-init se encarga de crear la base de datos si no existe.

Puedes reiniciar todo con:
docker-compose down -v
docker-compose up --build


# 🛠️ Requisitos previos
Para desarrollo local:
Node.js 18+

Docker y Docker Compose (para opción en contenedores)

SQL Server (si no usas contenedor de base de datos)


# ✅ Estado actual
 Base de datos inicializable por Docker

 Comunicación entre frontend y backend

 Variables de entorno separadas por entorno

 Soporte para desarrollo local y en contenedor


# 📄 Licencia
MIT © 2025 - Daniel Palacios

# Personal Notes App

**Tecnologías:** TypeScript · NestJS · Next.js

Gestión de notas personales que permite a los usuarios crear, editar, eliminar y visualizar notas de forma intuitiva. Este proyecto incluye características avanzadas como autenticación basada en JWT, redireccionamiento por roles y un panel de administración para gestionar usuarios.

---

## Características principales

- **Gestión de notas:** Crear, editar, eliminar y visualizar notas.
- **Autenticación segura:** Uso de JWT y cookies.
- **Redireccionamiento por rol:** Los usuarios son dirigidos a secciones específicas según su rol.
- **Panel de administración:** Administradores pueden gestionar usuarios desde un panel intuitivo.
- **Middleware en frontend:** Implementación de middleware para proteger rutas.
- **Rutas dinámicas:** Navegación flexible en el frontend.
- **Validación de datos:** Uso de class-validator para garantizar la integridad de los datos.
- **Diseño moderno:** Interfaz desarrollada con shadcn/ui.

---

## Tecnologías utilizadas

- **Backend:** NestJS, Prisma (ORM y migraciones)
- **Frontend:** Next.js, shadcn/ui
- **Base de datos:** PostgreSQL (usando Prisma ORM)
- **Autenticación:** JSON Web Tokens (JWT) y cookies

---

## Instalación y configuración

### Requisitos previos

- Node.js (v16+)
- Docker (opcional, para despliegue rápido)

### Clonar el repositorio

```bash
git clone https://github.com/DanielPalacioss/personal-notes-app.git
cd personal-notes-app
```

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de ejemplo:

```env
# Variables para el Backend
DATABASE_URL="sqlserver://localhost:1433;database=personal_notes_db;user=SA;password=Luda1202*;encrypt=false;trustServerCertificate=true;"
JWT_SECRET=Megustaelarrozconqueso1*
CORS_ORIGIN_PORT=http://localhost:3000
PORT_BACKEND=4000
DB_PASSWORD=Luda1202*
ADMIN_NAME=Root
ADMIN_LASTNAME=SUPER
ADMIN_EMAIL=ADMIN@gmail.com
ADMIN_USERNAME=ADMIN
ADMIN_PASSWORD=ADMIN1202*

# Variables para el Frontend
JWT_SECRET=Megustaelarrozconqueso1*
NEXT_PUBLIC_API_URL=http://localhost:4000
```
> **Nota:** Estos valores son ejemplos para una configuración rápida. Puedes usarlos tal cual para pruebas locales.

---

### Instalación con Docker (recomendado)

```bash
docker-compose up --build
```

### Instalación manual

**Backend**
```bash
cd backend
npm install

# Genera el cliente de Prisma
npx prisma generate
npm run start:dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## Guía paso a paso para usar la app

Consulta la siguiente guía visual para entender rápidamente el flujo de uso de la aplicación:

[Guía Excalidraw](https://excalidraw.com/#json=rEM5myzzfFSJXYs-mMg4S,Ur0oaU2cA8DrpivPoAmhxg)

---

## Uso

1. Accede a la aplicación en [http://localhost:3000](http://localhost:3000).
2. Regístrate o inicia sesión.
3. Gestiona tus notas. Si tienes permisos de administrador, accede al panel de usuarios.

---

## Estructura del proyecto

```
personal-notes-app/
├── backend/                  # API RESTful con NestJS
│   ├── prisma/               # Esquema y migraciones de la base de datos
├── frontend/                 # Interfaz de usuario con Next.js
├── diagramas-de-secuencia/   # Diagramas .puml (crear esta carpeta y mover aquí los archivos .puml)
```

---

## Advertencias importantes

- **DB_PASSWORD y puerto de base de datos:**  
  Si modificas la variable de entorno `DB_PASSWORD` o tienes el puerto `1433` ocupado, cambia el puerto que expone la base de datos en el container y actualiza la contraseña tanto en la URL como en el container `db_init`.

- **Prisma en local:**  
  Si vas a ejecutar la app en local y no en Docker, elimina la línea  
  `binaryTargets = ["native", "linux-musl-openssl-3.0.x"]`  
  que se encuentra en el archivo `backend/prisma/schema.prisma`.

---

## Contribución

¡Contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. Crea un fork del repositorio (no necesitas activar nada, si el repo es público cualquiera puede hacerlo).
2. Clona tu fork y crea una rama para tus cambios.
3. Realiza un pull request con una descripción detallada.

---

**Autor:** Daniel Palacios  
**Repositorio:** [DanielPalacioss/personal-notes-app](https://github.com/DanielPalacioss/personal-notes-app)

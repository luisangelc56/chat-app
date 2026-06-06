# Chat UMG — Examen Programación III

Aplicación web con **React + Vite** para autenticación, envío de mensajes y visualización cronológica del chat.

## Series implementadas

| Serie | Descripción | Endpoint |
|-------|-------------|----------|
| **I** | Login con token Bearer en `localStorage` | `POST /api/login/authenticate` |
| **II** | Envío de mensajes con `Authorization: Bearer` | `POST /api/Mensajes` |
| **III** | Listado cronológico desde SQL Server | API local `GET /api/mensajes` |

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
# Frontend
npm install

# Backend (Serie III)
cd server
npm install
```

## Ejecución local

**Terminal 1 — Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 — Frontend:**
```bash
npm run dev
```

Abrir la URL que indique Vite (por defecto `http://localhost:5173`).

## Variables de entorno

Copiar `.env.example` a `.env` en la raíz y `server/.env.example` a `server/.env` si necesitas cambiar la URL del backend o credenciales de BD.

## Estructura

```
chat-app/
├── src/
│   ├── components/   # Login, MessageForm, MessageList
│   └── services/     # api.js (fetch + token)
└── server/           # Express + mssql → SQL Server
```

## Credenciales de prueba

- **Usuario:** parte del correo antes de `@miumg.edu.gt`
- **Contraseña:** `123456a`

## Autor

Luis Angel Cabrera Girón — Programación III, UMG

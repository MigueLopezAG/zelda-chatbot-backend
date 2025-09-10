# ZeldaBot Backend

Backend del chatbot de The Legend of Zelda: Breath of the Wild, construido con Node.js, Express, MongoDB y WebSockets.

## Estructura del Proyecto

```
zelda-chatbot-backend/
├── src/
│   ├── controllers/     # Controladores de la API
│   ├── models/          # Modelos de MongoDB/Mongoose
│   ├── routes/          # Rutas de Express
│   ├── services/        # Lógica
│   ├── middleware/      # Middlewares personalizados
│   ├── config/          # Configuración de base de datos
│   ├── tests/           # Pruebas unitarias
│   ├── utils/           # Base de conocimiento
│   └── app.ts           # Punto de entrada de la aplicación
├── .env                 # Variables de entorno (crear)
├── .env.test           # Variables de entorno para pruebas
└── package.json
```

## Requisitos Previos

- Node.js 16+ 
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## Instalación

1. Clona el repositorio
2. Navega al directorio del backend: `cd zelda-chatbot-backend`
3. Instala las dependencias: `npm install`

## Configuración

1. Crea un archivo `.env` en la raíz con las siguientes variables:

```
PORT=3001
MONGODB_URI=mongodb://localhost:27017/zelda-chatbot
JWT_SECRET=zelda_password_ultra_secret123456789
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

2. Para pruebas, crea un archivo `.env.test`:

```
JWT_SECRET=zelda_password_ultra_secret123456789_test
NODE_ENV=test
MONGODB_URI=mongodb://localhost:27017/zelda-chatbot-test
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## Ejecución

- Desarrollo: `npm run dev`
- Producción: 
  ```
  npm run build
  npm start
  ```

## Pruebas

Ejecuta las pruebas unitarias:

```
npm test
```

## API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Chat
- `GET /api/chat/history` - Obtener historial de chat (requiere autenticación)
- `POST /api/chat/send` - Enviar mensaje (requiere autenticación)
- `GET /api/chat/suggestions` - Obtener sugerencias de temas (requiere autenticación)

### WebSockets
El servidor también soporta WebSockets para mensajería en tiempo real. Los eventos disponibles son:
- `sendMessage` - Enviar un mensaje
- `chatMessage` - Recibir un mensaje

## Base de Conocimientos

El knowledge base está almacenado localmente en un archivo. Los datos se encuentran en `src/utils/KnowledgeBase.ts`.

Para agregar nuevas preguntas/respuestas, puedes:
1. Modificar directamente el array `knowledgeBAse` del archivo.

## Variables de Entorno

- `PORT`: Puerto del servidor (por defecto 3001)
- `MONGODB_URI`: URI de conexión a MongoDB
- `JWT_SECRET`: Secreto para firmar tokens JWT
- `NODE_ENV`: Entorno de ejecución (development, production, test)
- `FRONTEND_URL`: URL del frontend para configurar CORS

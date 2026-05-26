# 5G City — Smart Coverage Dashboard

Plataforma de visualización de cobertura 5G y eventos urbanos.
Backend Spring Boot + Firestore · Frontend React + Apollo + Leaflet.

---

## Requisitos previos

- Java 21+
- Maven 3.9+
- Node.js 20+
- Cuenta de Firebase con Firestore habilitado
- Firebase CLI (`npm install -g firebase-tools`) — para seed y reglas

---

## Estructura del proyecto

```
5G_City/
├── backend/          Spring Boot + Spring GraphQL + Firebase Admin SDK
├── frontend/         React + Apollo Client + Tailwind + React Leaflet
└── docs/             Arquitectura y ejemplos GraphQL
```

---

## Configuración de Firebase

1. Ir a Firebase Console → **Project Settings → Service Accounts**.
2. Hacer clic en **"Generate new private key"** y guardar el JSON descargado en:
   ```
   backend/src/main/resources/firebase/serviceAccount.json
   ```
3. Copiar el `projectId` del archivo descargado.

---

## Backend

### Variables de entorno

| Variable | Descripción | Default |
|---|---|---|
| `FIREBASE_PROJECT_ID` | ID del proyecto Firebase | `your-project-id` |
| `FIREBASE_CREDENTIALS_PATH` | Ruta al serviceAccount.json | (usa `GOOGLE_APPLICATION_CREDENTIALS`) |
| `CORS_ALLOWED_ORIGINS` | Origen del frontend | `http://localhost:5173` |

### Ejecutar

```bash
cd backend

# Opción A: variable de entorno
export FIREBASE_PROJECT_ID=tu-proyecto
export FIREBASE_CREDENTIALS_PATH=src/main/resources/firebase/serviceAccount.json

mvn spring-boot:run

# Opción B: pasar como argumento
mvn spring-boot:run \
  -Dspring-boot.run.jvmArguments="\
    -DFIREBASE_PROJECT_ID=tu-proyecto \
    -DFIREBASE_CREDENTIALS_PATH=src/main/resources/firebase/serviceAccount.json"
```

El servidor arranca en `http://localhost:8080`.  
GraphiQL disponible en `http://localhost:8080/graphiql`.

### Seed de datos iniciales

```bash
cd backend
node scripts/seed-firestore.js
```

### Desplegar reglas e índices Firestore

```bash
cd backend
firebase deploy --only firestore
```

---

## Frontend

### Instalar dependencias y ejecutar

```bash
cd frontend
npm install
npm run dev
```

La app abre en `http://localhost:5173`.  
El proxy de Vite redirige `/graphql` → `http://localhost:8080/graphql`.

### Build de producción

```bash
npm run build
# Output en frontend/dist/
```

---

## Uso del dashboard

1. **Sidebar izquierda** — filtros por proveedor, estado, severidad, señal mínima y texto.
2. **Mapa central** — muestra zonas (círculos), torres (📡) e incidentes (círculos con color por severidad).
3. **Panel derecho** — cards dinámicas con tabs: Todo / Zonas / Torres / Incidentes.
4. Cambiar cualquier filtro actualiza el mapa y los cards automáticamente.

---

## Endpoints

| Endpoint | Método | Descripción |
|---|---|---|
| `/graphql` | POST | API GraphQL principal |
| `/graphiql` | GET | Explorador GraphQL interactivo |
| `/actuator/health` | GET | Health check |

---

## 

| Endpoint | Método | Descripción |
|---|---|---|
| `/graphql` | POST | API GraphQL principal |
| `/graphiql` | GET | Explorador GraphQL interactivo |
| `/actuator/health` | GET | Health check |

---


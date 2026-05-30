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

## PREGUNTAS DE RUBRICA

### Explicación del patrón Observer en React (10 pts)

El **patrón Observer** define una relación de uno-a-muchos: cuando un objeto (el sujeto) cambia de estado, todos sus dependientes (observadores) son notificados automáticamente.

En React, este patrón se implementa de forma nativa con **Context API + `useState`/`useContext`**. El sujeto es el estado centralizado y los observadores son todos los componentes que lo consumen — se re-renderizan automáticamente al detectar un cambio.

**Cómo se usa en este proyecto:**

`DashboardContext.jsx` actúa como el **sujeto observable**. Almacena el estado global de filtros y visibilidad de capas:

```jsx
// frontend/src/context/DashboardContext.jsx
const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedStatus, setSelectedStatus]     = useState("");
  // ... más estado compartido

  return (
    <DashboardContext.Provider value={{ selectedProvider, setSelectedProvider, ... }}>
      {children}
    </DashboardContext.Provider>
  );
}
```

`useDashboardData.js` actúa como un **observador**: se suscribe al contexto y reacciona a cada cambio de filtro lanzando un nuevo query GraphQL:

```js
// frontend/src/hooks/useDashboardData.js
const { selectedProvider, selectedStatus, ... } = useDashboard(); // se suscribe

useEffect(() => {
  refetchCoverage({ filter: buildCoverageFilter(selectedProvider, selectedStatus, minSignalStrength) });
}, [selectedProvider, selectedStatus, minSignalStrength, refetchCoverage]);
```

Cuando el usuario cambia un filtro en la barra lateral → `setSelectedProvider(...)` actualiza el contexto → **todos los componentes suscritos** (mapa, cards, datos) se actualizan automáticamente sin comunicación directa entre ellos.

---

### Explicación del patrón Factory en React (10 pts)

El **patrón Factory** delega la decisión de qué objeto (o componente) crear a una función centralizada, en lugar de hacerlo con `if/else` repartidos por el código. El consumidor solo indica *qué* quiere, y la factory decide *cómo* construirlo.

**Cómo se usa en este proyecto:**

`CardFactory.jsx` es la factory. Recibe un objeto `item` con un campo `type` y devuelve el componente correcto sin que el consumidor sepa qué componentes existen:

```jsx
// frontend/src/components/cards/CardFactory.jsx
import CoverageCard  from "./CoverageCard";
import TowerCard     from "./TowerCard";
import IncidentCard  from "./IncidentCard";

export default function CardFactory({ item }) {
  switch (item.type) {
    case "coverage": return <CoverageCard  data={item} />;
    case "tower":    return <TowerCard     data={item} />;
    case "incident": return <IncidentCard  data={item} />;
    default:         return null;
  }
}
```

El panel de cards simplemente hace:

```jsx
items.map(item => <CardFactory key={item.id} item={item} />)
```

**Ventaja clave:** si se agrega un nuevo tipo (por ejemplo `"sensor"`), solo se modifica `CardFactory.jsx` — el resto del código no cambia. Esto aplica el principio Open/Closed: abierto a extensión, cerrado a modificación.


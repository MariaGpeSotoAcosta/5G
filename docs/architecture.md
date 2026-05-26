# Smart Coverage Dashboard — Architecture

## High-Level Overview

```
React (UI + Map + Filters)
  └─ Apollo Client (cache + queries)
        └─ POST /graphql
              └─ Spring GraphQL (resolvers)
                    └─ Service Layer (business rules)
                          └─ Firebase Admin SDK / Firestore
```

## Layer Responsibilities

| Layer | Technology | Responsibility |
|---|---|---|
| UI | React 18 + Tailwind CSS | Render map, cards, filters |
| State | React Context + hooks | Filter state, layer toggles (Observer pattern) |
| Data fetching | Apollo Client | GraphQL queries, caching, refetch on filter change |
| API | Spring Boot + Spring GraphQL | Single `POST /graphql` endpoint |
| Business logic | Spring Services | Validation, filtering rules |
| Data access | Firestore repositories | Firestore queries via Firebase Admin SDK |
| Database | Google Firestore | Persistent NoSQL document store |

## Key Design Decisions

### GraphQL-first
All reads go through a single `POST /graphql` endpoint. No REST endpoints.
Filters are applied as query arguments, executed server-side against Firestore.

### Observer Pattern (frontend)
`DashboardContext` holds all filter state. `useDashboardData` uses `useEffect`
to watch filter variables and triggers Apollo `refetch` whenever they change.

### Factory Method Pattern (frontend)
`CardFactory` decides which card component to render based on `item.type`:
- `"coverage"` → `CoverageCard`
- `"tower"` → `TowerCard`
- `"incident"` → `IncidentCard`

### Firestore Collections

| Collection | Key filters |
|---|---|
| `coverageZones` | `provider`, `status`, `signalStrength` |
| `towers` | `provider`, `status` |
| `incidents` | `severity`, text search (in-memory) |

### CORS
Only the frontend origin (`http://localhost:5173` by default) is allowed on `/graphql`.
Configured via `CORS_ALLOWED_ORIGINS` env var for production.

## Map Color Semantics

| Signal strength | Color |
|---|---|
| ≥ 75% | Green |
| 50–74% | Yellow |
| < 50% | Red |

| Severity | Color |
|---|---|
| LOW | Green |
| MEDIUM | Yellow |
| HIGH | Orange |
| CRITICAL | Red |

## Data Flow (end-to-end)

1. User adjusts filter in sidebar → `DashboardContext` state updates.
2. `useEffect` in `useDashboardData` fires → Apollo `refetch` called with new variables.
3. Spring GraphQL resolver receives query → delegates to service → calls Firestore.
4. Firestore returns documents → mapped to models → returned as GraphQL response.
5. Apollo cache updates → React re-renders map and card list.

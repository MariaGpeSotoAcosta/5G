# GraphQL Query Examples

All queries are sent as HTTP POST to `http://localhost:8080/graphql`.

You can also explore via GraphiQL at `http://localhost:8080/graphiql`.

---

## Coverage Zones

### All zones
```graphql
query {
  coverageZones {
    id
    zoneName
    signalStrength
    provider
    latitude
    longitude
    status
  }
}
```

### Filter by provider and minimum signal
```graphql
query {
  coverageZones(filter: { provider: "Movistar", minSignalStrength: 70 }) {
    zoneName
    signalStrength
    status
  }
}
```

### Filter by status
```graphql
query {
  coverageZones(filter: { status: "DEGRADED" }) {
    zoneName
    provider
    signalStrength
  }
}
```

---

## Towers

### All active towers
```graphql
query {
  towers(filter: { status: "ACTIVE" }) {
    id
    provider
    height
    latitude
    longitude
    status
  }
}
```

### Filter by provider
```graphql
query {
  towers(filter: { provider: "Claro" }) {
    provider
    height
    status
  }
}
```

---

## Incidents

### All incidents
```graphql
query {
  incidents {
    id
    title
    severity
    description
    latitude
    longitude
    createdAt
  }
}
```

### Filter by severity
```graphql
query {
  incidents(filter: { severity: "CRITICAL" }) {
    title
    severity
    description
  }
}
```

### Text search
```graphql
query {
  incidents(filter: { text: "fibra" }) {
    title
    severity
    description
  }
}
```

---

## Combined (separate queries in one request)

```graphql
query DashboardData {
  coverageZones(filter: { provider: "Movistar", minSignalStrength: 60 }) {
    zoneName
    signalStrength
    status
  }
  towers(filter: { status: "ACTIVE" }) {
    provider
    latitude
    longitude
  }
  incidents(filter: { severity: "HIGH" }) {
    title
    severity
    description
  }
}
```

---

## HTTP curl example

```bash
curl -X POST http://localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ coverageZones { id zoneName signalStrength provider status } }"
  }'
```

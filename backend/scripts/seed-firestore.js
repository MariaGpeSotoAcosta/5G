/**
 * Firestore seed script — populates initial dataset for local development.
 *
 * Usage:
 *   npm install -g firebase-tools
 *   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json
 *   node scripts/seed-firestore.js
 */

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const path = require("path");

const serviceAccount = require(path.join(
  __dirname,
  "../src/main/resources/firebase/serviceAccount.json"
));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function seed() {
  console.log("Seeding Firestore...");

  // ── Coverage Zones ──────────────────────────────────────────────────────
  const zones = [
    { zoneName: "Zona Norte", signalStrength: 85, provider: "Movistar", latitude: 4.711, longitude: -74.0721, status: "ACTIVE" },
    { zoneName: "Zona Sur",   signalStrength: 62, provider: "Claro",    latitude: 4.589, longitude: -74.1,    status: "DEGRADED" },
    { zoneName: "Zona Centro",signalStrength: 90, provider: "Movistar", latitude: 4.653, longitude: -74.082,  status: "ACTIVE" },
    { zoneName: "Zona Este",  signalStrength: 45, provider: "Tigo",     latitude: 4.701, longitude: -74.052,  status: "DOWN" },
    { zoneName: "Zona Oeste", signalStrength: 78, provider: "Claro",    latitude: 4.63,  longitude: -74.11,   status: "ACTIVE" },
    { zoneName: "Zona Chapinero", signalStrength: 88, provider: "Movistar", latitude: 4.641, longitude: -74.065, status: "ACTIVE" },
    { zoneName: "Zona Usaquén",   signalStrength: 73, provider: "Tigo",  latitude: 4.724, longitude: -74.035, status: "DEGRADED" },
    { zoneName: "Zona Kennedy",   signalStrength: 55, provider: "Claro", latitude: 4.625, longitude: -74.135, status: "DEGRADED" },
  ];

  const zonesRef = db.collection("coverageZones");
  for (const zone of zones) {
    await zonesRef.add(zone);
  }
  console.log(`  ✓ ${zones.length} coverage zones`);

  // ── Towers ──────────────────────────────────────────────────────────────
  const towers = [
    { provider: "Movistar", height: 45.0, latitude: 4.714, longitude: -74.075, status: "ACTIVE" },
    { provider: "Claro",    height: 50.0, latitude: 4.590, longitude: -74.098, status: "ACTIVE" },
    { provider: "Tigo",     height: 38.0, latitude: 4.700, longitude: -74.055, status: "MAINTENANCE" },
    { provider: "Movistar", height: 42.0, latitude: 4.648, longitude: -74.080, status: "ACTIVE" },
    { provider: "Claro",    height: 55.0, latitude: 4.632, longitude: -74.112, status: "ACTIVE" },
    { provider: "Tigo",     height: 40.0, latitude: 4.726, longitude: -74.038, status: "OFFLINE" },
    { provider: "Movistar", height: 48.0, latitude: 4.660, longitude: -74.060, status: "ACTIVE" },
  ];

  const towersRef = db.collection("towers");
  for (const tower of towers) {
    await towersRef.add(tower);
  }
  console.log(`  ✓ ${towers.length} towers`);

  // ── Incidents ────────────────────────────────────────────────────────────
  const now = new Date().toISOString().replace("Z", "");
  const incidents = [
    { title: "Interferencia en antena norte", severity: "HIGH",     latitude: 4.712, longitude: -74.073, description: "Interferencia detectada en frecuencia 3.5 GHz que afecta cobertura residencial.", createdAt: now },
    { title: "Corte de fibra sur",            severity: "CRITICAL", latitude: 4.591, longitude: -74.101, description: "Corte físico en enlace de backhaul principal. Afecta ~2000 usuarios.", createdAt: now },
    { title: "Degradación señal centro",      severity: "MEDIUM",   latitude: 4.651, longitude: -74.083, description: "Reducción de 20% en throughput promedio por congestión.", createdAt: now },
    { title: "Mantenimiento torre este",       severity: "LOW",      latitude: 4.702, longitude: -74.053, description: "Mantenimiento preventivo programado. Sin impacto en cobertura.", createdAt: now },
    { title: "Caída de nodo chapinero",       severity: "HIGH",     latitude: 4.640, longitude: -74.066, description: "Nodo caído por fallo de energía. UPS activo, estimado de restauración: 2h.", createdAt: now },
    { title: "Alerta temperatura equipo",      severity: "MEDIUM",   latitude: 4.634, longitude: -74.113, description: "Temperatura superior a umbral en rack de equipos Kennedy.", createdAt: now },
  ];

  const incidentsRef = db.collection("incidents");
  for (const incident of incidents) {
    await incidentsRef.add(incident);
  }
  console.log(`  ✓ ${incidents.length} incidents`);

  console.log("\nSeed completed successfully.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});

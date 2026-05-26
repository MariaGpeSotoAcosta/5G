import { MapContainer, TileLayer, CircleMarker, Marker, Popup, LayerGroup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useDashboard } from "../../context/DashboardContext";
import { signalColor, severityColor, statusBadgeClass, severityBadgeClass } from "../../utils/mapHelpers";

// Fix leaflet default icon paths (broken in Vite by default)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MAP_CENTER = [4.653, -74.082]; // Bogotá
const MAP_ZOOM = 12;

function CoverageLayer({ zones }) {
  return (
    <LayerGroup>
      {zones.map((zone) => (
        <CircleMarker
          key={zone.id}
          center={[zone.latitude, zone.longitude]}
          radius={18}
          pathOptions={{
            fillColor: signalColor(zone.signalStrength),
            color: signalColor(zone.signalStrength),
            fillOpacity: 0.5,
            weight: 2,
          }}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-bold text-gray-800 mb-1">{zone.zoneName}</p>
              <p className="text-sm text-gray-600">Proveedor: <strong>{zone.provider}</strong></p>
              <p className="text-sm text-gray-600">Señal: <strong>{zone.signalStrength}%</strong></p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusBadgeClass(zone.status)}`}>
                {zone.status}
              </span>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </LayerGroup>
  );
}

function TowerLayer({ towers }) {
  const towerIcon = L.divIcon({
    className: "",
    html: `<div style="
      background:#7c3aed;color:white;border-radius:50%;
      width:28px;height:28px;display:flex;align-items:center;
      justify-content:center;font-size:14px;box-shadow:0 2px 6px rgba(0,0,0,.3);
      border:2px solid white;
    ">📡</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });

  return (
    <LayerGroup>
      {towers.map((tower) => (
        <Marker key={tower.id} position={[tower.latitude, tower.longitude]} icon={towerIcon}>
          <Popup>
            <div className="min-w-[160px]">
              <p className="font-bold text-gray-800 mb-1">Torre {tower.provider}</p>
              <p className="text-sm text-gray-600">Altura: <strong>{tower.height}m</strong></p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${statusBadgeClass(tower.status)}`}>
                {tower.status}
              </span>
            </div>
          </Popup>
        </Marker>
      ))}
    </LayerGroup>
  );
}

function IncidentLayer({ incidents }) {
  return (
    <LayerGroup>
      {incidents.map((incident) => (
        <CircleMarker
          key={incident.id}
          center={[incident.latitude, incident.longitude]}
          radius={12}
          pathOptions={{
            fillColor: severityColor(incident.severity),
            color: severityColor(incident.severity),
            fillOpacity: 0.8,
            weight: 2,
          }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <p className="font-bold text-gray-800 mb-1">{incident.title}</p>
              {incident.description && (
                <p className="text-xs text-gray-600 mb-1">{incident.description}</p>
              )}
              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${severityBadgeClass(incident.severity)}`}>
                {incident.severity}
              </span>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </LayerGroup>
  );
}

export default function CoverageMap({ coverageZones, towers, incidents }) {
  const { showCoverageLayer, showTowerLayer, showIncidentLayer } = useDashboard();

  return (
    <MapContainer
      center={MAP_CENTER}
      zoom={MAP_ZOOM}
      className="w-full h-full"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {showCoverageLayer && <CoverageLayer zones={coverageZones} />}
      {showTowerLayer    && <TowerLayer towers={towers} />}
      {showIncidentLayer && <IncidentLayer incidents={incidents} />}
    </MapContainer>
  );
}

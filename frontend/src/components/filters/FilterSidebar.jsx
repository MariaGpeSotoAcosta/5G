import { useDashboard } from "../../context/DashboardContext";

const PROVIDERS = ["", "Movistar", "Claro", "Tigo"];
const ZONE_STATUSES = ["", "ACTIVE", "DEGRADED", "DOWN"];
const SEVERITIES = ["", "LOW", "MEDIUM", "HIGH", "CRITICAL"];

function Select({ label, value, onChange, options }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt || "Todos"}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FilterSidebar() {
  const {
    selectedProvider, setSelectedProvider,
    selectedStatus, setSelectedStatus,
    selectedSeverity, setSelectedSeverity,
    minSignalStrength, setMinSignalStrength,
    searchText, setSearchText,
    showCoverageLayer, setShowCoverageLayer,
    showTowerLayer, setShowTowerLayer,
    showIncidentLayer, setShowIncidentLayer,
    resetFilters,
  } = useDashboard();

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-800 text-base">Filtros</h2>
        <button
          onClick={resetFilters}
          className="text-xs text-brand-600 hover:text-brand-700 font-medium"
        >
          Limpiar
        </button>
      </div>

      {/* Text search */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Buscar incidente
        </label>
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Título o descripción..."
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>

      <Select
        label="Proveedor"
        value={selectedProvider}
        onChange={setSelectedProvider}
        options={PROVIDERS}
      />

      <Select
        label="Estado de zona"
        value={selectedStatus}
        onChange={setSelectedStatus}
        options={ZONE_STATUSES}
      />

      <Select
        label="Severidad de incidente"
        value={selectedSeverity}
        onChange={setSelectedSeverity}
        options={SEVERITIES}
      />

      {/* Signal strength slider */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
          Señal mínima: <span className="text-brand-600 font-bold">{minSignalStrength}%</span>
        </label>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={minSignalStrength}
          onChange={(e) => setMinSignalStrength(Number(e.target.value))}
          className="w-full accent-brand-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Layer toggles */}
      <div className="border-t border-gray-100 pt-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Capas del mapa
        </h3>

        {[
          { label: "Zonas de cobertura", value: showCoverageLayer, setter: setShowCoverageLayer, color: "bg-blue-500" },
          { label: "Torres",             value: showTowerLayer,    setter: setShowTowerLayer,    color: "bg-purple-500" },
          { label: "Incidentes",         value: showIncidentLayer, setter: setShowIncidentLayer, color: "bg-red-500" },
        ].map(({ label, value, setter, color }) => (
          <label key={label} className="flex items-center gap-3 mb-3 cursor-pointer group">
            <div
              className={`w-3 h-3 rounded-full flex-shrink-0 ${color} ${!value ? "opacity-30" : ""}`}
            />
            <span className={`text-sm ${value ? "text-gray-700" : "text-gray-400"}`}>{label}</span>
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => setter(e.target.checked)}
              className="ml-auto accent-brand-600"
            />
          </label>
        ))}
      </div>

      {/* Legend */}
      <div className="border-t border-gray-100 pt-4 mt-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Leyenda de señal
        </h3>
        <div className="space-y-1.5">
          {[
            { color: "bg-green-500", label: "Alta (≥75%)" },
            { color: "bg-yellow-400", label: "Media (50–74%)" },
            { color: "bg-red-500", label: "Baja (<50%)" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${color}`} />
              <span className="text-xs text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import CoverageMap from "../components/map/CoverageMap";
import CardFactory from "../components/cards/CardFactory";
import { useDashboardData } from "../hooks/useDashboardData";

const TABS = [
  { key: "all",      label: "Todo" },
  { key: "coverage", label: "Zonas" },
  { key: "tower",    label: "Torres" },
  { key: "incident", label: "Incidentes" },
];

function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
      <div className="flex gap-2 items-center text-brand-600 font-medium">
        <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        Cargando datos...
      </div>
    </div>
  );
}

function ErrorBanner({ errors }) {
  const hasError = Object.values(errors).some(Boolean);
  if (!hasError) return null;
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg mx-4 mt-2">
      Error al conectar con el servidor. Verifica que el backend esté corriendo.
    </div>
  );
}

export default function Dashboard() {
  const { coverageZones, towers, incidents, loading, errors } = useDashboardData();
  const [activeTab, setActiveTab] = useState("all");

  const allItems = [
    ...coverageZones.map((z) => ({ ...z, type: "coverage" })),
    ...towers.map((t) => ({ ...t, type: "tower" })),
    ...incidents.map((i) => ({ ...i, type: "incident" })),
  ];

  const filteredItems = activeTab === "all"
    ? allItems
    : allItems.filter((item) => item.type === activeTab);

  const counts = {
    all: allItems.length,
    coverage: coverageZones.length,
    tower: towers.length,
    incident: incidents.length,
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Map — takes most of the space */}
      <div className="relative flex-1 min-h-[50vh] lg:min-h-0">
        {loading && <LoadingOverlay />}
        <CoverageMap
          coverageZones={coverageZones}
          towers={towers}
          incidents={incidents}
        />
      </div>

      {/* Right panel — cards */}
      <div className="w-full lg:w-80 xl:w-96 flex flex-col bg-gray-50 border-l border-gray-200 overflow-hidden">
        <ErrorBanner errors={errors} />

        {/* Tab bar */}
        <div className="flex border-b border-gray-200 bg-white flex-shrink-0">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 py-2.5 text-xs font-semibold transition-colors relative
                ${activeTab === key
                  ? "text-brand-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-600"
                  : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {label}
              <span className="ml-1 text-gray-400">({counts[key]})</span>
            </button>
          ))}
        </div>

        {/* Cards list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredItems.length === 0 && !loading && (
            <div className="text-center text-gray-400 text-sm py-12">
              <div className="text-3xl mb-2">🔍</div>
              No hay resultados con los filtros actuales.
            </div>
          )}
          {filteredItems.map((item) => (
            <CardFactory key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>

        {/* Footer stats */}
        <div className="border-t border-gray-200 bg-white px-4 py-2 flex-shrink-0 text-xs text-gray-500 flex justify-between">
          <span>Zonas: <strong>{coverageZones.length}</strong></span>
          <span>Torres: <strong>{towers.length}</strong></span>
          <span>Incidentes: <strong>{incidents.length}</strong></span>
        </div>
      </div>
    </div>
  );
}

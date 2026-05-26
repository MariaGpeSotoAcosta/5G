import { createContext, useContext, useState } from "react";

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  // Filter state
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [minSignalStrength, setMinSignalStrength] = useState(0);
  const [searchText, setSearchText] = useState("");

  // Layer visibility
  const [showCoverageLayer, setShowCoverageLayer] = useState(true);
  const [showTowerLayer, setShowTowerLayer] = useState(true);
  const [showIncidentLayer, setShowIncidentLayer] = useState(true);

  // Selected item for detail view
  const [selectedItem, setSelectedItem] = useState(null);

  function resetFilters() {
    setSelectedProvider("");
    setSelectedStatus("");
    setSelectedSeverity("");
    setMinSignalStrength(0);
    setSearchText("");
  }

  return (
    <DashboardContext.Provider
      value={{
        // Filters
        selectedProvider, setSelectedProvider,
        selectedStatus, setSelectedStatus,
        selectedSeverity, setSelectedSeverity,
        minSignalStrength, setMinSignalStrength,
        searchText, setSearchText,
        resetFilters,

        // Layers
        showCoverageLayer, setShowCoverageLayer,
        showTowerLayer, setShowTowerLayer,
        showIncidentLayer, setShowIncidentLayer,

        // Selection
        selectedItem, setSelectedItem,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used inside DashboardProvider");
  return ctx;
}

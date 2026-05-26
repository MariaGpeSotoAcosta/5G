import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_COVERAGE_ZONES, GET_INCIDENTS, GET_TOWERS } from "../graphql/queries";
import { useDashboard } from "../context/DashboardContext";

function buildCoverageFilter(provider, status, minSignal) {
  const filter = {};
  if (provider) filter.provider = provider;
  if (status) filter.status = status;
  if (minSignal > 0) filter.minSignalStrength = minSignal;
  return Object.keys(filter).length ? filter : null;
}

function buildTowerFilter(provider, status) {
  const filter = {};
  if (provider) filter.provider = provider;
  if (status) filter.status = status;
  return Object.keys(filter).length ? filter : null;
}

function buildIncidentFilter(severity, text) {
  const filter = {};
  if (severity) filter.severity = severity;
  if (text) filter.text = text;
  return Object.keys(filter).length ? filter : null;
}

export function useDashboardData() {
  const {
    selectedProvider,
    selectedStatus,
    selectedSeverity,
    minSignalStrength,
    searchText,
  } = useDashboard();

  const coverageFilter = buildCoverageFilter(selectedProvider, selectedStatus, minSignalStrength);
  const towerFilter = buildTowerFilter(selectedProvider, selectedStatus);
  const incidentFilter = buildIncidentFilter(selectedSeverity, searchText);

  const {
    data: coverageData,
    loading: coverageLoading,
    error: coverageError,
    refetch: refetchCoverage,
  } = useQuery(GET_COVERAGE_ZONES, {
    variables: { filter: coverageFilter },
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: towerData,
    loading: towerLoading,
    error: towerError,
    refetch: refetchTowers,
  } = useQuery(GET_TOWERS, {
    variables: { filter: towerFilter },
    notifyOnNetworkStatusChange: true,
  });

  const {
    data: incidentData,
    loading: incidentLoading,
    error: incidentError,
    refetch: refetchIncidents,
  } = useQuery(GET_INCIDENTS, {
    variables: { filter: incidentFilter },
    notifyOnNetworkStatusChange: true,
  });

  // Observer pattern — refetch when filters change
  useEffect(() => {
    refetchCoverage({ filter: buildCoverageFilter(selectedProvider, selectedStatus, minSignalStrength) });
  }, [selectedProvider, selectedStatus, minSignalStrength, refetchCoverage]);

  useEffect(() => {
    refetchTowers({ filter: buildTowerFilter(selectedProvider, selectedStatus) });
  }, [selectedProvider, selectedStatus, refetchTowers]);

  useEffect(() => {
    refetchIncidents({ filter: buildIncidentFilter(selectedSeverity, searchText) });
  }, [selectedSeverity, searchText, refetchIncidents]);

  return {
    coverageZones: coverageData?.coverageZones ?? [],
    towers: towerData?.towers ?? [],
    incidents: incidentData?.incidents ?? [],
    loading: coverageLoading || towerLoading || incidentLoading,
    errors: { coverageError, towerError, incidentError },
  };
}

import { gql } from "@apollo/client";

export const GET_COVERAGE_ZONES = gql`
  query GetCoverageZones($filter: CoverageFilterInput) {
    coverageZones(filter: $filter) {
      id
      zoneName
      signalStrength
      provider
      latitude
      longitude
      status
    }
  }
`;

export const GET_TOWERS = gql`
  query GetTowers($filter: TowerFilterInput) {
    towers(filter: $filter) {
      id
      provider
      height
      latitude
      longitude
      status
    }
  }
`;

export const GET_INCIDENTS = gql`
  query GetIncidents($filter: IncidentFilterInput) {
    incidents(filter: $filter) {
      id
      title
      severity
      latitude
      longitude
      description
      createdAt
    }
  }
`;

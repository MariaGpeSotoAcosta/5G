/**
 * Returns a Tailwind/CSS color string based on signal strength (0-100).
 */
export function signalColor(strength) {
  if (strength >= 75) return "#22c55e"; // green-500
  if (strength >= 50) return "#eab308"; // yellow-500
  return "#ef4444";                     // red-500
}

/**
 * Returns color for zone status.
 */
export function statusColor(status) {
  switch (status?.toUpperCase()) {
    case "ACTIVE":      return "#22c55e";
    case "DEGRADED":    return "#eab308";
    case "DOWN":        return "#ef4444";
    default:            return "#6b7280";
  }
}

/**
 * Returns color for incident severity.
 */
export function severityColor(severity) {
  switch (severity?.toUpperCase()) {
    case "LOW":      return "#22c55e";
    case "MEDIUM":   return "#eab308";
    case "HIGH":     return "#f97316";
    case "CRITICAL": return "#ef4444";
    default:         return "#6b7280";
  }
}

/**
 * Returns a badge class string for severity.
 */
export function severityBadgeClass(severity) {
  switch (severity?.toUpperCase()) {
    case "LOW":      return "bg-green-100 text-green-800";
    case "MEDIUM":   return "bg-yellow-100 text-yellow-800";
    case "HIGH":     return "bg-orange-100 text-orange-800";
    case "CRITICAL": return "bg-red-100 text-red-800";
    default:         return "bg-gray-100 text-gray-800";
  }
}

/**
 * Returns a badge class string for zone/tower status.
 */
export function statusBadgeClass(status) {
  switch (status?.toUpperCase()) {
    case "ACTIVE":      return "bg-green-100 text-green-800";
    case "DEGRADED":    return "bg-yellow-100 text-yellow-800";
    case "DOWN":
    case "OFFLINE":     return "bg-red-100 text-red-800";
    case "MAINTENANCE": return "bg-blue-100 text-blue-800";
    default:            return "bg-gray-100 text-gray-800";
  }
}

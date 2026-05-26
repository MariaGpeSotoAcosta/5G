import { severityBadgeClass } from "../../utils/mapHelpers";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import clsx from "clsx";

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    return format(parseISO(dateStr), "d MMM yyyy, HH:mm", { locale: es });
  } catch {
    return dateStr;
  }
}

const SEVERITY_ICON = {
  LOW:      "🟢",
  MEDIUM:   "🟡",
  HIGH:     "🟠",
  CRITICAL: "🔴",
};

export default function IncidentCard({ data }) {
  const icon = SEVERITY_ICON[data.severity?.toUpperCase()] ?? "⚪";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2 mb-1">
        <span className="text-lg flex-shrink-0">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-semibold text-gray-800 truncate">{data.title}</span>
            <span className={clsx("px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0", severityBadgeClass(data.severity))}>
              {data.severity}
            </span>
          </div>
          {data.description && (
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{data.description}</p>
          )}
          {data.createdAt && (
            <p className="text-xs text-gray-400 mt-1">{formatDate(data.createdAt)}</p>
          )}
        </div>
      </div>
    </div>
  );
}

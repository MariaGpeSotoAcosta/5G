import { statusBadgeClass } from "../../utils/mapHelpers";
import clsx from "clsx";

export default function TowerCard({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">📡</span>
          <span className="text-base font-semibold text-gray-800">Torre {data.provider}</span>
        </div>
        <span className={clsx("px-2 py-0.5 rounded-full text-xs font-semibold", statusBadgeClass(data.status))}>
          {data.status}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <span className="text-xs text-gray-400 block">Altura</span>
          <span className="font-medium">{data.height}m</span>
        </div>
        <div>
          <span className="text-xs text-gray-400 block">Ubicación</span>
          <span className="font-medium text-xs">{data.latitude.toFixed(3)}, {data.longitude.toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
}

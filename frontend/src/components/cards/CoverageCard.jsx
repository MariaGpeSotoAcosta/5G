import { statusBadgeClass } from "../../utils/mapHelpers";
import clsx from "clsx";

function SignalBar({ strength }) {
  const color =
    strength >= 75 ? "bg-green-500"
    : strength >= 50 ? "bg-yellow-400"
    : "bg-red-500";

  return (
    <div className="mt-2">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>Señal</span>
        <span className="font-semibold">{strength}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={clsx("h-2 rounded-full transition-all", color)}
          style={{ width: `${strength}%` }}
        />
      </div>
    </div>
  );
}

export default function CoverageCard({ data }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-1">
        <span className="text-base font-semibold text-gray-800">{data.zoneName}</span>
        <span className={clsx("px-2 py-0.5 rounded-full text-xs font-semibold", statusBadgeClass(data.status))}>
          {data.status}
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-1">
        <span className="font-medium text-gray-700">{data.provider}</span>
      </p>
      <p className="text-xs text-gray-400">
        {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
      </p>
      <SignalBar strength={data.signalStrength} />
    </div>
  );
}

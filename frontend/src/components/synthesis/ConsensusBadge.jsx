import { CONSENSUS_STYLES } from "../../utils/constants";

export default function ConsensusBadge({ value }) {
  const className =
    CONSENSUS_STYLES[value] || "bg-slate-700 text-white";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-bold ${className}`}>
      {value || "unknown"}
    </span>
  );
}

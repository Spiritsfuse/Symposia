import { CLAIM_TYPE_STYLES } from "../../utils/constants";

export default function ClaimCard({ claim }) {
  const badgeClass =
    CLAIM_TYPE_STYLES[claim.claim_type] ||
    "bg-slate-100 text-slate-700 ring-slate-200";

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${badgeClass}`}
        >
          {claim.claim_type || "claim"}
        </span>
        {claim.page_number && (
          <span className="text-xs font-medium text-slate-500">
            Page {claim.page_number}
          </span>
        )}
        {claim.chunk_id && (
          <span className="text-xs font-medium text-slate-500">
            {claim.chunk_id}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-800">{claim.claim}</p>
    </article>
  );
}

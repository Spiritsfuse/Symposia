import EmptyState from "../common/EmptyState";
import ConsensusBadge from "./ConsensusBadge";

export default function SynthesisCard({ synthesis }) {
  if (!synthesis) {
    return (
      <EmptyState
        title="No synthesis yet"
        message="The generated theme and consensus strength will appear here."
      />
    );
  }

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">
            Theme
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-950">
            {synthesis.theme}
          </h3>
        </div>
        <ConsensusBadge value={synthesis.consensus} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-slate-50 p-3">
          <dt className="text-xs font-semibold text-slate-500">Consensus</dt>
          <dd className="mt-1 font-bold capitalize text-slate-900">
            {synthesis.consensus}
          </dd>
        </div>
        <div className="rounded-lg bg-slate-50 p-3">
          <dt className="text-xs font-semibold text-slate-500">Claims</dt>
          <dd className="mt-1 font-bold text-slate-900">
            {synthesis.supporting_claims ?? synthesis.claims?.length ?? 0}
          </dd>
        </div>
      </dl>

      {Boolean(synthesis.claims?.length) && (
        <ul className="mt-4 space-y-2">
          {synthesis.claims.slice(0, 5).map((claim, index) => (
            <li
              key={`${claim}-${index}`}
              className="rounded-md border border-slate-100 bg-white px-3 py-2 text-sm leading-5 text-slate-700"
            >
              {claim}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

import React from "react";
import { FileText, ArrowRight } from "lucide-react";
import { CLAIM_TYPE_STYLES } from "../../utils/constants";
import EmptyState from "../common/EmptyState";

function ClaimSearchSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
      <div className="flex gap-2">
        <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-3.5 w-4/5 animate-pulse rounded bg-slate-200" />
      </div>
      <div className="h-3.5 w-1/3 animate-pulse rounded bg-slate-200" />
    </div>
  );
}

export default function LibrarySearchList({ results = [], isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((item) => (
          <ClaimSearchSkeleton key={item} />
        ))}
      </div>
    );
  }

  if (!results.length) {
    return (
      <EmptyState
        title="No matching claims"
        message="We couldn't find any claims in your uploaded workspace papers matching this search."
      />
    );
  }

  return (
    <div className="space-y-3">
      {results.map((item) => {
        const badgeClass =
          CLAIM_TYPE_STYLES[item.claim_type] ||
          "bg-slate-100 text-slate-700 ring-slate-200";

        return (
          <article
            key={item.claim_id}
            className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:shadow transition-all"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-bold ring-1 ${badgeClass}`}
              >
                {item.claim_type}
              </span>
              <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="max-w-[150px] truncate" title={item.source_file}>
                  {item.source_file}
                </span>
              </span>
              <span className="text-xs text-slate-400">
                p. {item.page_number}
              </span>
            </div>
            
            <p className="mt-2 text-sm leading-6 font-medium text-slate-800">
              "{item.claim}"
            </p>
            
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Match Relevance</span>
              <span className="font-bold text-cyan-700">
                {item.distance !== undefined ? `${Math.max(0, Math.round((1 - item.distance) * 100))}%` : "100%"}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

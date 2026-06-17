import EmptyState from "../common/EmptyState";
import PaperCard from "./PaperCard";

function PaperSkeleton() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-3 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="mt-5 space-y-2">
        <div className="h-3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default function PaperList({ papers = [], isLoading }) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[0, 1, 2].map((item) => (
          <PaperSkeleton key={item} />
        ))}
      </div>
    );
  }

  if (!papers.length) {
    return (
      <EmptyState
        title="No papers loaded"
        message="Search for a research question to populate paper results."
      />
    );
  }

  return (
    <div className="space-y-3">
      {papers.map((paper) => (
        <PaperCard key={`${paper.title}-${paper.published}`} paper={paper} />
      ))}
    </div>
  );
}

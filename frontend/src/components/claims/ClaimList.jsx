import EmptyState from "../common/EmptyState";
import ClaimCard from "./ClaimCard";

export default function ClaimList({ claims = [] }) {
  if (!claims.length) {
    return (
      <EmptyState
        title="No claims yet"
        message="Analyze a PDF to extract findings, limitations, hypotheses, and future work."
      />
    );
  }

  return (
    <div className="space-y-3">
      {claims.map((claim, index) => (
        <ClaimCard
          key={`${claim.chunk_id || "claim"}-${index}`}
          claim={claim}
        />
      ))}
    </div>
  );
}

import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import Button from "../common/Button";

export default function PaperCard({ paper }) {
  const [expanded, setExpanded] = useState(false);
  const preview =
    paper.summary.length > 220 && !expanded
      ? `${paper.summary.slice(0, 220)}...`
      : paper.summary;

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <h3 className="text-sm font-bold leading-5 text-slate-950">
        {paper.title}
      </h3>
      <p className="mt-2 text-xs text-slate-500">
        {paper.authors.slice(0, 4).join(", ")}
        {paper.authors.length > 4 ? " et al." : ""}
      </p>
      <p className="mt-1 text-xs font-medium text-cyan-800">
        {formatDate(paper.published)}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-700">{preview}</p>
      {paper.summary.length > 220 && (
        <button
          type="button"
          className="mt-2 text-sm font-semibold text-cyan-800 hover:text-cyan-950"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Read abstract"}
        </button>
      )}
      <div className="mt-4">
        <Button
          as="a"
          variant="secondary"
          className="w-full"
          onClick={() => window.open(paper.pdf_url, "_blank", "noopener,noreferrer")}
          aria-label={`Open PDF for ${paper.title}`}
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          PDF
        </Button>
      </div>
    </article>
  );
}

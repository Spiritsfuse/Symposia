import EmptyState from "../common/EmptyState";
import BriefActions from "./BriefActions";

function renderMarkdownLine(line, index) {
  const trimmed = line.trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith("### ")) {
    return <h3 key={index}>{trimmed.replace(/^### /, "")}</h3>;
  }

  if (trimmed.startsWith("## ")) {
    return <h2 key={index}>{trimmed.replace(/^## /, "")}</h2>;
  }

  if (trimmed.startsWith("# ")) {
    return <h1 key={index}>{trimmed.replace(/^# /, "")}</h1>;
  }

  if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
    return <li key={index}>{trimmed.slice(2)}</li>;
  }

  const boldNormalized = trimmed.replace(/\*\*(.*?)\*\*/g, "$1");
  return <p key={index}>{boldNormalized}</p>;
}

export default function BriefViewer({ brief }) {
  if (!brief) {
    return (
      <EmptyState
        title="No brief yet"
        message="After analysis, the generated research brief will appear in this scrollable panel."
      />
    );
  }

  const renderedLines = brief.split("\n").map(renderMarkdownLine);

  return (
    <div className="space-y-4">
      <BriefActions brief={brief} />
      <div className="brief-markdown max-h-[520px] overflow-y-auto rounded-lg border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700">
        {renderedLines}
      </div>
    </div>
  );
}

import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { downloadFile } from "../../utils/downloadFile";
import Button from "../common/Button";

export default function BriefActions({ brief }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(brief);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function handleDownload() {
    downloadFile({
      filename: "research_brief.md",
      content: brief,
      type: "text/markdown",
    });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        onClick={handleCopy}
        disabled={!brief}
        aria-label="Copy research brief"
      >
        {copied ? (
          <Check className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Copy className="h-4 w-4" aria-hidden="true" />
        )}
        {copied ? "Copied" : "Copy"}
      </Button>
      <Button
        variant="secondary"
        onClick={handleDownload}
        disabled={!brief}
        aria-label="Download research brief as Markdown"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Download
      </Button>
    </div>
  );
}

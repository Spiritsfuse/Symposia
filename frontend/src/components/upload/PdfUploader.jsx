import { FileText, UploadCloud } from "lucide-react";
import { useRef, useState } from "react";
import Button from "../common/Button";
import ErrorBanner from "../common/ErrorBanner";
import UploadProgress from "./UploadProgress";

export default function PdfUploader({
  onAnalyze,
  isAnalyzing,
  progress,
  error,
}) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [localError, setLocalError] = useState("");

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    setLocalError("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setSelectedFile(null);
      setLocalError("Upload a PDF file.");
      return;
    }

    setSelectedFile(file);
  }

  function handleAnalyze() {
    if (!selectedFile) {
      setLocalError("Choose a PDF before starting analysis.");
      return;
    }

    onAnalyze(selectedFile);
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="pdf-upload" className="text-sm font-semibold text-slate-800">
          PDF file
        </label>
        <button
          type="button"
          className="mt-2 flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white px-4 py-8 text-center transition hover:border-cyan-500 hover:bg-cyan-50"
          onClick={() => inputRef.current?.click()}
          aria-describedby="pdf-upload-help"
        >
          <UploadCloud className="h-8 w-8 text-cyan-700" aria-hidden="true" />
          <span className="mt-3 text-sm font-semibold text-slate-900">
            {selectedFile ? selectedFile.name : "Choose PDF"}
          </span>
          <span id="pdf-upload-help" className="mt-1 text-xs text-slate-500">
            Multipart upload to /analyze-paper
          </span>
        </button>
        <input
          ref={inputRef}
          id="pdf-upload"
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={handleFileChange}
        />
      </div>

      {selectedFile && (
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          <FileText className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <span className="truncate">{selectedFile.name}</span>
        </div>
      )}

      {localError && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
          {localError}
        </div>
      )}

      <ErrorBanner error={error} title="Analysis failed" />

      <Button
        className="w-full"
        onClick={handleAnalyze}
        disabled={isAnalyzing}
      >
        <FileText className="h-4 w-4" aria-hidden="true" />
        {isAnalyzing ? "Analyzing Paper" : "Analyze Paper"}
      </Button>

      <UploadProgress progress={progress} isAnalyzing={isAnalyzing} />
    </div>
  );
}

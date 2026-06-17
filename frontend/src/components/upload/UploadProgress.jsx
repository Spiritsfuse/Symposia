import Loader from "../common/Loader";

export default function UploadProgress({ progress = 0, isAnalyzing }) {
  if (!isAnalyzing) {
    return null;
  }

  return (
    <div className="rounded-lg border border-cyan-100 bg-cyan-50 p-4">
      <div className="flex items-center justify-between gap-3">
        <Loader label="Analyzing paper and generating brief" />
        <span className="text-xs font-semibold text-cyan-900">
          {progress > 0 ? `${progress}%` : "Processing"}
        </span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-cyan-700 transition-all"
          style={{ width: `${progress || 38}%` }}
        />
      </div>
      <p className="mt-3 text-xs leading-5 text-cyan-950">
        Upload completes first; claim extraction, synthesis, and brief generation
        continue on the backend.
      </p>
    </div>
  );
}

import React from "react";
import Loader from "../common/Loader";

export default function UploadProgress({ progress = 0, isAnalyzing, stage, timeoutMessage }) {
  if (!isAnalyzing) {
    return null;
  }

  // Calculate simulated progress bar width for UX visual feedback after upload completes
  const isUploaded = progress >= 100;
  const barWidth = isUploaded ? "w-full animate-pulse bg-cyan-600" : "bg-cyan-700";

  return (
    <div className="rounded-lg border border-cyan-150 bg-cyan-50/50 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <Loader />
          <span className="text-xs font-bold text-cyan-900 tracking-tight">
            {stage || (isUploaded ? "Processing paper..." : "Uploading...")}
          </span>
        </div>
        <span className="text-xs font-extrabold text-cyan-850">
          {!isUploaded ? `${progress}%` : "Analyzing"}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barWidth}`}
          style={{ width: !isUploaded ? `${progress}%` : "100%" }}
        />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-cyan-950 font-semibold">
        {timeoutMessage}
      </p>
    </div>
  );
}

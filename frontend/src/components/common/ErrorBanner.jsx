import { AlertTriangle } from "lucide-react";
import { getApiError } from "../../services/api";

export default function ErrorBanner({ error, title = "Something went wrong" }) {
  if (!error) {
    return null;
  }

  return (
    <div
      className="flex gap-3 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-900"
      role="alert"
    >
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1">{getApiError(error)}</p>
      </div>
    </div>
  );
}

export default function EmptyState({ title, message }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="mt-1">{message}</p>
    </div>
  );
}

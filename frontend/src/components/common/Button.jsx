export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...props
}) {
  const variants = {
    primary:
      "bg-cyan-700 text-white hover:bg-cyan-800 disabled:bg-slate-300 disabled:text-slate-600",
    secondary:
      "bg-white text-slate-800 ring-1 ring-slate-200 hover:bg-slate-50 disabled:text-slate-400",
    ghost:
      "bg-transparent text-slate-700 hover:bg-slate-100 disabled:text-slate-400",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

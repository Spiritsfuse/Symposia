import { NavLink, Outlet } from "react-router-dom";
import { BookOpen } from "lucide-react";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur shadow-sm">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
          aria-label="Primary navigation"
        >
          <NavLink to="/" className="flex items-center gap-2 text-base font-extrabold text-slate-900 tracking-tight group">
            <div className="bg-cyan-700 text-white p-1.5 rounded-lg group-hover:bg-cyan-800 transition-colors">
              <BookOpen className="h-4.5 w-4.5" />
            </div>
            <span>Symposia <span className="font-medium text-xs text-cyan-700 tracking-wider uppercase ml-1.5 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-150">Engine</span></span>
          </NavLink>
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/workspace"
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? "bg-cyan-700 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              Workspace
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}

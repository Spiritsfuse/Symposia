import { NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
          aria-label="Primary navigation"
        >
          <NavLink to="/" className="text-sm font-black text-slate-950">
            AI Research Synthesis Engine
          </NavLink>
          <div className="flex items-center gap-2">
            <NavLink
              to="/workspace"
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-semibold ${
                  isActive
                    ? "bg-cyan-700 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              Workspace
            </NavLink>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

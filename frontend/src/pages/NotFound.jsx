import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-wide text-cyan-800">
        404
      </p>
      <h1 className="mt-3 text-3xl font-black text-slate-950">
        Page not found
      </h1>
      <p className="mt-3 text-slate-600">
        The page you opened is not part of the research workflow.
      </p>
      <Link to="/workspace" className="mt-6">
        <Button>Open Workspace</Button>
      </Link>
    </div>
  );
}

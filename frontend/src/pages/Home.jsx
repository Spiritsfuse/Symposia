import { ArrowRight, BrainCircuit, FileSearch, ScrollText, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/research-hero.png";
import Button from "../components/common/Button";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white flex-1 flex flex-col justify-center">
        <img
          src={heroImage}
          alt="Research workspace with papers, laptop, and synthesized insight cards"
          className="absolute inset-0 h-full w-full object-cover opacity-10 select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/90 to-cyan-950/20" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center w-full">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-900/40 px-3 py-1 text-xs font-bold text-cyan-300 ring-1 ring-inset ring-cyan-500/30 uppercase tracking-wider mb-6">
              AI-Powered Research Synthesis
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
              Symposia
            </h1>
            <p className="mt-4 text-xl text-slate-300 leading-relaxed font-light max-w-2xl">
              From dozens of research papers to one coherent, citation-traceable research brief in minutes, not weeks.
            </p>
            
            <ul className="mt-8 space-y-3.5 text-slate-300 max-w-lg">
              {[
                "Query-driven paper discovery via arXiv Integration",
                "Ingest full-text PDFs with automatic chunking",
                "Extract structured findings, hypotheses, and limitations",
                "Consensus detection and cross-paper synthesis",
                "Traceable citations linked directly to source contexts"
              ].map((feature, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm font-semibold">
                  <CheckCircle2 className="h-4.5 w-4.5 text-cyan-400 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4">
              <Link to="/workspace">
                <Button className="min-w-48 bg-cyan-600 hover:bg-cyan-700 font-bold py-3 text-sm shadow-lg hover:shadow-cyan-900/20 rounded-lg">
                  Enter Workspace
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-20 grid gap-6 sm:grid-cols-3 w-full">
            {[
              ["Discover Papers", FileSearch, "Query academic databases dynamically to build your research workspace reference list."],
              ["Extract Claims", BrainCircuit, "Analyze full PDF texts, dissecting them into findings, limitations, hypotheses, and future directions."],
              ["Synthesize Briefs", ScrollText, "Aggregate evidence across sources to uncover consensus strength and compile a formal cited brief."],
            ].map(([label, Icon, desc]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur hover:bg-slate-900/60 hover:border-slate-700/80 transition-all shadow-sm"
              >
                <div className="bg-cyan-950 text-cyan-400 p-2.5 rounded-lg w-fit">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">{label}</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

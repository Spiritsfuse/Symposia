import { ArrowRight, BrainCircuit, FileSearch, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/research-hero.png";
import Button from "../components/common/Button";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <img
          src={heroImage}
          alt="Research workspace with papers, laptop, and synthesized insight cards"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90" />
        <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              AI Research Synthesis Engine
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white">
              Discover papers, analyze PDFs, extract claims, synthesize consensus,
              and generate a polished research brief from one focused workspace.
            </p>
            <div className="mt-8">
              <Link to="/workspace">
                <Button className="min-w-44">
                  Start Research
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {[
              ["Discover", FileSearch],
              ["Analyze", BrainCircuit],
              ["Brief", ScrollText],
            ].map(([label, Icon]) => (
              <div
                key={label}
                className="rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur"
              >
                <Icon className="h-5 w-5 text-amber-300" aria-hidden="true" />
                <p className="mt-3 text-sm font-bold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useMemo, useState } from "react";
import BriefViewer from "../components/brief/BriefViewer";
import Card from "../components/common/Card";
import ErrorBanner from "../components/common/ErrorBanner";
import ClaimList from "../components/claims/ClaimList";
import PaperList from "../components/papers/PaperList";
import SearchForm from "../components/papers/SearchForm";
import SynthesisCard from "../components/synthesis/SynthesisCard";
import PdfUploader from "../components/upload/PdfUploader";
import { usePaperAnalysis } from "../hooks/usePaperAnalysis";
import { usePaperSearch } from "../hooks/usePaperSearch";
import WorkspaceLayout from "../layouts/WorkspaceLayout";

function Section({ title, description, children }) {
  return (
    <Card className="p-5 bg-white/95 backdrop-blur border border-white/20 shadow-lg">
      <div className="mb-4">
        <h2 className="text-base font-black text-slate-950">{title}</h2>
        {description && (
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        )}
      </div>
      {children}
    </Card>
  );
}

export default function Workspace() {
  const [query, setQuery] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const paperSearch = usePaperSearch(query);
  const paperAnalysis = usePaperAnalysis({
    onUploadProgress: (event) => {
      if (!event.total) {
        return;
      }

      setUploadProgress(Math.round((event.loaded * 100) / event.total));
    },
  });

  const analysis = paperAnalysis.data;
  const claims = useMemo(() => analysis?.claims || [], [analysis]);

  function handleSearch(nextQuery) {
    setQuery(nextQuery);
  }

  function handleAnalyze(file) {
    setUploadProgress(0);
    paperAnalysis.mutate(file);
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="border-b border-slate-700 bg-slate-950">
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black text-white">
            Research Workspace
          </h1>
          <p className="mt-1 text-sm text-slate-300">
            Search papers, upload a PDF, and review the generated claims,
            synthesis, and research brief without leaving the workflow.
          </p>
        </div>
      </div>

      <WorkspaceLayout
        left={
          <div className="space-y-5">
            <Section
              title="Research Paper Discovery"
              description="Search arXiv papers by research question."
            >
              <SearchForm
                onSearch={handleSearch}
                isSearching={paperSearch.isFetching}
              />
              <div className="mt-4">
                <ErrorBanner
                  error={paperSearch.error}
                  title="Paper search failed"
                />
              </div>
            </Section>
            <PaperList
              papers={paperSearch.data}
              isLoading={paperSearch.isFetching}
            />
          </div>
        }
        center={
          <div className="space-y-5">
            <Section
              title="Analyze Research Paper"
              description="Upload a PDF to run parsing, chunking, claim extraction, synthesis, and brief generation."
            >
              <PdfUploader
                onAnalyze={handleAnalyze}
                isAnalyzing={paperAnalysis.isPending}
                progress={uploadProgress}
                error={paperAnalysis.error}
              />
            </Section>
            <Section title="Extracted Claims">
              <ClaimList claims={claims} />
            </Section>
          </div>
        }
        right={
          <div className="space-y-5">
            <Section title="Synthesis Results">
              <SynthesisCard synthesis={analysis?.synthesis} />
            </Section>
            <Section title="Research Brief">
              <BriefViewer brief={analysis?.research_brief} />
            </Section>
          </div>
        }
      />
    </div>
  );
}

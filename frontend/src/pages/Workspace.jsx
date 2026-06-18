import { useMemo, useState } from "react";
import BriefViewer from "../components/brief/BriefViewer";
import Card from "../components/common/Card";
import ErrorBanner from "../components/common/ErrorBanner";
import ClaimList from "../components/claims/ClaimList";
import PaperList from "../components/papers/PaperList";
import SearchForm from "../components/papers/SearchForm";
import LibrarySearchList from "../components/papers/LibrarySearchList";
import SynthesisCard from "../components/synthesis/SynthesisCard";
import PdfUploader from "../components/upload/PdfUploader";
import { usePaperAnalysis } from "../hooks/usePaperAnalysis";
import { usePaperSearch, useLibrarySearch } from "../hooks/usePaperSearch";
import { useToast } from "../components/common/Toast";
import { getApiError } from "../services/api";
import WorkspaceLayout from "../layouts/WorkspaceLayout";

function Section({ title, description, children }) {
  return (
    <Card className="p-5 bg-white/95 backdrop-blur border border-slate-200/80 shadow-md hover:shadow-lg transition-all">
      <div className="mb-4">
        <h2 className="text-base font-bold tracking-tight text-slate-900">{title}</h2>
        {description && (
          <p className="mt-1 text-xs text-slate-500 leading-normal">{description}</p>
        )}
      </div>
      {children}
    </Card>
  );
}

export default function Workspace() {
  const [query, setQuery] = useState("");
  const [searchTab, setSearchTab] = useState("arxiv"); // "arxiv" or "library"
  const [uploadProgress, setUploadProgress] = useState(0);
  const { addToast } = useToast();

  const paperSearch = usePaperSearch(query);
  const librarySearch = useLibrarySearch(query);

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
    if (nextQuery) {
      addToast(`Searching for "${nextQuery.length > 25 ? nextQuery.slice(0, 25) + "..." : nextQuery}"`, "info", 1500);
    }
  }

  function handleAnalyze(file) {
    setUploadProgress(0);
    addToast(`Uploading and analyzing "${file.name}"...`, "info", 3000);
    
    paperAnalysis.mutate(file, {
      onSuccess: () => {
        addToast("Paper analyzed and claims extracted successfully!", "success");
      },
      onError: (err) => {
        const errMsg = getApiError(err);
        addToast(`Analysis failed: ${errMsg}`, "error");
      }
    });
  }

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen">
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Research Workspace
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Search external academic papers, analyze PDFs, and review generated claims,
            synthesis, and research briefs in one coherent workspace.
          </p>
        </div>
      </div>

      <WorkspaceLayout
        left={
          <div className="space-y-5">
            <Section
              title="Research Paper Discovery"
              description="Find papers on arXiv or search through claims in your workspace papers."
            >
              {/* Tab Navigation */}
              <div className="flex border-b border-slate-200 mb-4 bg-slate-50 p-0.5 rounded-lg">
                <button
                  type="button"
                  className={`flex-1 py-1.5 text-center text-xs font-bold rounded-md transition-all ${
                    searchTab === "arxiv"
                      ? "bg-white text-cyan-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                  }`}
                  onClick={() => {
                    setSearchTab("arxiv");
                    setQuery(""); // Clear search when switching tabs to avoid confusion
                  }}
                >
                  arXiv Search
                </button>
                <button
                  type="button"
                  className={`flex-1 py-1.5 text-center text-xs font-bold rounded-md transition-all ${
                    searchTab === "library"
                      ? "bg-white text-cyan-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
                  }`}
                  onClick={() => {
                    setSearchTab("library");
                    setQuery(""); // Clear search when switching tabs to avoid confusion
                  }}
                >
                  Workspace Papers
                </button>
              </div>

              <SearchForm
                onSearch={handleSearch}
                isSearching={searchTab === "arxiv" ? paperSearch.isFetching : librarySearch.isFetching}
              />
              
              <div className="mt-4">
                <ErrorBanner
                  error={searchTab === "arxiv" ? paperSearch.error : librarySearch.error}
                  title={searchTab === "arxiv" ? "Paper search failed" : "Library search failed"}
                />
              </div>
            </Section>

            {searchTab === "arxiv" ? (
              <PaperList
                papers={paperSearch.data}
                isLoading={paperSearch.isFetching}
              />
            ) : (
              <LibrarySearchList
                results={librarySearch.data}
                isLoading={librarySearch.isFetching}
              />
            )}
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

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Download, FileText, Sparkles, Eraser } from "lucide-react";
import { ResumeForm } from "@/components/ResumeForm";
import { ResumePreview } from "@/components/ResumePreview";
import {
  emptyResume,
  sampleResume,
  type ResumeData,
  type TemplateId,
} from "@/lib/resume-types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Inkwell — Resume Builder" },
      {
        name: "description",
        content:
          "Build a polished, professional resume in minutes. Fill in your details, pick a template, and download as PDF.",
      },
      { property: "og:title", content: "Inkwell — Resume Builder" },
      {
        property: "og:description",
        content:
          "Build a polished, professional resume in minutes. Fill in your details, pick a template, and download as PDF.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "inkwell-resume";

const templates: { id: TemplateId; label: string }[] = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
];

function loadResume(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as ResumeData;
  } catch {
    // ignore corrupt storage
  }
  return sampleResume;
}

function Index() {
  const [data, setData] = useState<ResumeData>(sampleResume);
  const [template, setTemplate] = useState<TemplateId>("classic");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(loadResume());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, hydrated]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-3 px-5 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileText className="size-4" />
            </span>
            <div>
              <h1 className="font-display text-lg font-semibold leading-none">Inkwell</h1>
              <p className="text-[11px] text-muted-foreground">Resume Builder</p>
            </div>
          </div>

          <div className="ml-auto flex flex-wrap items-center gap-2">
            <div className="flex rounded-lg border border-border bg-card p-0.5">
              {templates.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTemplate(t.id)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    template === t.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setData(sampleResume)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Sparkles className="size-3.5" /> Sample
            </button>
            <button
              type="button"
              onClick={() => setData(emptyResume)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Eraser className="size-3.5" /> Clear
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
            >
              <Download className="size-3.5" /> Download PDF
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1500px] gap-8 px-5 py-8 lg:grid-cols-[minmax(380px,460px)_1fr]">
        <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto lg:pr-1">
          <ResumeForm data={data} onChange={setData} />
        </div>
        <div className="lg:sticky lg:top-20 lg:self-start">
          <ResumePreview data={data} template={template} />
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Tip: “Download PDF” opens your browser’s print dialog — choose “Save as PDF”.
          </p>
        </div>
      </main>
    </div>
  );
}

"use client";

import type { JobRequirement, ResumeLine } from "@/lib/db/seed-data";
import { cn } from "@/lib/utils";

export type SelectedEvidence = {
  sourceType: "resume_line" | "job_requirement";
  sourceId: string;
} | null;

export function EvidencePanel({
  resumeLines,
  jobRequirements,
  selected,
}: {
  resumeLines: ResumeLine[];
  jobRequirements: JobRequirement[];
  selected: SelectedEvidence;
}) {
  return (
    <aside className="sticky top-6 max-h-[calc(100vh-3rem)] overflow-auto rounded-lg border border-zinc-200 bg-white shadow-sm max-lg:static max-lg:max-h-none">
      <div className="border-b border-zinc-200 px-5 py-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Evidence</p>
        <h2 className="mt-1 text-lg font-semibold text-zinc-950">Resume and job lines</h2>
      </div>
      <EvidenceBlock title="Resume" lines={resumeLines} selected={selected} sourceType="resume_line" />
      <EvidenceBlock title="Job requirements" lines={jobRequirements} selected={selected} sourceType="job_requirement" />
    </aside>
  );
}

function EvidenceBlock({
  title,
  lines,
  selected,
  sourceType,
}: {
  title: string;
  lines: Array<ResumeLine | JobRequirement>;
  selected: SelectedEvidence;
  sourceType: "resume_line" | "job_requirement";
}) {
  return (
    <section className="border-b border-zinc-100 p-5 last:border-b-0">
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      <div className="mt-3 space-y-2">
        {lines.map((line) => {
          const isSelected = selected?.sourceType === sourceType && selected.sourceId === line.id;
          return (
            <div
              key={line.id}
              className={cn(
                "grid grid-cols-[2.5rem_1fr] rounded-md border px-3 py-2 text-sm transition",
                isSelected ? "border-indigo-300 bg-indigo-50 text-indigo-950" : "border-transparent bg-zinc-50 text-zinc-700",
              )}
            >
              <span className="font-mono text-xs text-zinc-500">L{line.lineNumber}</span>
              <p className="leading-6">{line.content}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

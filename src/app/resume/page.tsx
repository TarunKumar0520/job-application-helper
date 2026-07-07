import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getResume } from "@/lib/db/queries";

export default function ResumePage() {
  const resume = getResume();

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-8 max-sm:px-4">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-950">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Dashboard
        </Link>
        <h1 className="mt-6 text-3xl font-semibold text-zinc-950">{resume.title}</h1>
        <p className="mt-3 leading-7 text-zinc-600">{resume.summary}</p>
        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          {resume.lines.map((line) => (
            <div key={line.id} className="grid grid-cols-[3rem_8rem_1fr] gap-3 border-b border-zinc-100 py-3 text-sm last:border-b-0 max-sm:grid-cols-[3rem_1fr]">
              <span className="font-mono text-xs text-zinc-500">L{line.lineNumber}</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-500 max-sm:hidden">{line.section}</span>
              <p className="leading-6 text-zinc-750">{line.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

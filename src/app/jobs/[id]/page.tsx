import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getJob } from "@/lib/db/queries";

export default async function JobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let job;

  try {
    job = getJob(id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-8 max-sm:px-4">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-950">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Dashboard
        </Link>
        <h1 className="mt-6 text-3xl font-semibold text-zinc-950">{job.title}</h1>
        <p className="mt-2 text-zinc-600">{job.company} · {job.location}</p>
        <p className="mt-5 leading-7 text-zinc-700">{job.description}</p>
        <div className="mt-6 rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-950">Requirements</h2>
          <div className="mt-4 space-y-3">
            {job.requirements.map((requirement) => (
              <div key={requirement.id} className="grid grid-cols-[3rem_1fr_auto] items-start gap-3 rounded-md bg-zinc-50 p-3 text-sm max-sm:grid-cols-1">
                <span className="font-mono text-xs text-zinc-500">L{requirement.lineNumber}</span>
                <p className="leading-6 text-zinc-750">{requirement.content}</p>
                <Badge tone={requirement.importance === "required" ? "high" : "medium"}>{requirement.importance}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

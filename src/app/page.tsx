import Link from "next/link";
import { ArrowRight, Database, ShieldCheck, Sparkles } from "lucide-react";
import { ApplicationList } from "@/components/applications/application-list";
import { StatCard } from "@/components/dashboard/stat-card";
import { getDashboardStats } from "@/lib/db/queries";

export default async function Home() {
  const stats = await getDashboardStats();

  return (
    <main className="min-h-screen bg-stone-50 px-6 py-8 max-sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-6 max-md:flex-col">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">Evidence-backed fit analyzer</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal text-zinc-950 max-sm:text-3xl">
              Job Application Copilot
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-650">
              A seeded full-stack demo where every AI-style recommendation links back to exact resume lines and job requirements.
            </p>
          </div>
          <Link
            href="/applications/22222222-2222-2222-2222-222222222222"
            className="inline-flex items-center gap-2 rounded-md bg-zinc-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800"
          >
            Open stretch report
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard label="Applications" value={stats.totalApplications} detail="Seeded roles for the v1 recruiter demo." />
          <StatCard label="Active" value={stats.activeApplications} detail="Saved, applied, and interviewing roles." />
          <StatCard label="Interviews" value={stats.interviews} detail="Pipeline proof without overbuilding CRM features." />
          <StatCard label="Avg. fit" value={`${stats.averageFitScore}%`} detail="Calculated from validated seeded reports." />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-zinc-950">Applications</h2>
              <Link href="/applications" className="text-sm font-medium text-indigo-700 hover:text-indigo-900">
                View all
              </Link>
            </div>
            <ApplicationList applications={stats.recentApplications} />
          </div>

          <aside className="space-y-4">
            <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                <h2 className="font-semibold text-zinc-950">Citation integrity</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Reports are validated before rendering: fit scores are bounded, findings need citations, and quoted text must match source evidence.
              </p>
            </section>
            <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                <h2 className="font-semibold text-zinc-950">Database-shaped demo</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                The local data mirrors the Drizzle schema so Supabase can become the backing store without changing the product story.
              </p>
            </section>
            <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-amber-600" aria-hidden="true" />
                <h2 className="font-semibold text-zinc-950">Mock AI boundary</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                v1 uses deterministic reports, but the provider interface is ready for a structured OpenAI provider later.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}

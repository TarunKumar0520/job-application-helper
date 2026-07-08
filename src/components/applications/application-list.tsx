import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { getApplications } from "@/lib/db/queries";

type ApplicationRow = Awaited<ReturnType<typeof getApplications>>[number];

export function ApplicationList({ applications }: { applications: ApplicationRow[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="grid grid-cols-[1.4fr_0.8fr_0.7fr_0.7fr_auto] gap-4 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500 max-md:hidden">
        <span>Role</span>
        <span>Status</span>
        <span>Fit</span>
        <span>Deadline</span>
        <span />
      </div>
      {applications.map((application) => (
        <Link
          key={application.id}
          href={`/applications/${application.id}`}
          className="grid grid-cols-[1.4fr_0.8fr_0.7fr_0.7fr_auto] items-center gap-4 border-b border-zinc-100 px-4 py-4 transition hover:bg-indigo-50/50 max-md:grid-cols-1 max-md:gap-3"
        >
          <div>
            <p className="font-semibold text-zinc-950">{application.job.title}</p>
            <p className="mt-1 text-sm text-zinc-500">{application.job.company} · {application.job.location}</p>
          </div>
          <Badge tone={application.status}>{application.status}</Badge>
          <p className="text-sm font-semibold text-zinc-800">{application.report?.fitScore ?? "-"}%</p>
          <p className="text-sm text-zinc-600">{formatDate(application.deadline)}</p>
          <ArrowRight className="h-4 w-4 text-zinc-400" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

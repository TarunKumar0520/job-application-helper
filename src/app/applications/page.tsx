import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ApplicationList } from "@/components/applications/application-list";
import { getApplications } from "@/lib/db/queries";

export default async function ApplicationsPage() {
  const applications = await getApplications();
  return (
    <main className="min-h-screen bg-stone-50 px-6 py-8 max-sm:px-4">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-950">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Dashboard
        </Link>
        <h1 className="mt-6 text-3xl font-semibold text-zinc-950">Applications</h1>
        <p className="mt-3 max-w-2xl leading-7 text-zinc-600">
          Seeded applications that prove the database model, status pipeline, fit scores, and evidence-backed report flow.
        </p>
        <div className="mt-6">
          <ApplicationList applications={applications} />
        </div>
      </div>
    </main>
  );
}

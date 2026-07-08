import { notFound } from "next/navigation";
import { ApplicationDetailClient } from "@/components/reports/application-detail-client";
import { getApplication } from "@/lib/db/queries";

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await getApplication(id);

  if (!application) {
    notFound();
  }

  return <ApplicationDetailClient application={application} />;
}

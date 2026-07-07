import { applications, jobs, reports, resume, resumeLines } from "@/lib/db/seed-data";
import { validateReportCitations } from "@/lib/ai/citation-validator";

export function getApplications() {
  return applications.map((application) => {
    const job = getJob(application.jobId);
    const report = reports.find((item) => item.applicationId === application.id);

    return {
      ...application,
      job,
      report,
    };
  });
}

export function getApplication(id: string) {
  const application = applications.find((item) => item.id === id);
  if (!application) return null;

  const job = getJob(application.jobId);
  const report = reports.find((item) => item.applicationId === application.id);

  if (report) {
    validateReportCitations(report, resumeLines, job.requirements);
  }

  return {
    ...application,
    job,
    resume,
    resumeLines,
    report,
  };
}

export function getJob(id: string) {
  const job = jobs.find((item) => item.id === id);
  if (!job) {
    throw new Error(`Job not found: ${id}`);
  }
  return job;
}

export function getResume() {
  return {
    ...resume,
    lines: resumeLines,
  };
}

export function getDashboardStats() {
  const enrichedApplications = getApplications();
  const activeApplications = enrichedApplications.filter(
    (application) => !["rejected", "offer"].includes(application.status),
  );
  const averageFitScore = Math.round(
    enrichedApplications.reduce((total, application) => total + (application.report?.fitScore ?? 0), 0) /
      enrichedApplications.length,
  );

  return {
    totalApplications: enrichedApplications.length,
    interviews: enrichedApplications.filter((application) => application.status === "interviewing").length,
    activeApplications: activeApplications.length,
    averageFitScore,
    recentApplications: enrichedApplications,
    statusCounts: applications.reduce<Record<string, number>>((counts, application) => {
      counts[application.status] = (counts[application.status] ?? 0) + 1;
      return counts;
    }, {}),
  };
}

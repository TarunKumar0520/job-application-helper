import { db } from "./index";
import * as schema from "./schema";
import { eq, inArray } from "drizzle-orm";
import { validateReportCitations } from "@/lib/ai/citation-validator";
import type { AiReport, AiFinding, Citation, ApplicationStatus, FindingType } from "@/lib/ai/types";

export async function getApplications() {
  const appRows = await db.select().from(schema.applications);
  if (appRows.length === 0) return [];

  const jobIds = appRows.map((a) => a.jobId);
  const jobRows = await db.select().from(schema.jobs).where(inArray(schema.jobs.id, jobIds));

  const appIds = appRows.map((a) => a.id);
  const reportRows = await db
    .select()
    .from(schema.aiReports)
    .where(inArray(schema.aiReports.applicationId, appIds));

  return appRows.map((app) => {
    const job = jobRows.find((j) => j.id === app.jobId);
    const reportRow = reportRows.find((r) => r.applicationId === app.id);

    return {
      id: app.id,
      jobId: app.jobId,
      resumeId: app.resumeId,
      status: app.status as ApplicationStatus,
      priority: app.priority as "low" | "medium" | "high",
      appliedAt: app.appliedAt,
      deadline: app.deadline,
      notes: app.notes,
      createdAt: app.createdAt.toISOString(),
      updatedAt: app.updatedAt.toISOString(),
      job: job
        ? {
            id: job.id,
            company: job.company,
            title: job.title,
            location: job.location,
            jobUrl: job.jobUrl,
            description: job.description,
            createdAt: job.createdAt.toISOString(),
          }
        : {
            id: app.jobId,
            company: "Unknown",
            title: "Unknown Role",
            location: "Unknown Location",
            jobUrl: "",
            description: "",
            createdAt: new Date().toISOString(),
          },
      report: reportRow
        ? {
            id: reportRow.id,
            applicationId: reportRow.applicationId,
            fitScore: reportRow.fitScore,
            summary: reportRow.summary,
            status: reportRow.status as "seeded" | "generated" | "failed",
            generatedBy: reportRow.generatedBy as "mock-provider-v1" | "openai-provider-v1",
            promptVersion: reportRow.promptVersion,
            createdAt: reportRow.createdAt.toISOString(),
            findings: [],
          }
        : undefined,
    };
  });
}

export async function getApplication(id: string) {
  const [app] = await db.select().from(schema.applications).where(eq(schema.applications.id, id)).limit(1);
  if (!app) return null;

  const job = await getJob(app.jobId);
  const resumeData = await getResume();

  const [reportRow] = await db
    .select()
    .from(schema.aiReports)
    .where(eq(schema.aiReports.applicationId, app.id))
    .limit(1);

  let report: AiReport | undefined;

  if (reportRow) {
    const findingsRows = await db
      .select()
      .from(schema.aiFindings)
      .where(eq(schema.aiFindings.reportId, reportRow.id))
      .orderBy(schema.aiFindings.displayOrder);

    let citationsRows: Array<typeof schema.citations.$inferSelect> = [];
    if (findingsRows.length > 0) {
      const findingIds = findingsRows.map((f) => f.id);
      citationsRows = await db
        .select()
        .from(schema.citations)
        .where(inArray(schema.citations.findingId, findingIds));
    }

    const findings: AiFinding[] = findingsRows.map((f) => {
      const citations: Citation[] = citationsRows
        .filter((c) => c.findingId === f.id)
        .map((c) => ({
          id: c.id,
          findingId: c.findingId,
          sourceType: c.sourceType as "resume_line" | "job_requirement",
          sourceId: c.sourceType === "resume_line" ? c.resumeLineId! : c.jobRequirementId!,
          startLine: c.startLine,
          endLine: c.endLine,
          quotedText: c.quotedText,
        }));

      return {
        id: f.id,
        reportId: f.reportId,
        type: f.type as FindingType,
        title: f.title,
        explanation: f.explanation,
        recommendation: f.recommendation,
        severity: f.severity as "low" | "medium" | "high",
        displayOrder: f.displayOrder,
        citations,
      };
    });

    report = {
      id: reportRow.id,
      applicationId: reportRow.applicationId,
      fitScore: reportRow.fitScore,
      summary: reportRow.summary,
      status: reportRow.status as "seeded" | "generated" | "failed",
      generatedBy: reportRow.generatedBy as "mock-provider-v1" | "openai-provider-v1",
      promptVersion: reportRow.promptVersion,
      createdAt: reportRow.createdAt.toISOString(),
      findings,
    };

    validateReportCitations(report, resumeData.lines, job.requirements);
  }

  return {
    id: app.id,
    jobId: app.jobId,
    resumeId: app.resumeId,
    status: app.status as ApplicationStatus,
    priority: app.priority as "low" | "medium" | "high",
    appliedAt: app.appliedAt,
    deadline: app.deadline,
    notes: app.notes,
    createdAt: app.createdAt.toISOString(),
    updatedAt: app.updatedAt.toISOString(),
    job,
    resume: {
      id: resumeData.id,
      title: resumeData.title,
      candidateName: resumeData.candidateName,
      summary: resumeData.summary,
      createdAt: resumeData.createdAt,
    },
    resumeLines: resumeData.lines,
    report,
  };
}

export async function getJob(id: string) {
  const [job] = await db.select().from(schema.jobs).where(eq(schema.jobs.id, id)).limit(1);
  if (!job) {
    throw new Error(`Job not found: ${id}`);
  }

  const reqRows = await db
    .select()
    .from(schema.jobRequirements)
    .where(eq(schema.jobRequirements.jobId, id))
    .orderBy(schema.jobRequirements.lineNumber);

  return {
    id: job.id,
    company: job.company,
    title: job.title,
    location: job.location,
    jobUrl: job.jobUrl,
    description: job.description,
    createdAt: job.createdAt.toISOString(),
    requirements: reqRows.map((req) => ({
      id: req.id,
      jobId: req.jobId,
      lineNumber: req.lineNumber,
      category: req.category,
      importance: req.importance as "required" | "preferred",
      content: req.content,
    })),
  };
}

export async function getResume() {
  const [res] = await db.select().from(schema.resumes).limit(1);
  if (!res) {
    throw new Error("No resume found in the database.");
  }

  const lineRows = await db
    .select()
    .from(schema.resumeLines)
    .where(eq(schema.resumeLines.resumeId, res.id))
    .orderBy(schema.resumeLines.lineNumber);

  return {
    id: res.id,
    title: res.title,
    candidateName: res.candidateName,
    summary: res.summary,
    createdAt: res.createdAt.toISOString(),
    lines: lineRows.map((line) => ({
      id: line.id,
      resumeId: line.resumeId,
      lineNumber: line.lineNumber,
      section: line.section,
      content: line.content,
    })),
  };
}

export async function getDashboardStats() {
  const enrichedApplications = await getApplications();
  const activeApplications = enrichedApplications.filter(
    (application) => !["rejected", "offer"].includes(application.status),
  );
  
  const applicationsWithScores = enrichedApplications.filter((app) => app.report !== undefined);
  const averageFitScore = applicationsWithScores.length > 0
    ? Math.round(
        applicationsWithScores.reduce((total, application) => total + (application.report?.fitScore ?? 0), 0) /
          applicationsWithScores.length,
      )
    : 0;

  return {
    totalApplications: enrichedApplications.length,
    interviews: enrichedApplications.filter((application) => application.status === "interviewing").length,
    activeApplications: activeApplications.length,
    averageFitScore,
    recentApplications: enrichedApplications,
    statusCounts: enrichedApplications.reduce<Record<string, number>>((counts, application) => {
      counts[application.status] = (counts[application.status] ?? 0) + 1;
      return counts;
    }, {}),
  };
}

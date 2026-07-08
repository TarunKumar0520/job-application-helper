import { config } from "dotenv";
config({ path: ".env.local" });

import { db } from "./index";
import * as schema from "./schema";
import { resume, resumeLines, jobs, applications, reports } from "./seed-data";

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Clean existing records in strict dependency order (child tables first)
  console.log("🧹 Clearing old database records...");
  await db.delete(schema.citations);
  await db.delete(schema.aiFindings);
  await db.delete(schema.aiReports);
  await db.delete(schema.applications);
  await db.delete(schema.resumeLines);
  await db.delete(schema.resumes);
  await db.delete(schema.jobRequirements);
  await db.delete(schema.jobs);
  console.log("🗑️ Database tables cleared.");

  // 2. Insert Resume
  console.log("📄 Seeding resume...");
  await db.insert(schema.resumes).values({
    id: resume.id,
    title: resume.title,
    candidateName: resume.candidateName,
    summary: resume.summary,
    createdAt: new Date(resume.createdAt),
  });

  // 3. Insert Resume Lines
  console.log("📝 Seeding resume lines...");
  await db.insert(schema.resumeLines).values(
    resumeLines.map((line) => ({
      id: line.id,
      resumeId: line.resumeId,
      lineNumber: line.lineNumber,
      section: line.section,
      content: line.content,
    }))
  );

  // 4. Insert Jobs
  console.log("💼 Seeding jobs...");
  await db.insert(schema.jobs).values(
    jobs.map((job) => ({
      id: job.id,
      company: job.company,
      title: job.title,
      location: job.location,
      jobUrl: job.jobUrl,
      description: job.description,
      createdAt: new Date(job.createdAt),
    }))
  );

  // 5. Insert Job Requirements
  console.log("📋 Seeding job requirements...");
  const allRequirements = jobs.flatMap((job) => job.requirements);
  await db.insert(schema.jobRequirements).values(
    allRequirements.map((req) => ({
      id: req.id,
      jobId: req.jobId,
      lineNumber: req.lineNumber,
      category: req.category,
      importance: req.importance,
      content: req.content,
    }))
  );

  // 6. Insert Applications
  console.log("🚀 Seeding applications...");
  await db.insert(schema.applications).values(
    applications.map((app) => ({
      id: app.id,
      jobId: app.jobId,
      resumeId: app.resumeId,
      status: app.status,
      priority: app.priority,
      appliedAt: app.appliedAt,
      deadline: app.deadline,
      notes: app.notes,
      createdAt: new Date(app.createdAt),
      updatedAt: new Date(app.updatedAt),
    }))
  );

  // 7. Extract and Seed Reports, Findings, and Citations
  console.log("📊 Seeding AI reports, findings, and citations...");
  
  const reportRows = reports.map((r) => ({
    id: r.id,
    applicationId: r.applicationId,
    fitScore: r.fitScore,
    summary: r.summary,
    status: r.status,
    generatedBy: r.generatedBy,
    promptVersion: r.promptVersion,
    createdAt: new Date(r.createdAt),
  }));
  await db.insert(schema.aiReports).values(reportRows);

  const findingRows = reports.flatMap((r) =>
    r.findings.map((f) => ({
      id: f.id,
      reportId: f.reportId,
      type: f.type,
      title: f.title,
      explanation: f.explanation,
      recommendation: f.recommendation,
      severity: f.severity,
      displayOrder: f.displayOrder,
    }))
  );
  await db.insert(schema.aiFindings).values(findingRows);

  const citationRows = reports.flatMap((r) =>
    r.findings.flatMap((f) =>
      f.citations.map((c) => ({
        id: c.id,
        findingId: c.findingId,
        sourceType: c.sourceType,
        resumeLineId: c.sourceType === "resume_line" ? c.sourceId : null,
        jobRequirementId: c.sourceType === "job_requirement" ? c.sourceId : null,
        startLine: c.startLine,
        endLine: c.endLine,
        quotedText: c.quotedText,
      }))
    )
  );
  await db.insert(schema.citations).values(citationRows);

  console.log("✨ Database successfully seeded!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});

import {
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const applicationStatus = pgEnum("application_status", [
  "saved",
  "applied",
  "interviewing",
  "offer",
  "rejected",
]);

export const priority = pgEnum("priority", ["low", "medium", "high"]);
export const requirementImportance = pgEnum("requirement_importance", ["required", "preferred"]);
export const findingType = pgEnum("finding_type", ["strength", "gap", "suggestion", "interview_prep"]);
export const severity = pgEnum("severity", ["low", "medium", "high"]);
export const reportStatus = pgEnum("report_status", ["seeded", "generated", "failed"]);
export const citationSourceType = pgEnum("citation_source_type", ["resume_line", "job_requirement"]);

export const resumes = pgTable("resumes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  candidateName: text("candidate_name").notNull(),
  summary: text("summary").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const resumeLines = pgTable("resume_lines", {
  id: uuid("id").primaryKey().defaultRandom(),
  resumeId: uuid("resume_id").references(() => resumes.id).notNull(),
  lineNumber: integer("line_number").notNull(),
  section: text("section").notNull(),
  content: text("content").notNull(),
});

export const jobs = pgTable("jobs", {
  id: uuid("id").primaryKey().defaultRandom(),
  company: text("company").notNull(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  jobUrl: text("job_url").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const jobRequirements = pgTable("job_requirements", {
  id: uuid("id").primaryKey().defaultRandom(),
  jobId: uuid("job_id").references(() => jobs.id).notNull(),
  lineNumber: integer("line_number").notNull(),
  category: text("category").notNull(),
  importance: requirementImportance("importance").notNull(),
  content: text("content").notNull(),
});

export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  jobId: uuid("job_id").references(() => jobs.id).notNull(),
  resumeId: uuid("resume_id").references(() => resumes.id).notNull(),
  status: applicationStatus("status").notNull(),
  priority: priority("priority").notNull(),
  appliedAt: date("applied_at"),
  deadline: date("deadline"),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const aiReports = pgTable("ai_reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  applicationId: uuid("application_id").references(() => applications.id).notNull(),
  fitScore: integer("fit_score").notNull(),
  summary: text("summary").notNull(),
  status: reportStatus("status").notNull(),
  generatedBy: text("generated_by").notNull(),
  promptVersion: text("prompt_version").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const aiFindings = pgTable("ai_findings", {
  id: uuid("id").primaryKey().defaultRandom(),
  reportId: uuid("report_id").references(() => aiReports.id).notNull(),
  type: findingType("type").notNull(),
  title: text("title").notNull(),
  explanation: text("explanation").notNull(),
  recommendation: text("recommendation").notNull(),
  severity: severity("severity").notNull(),
  displayOrder: integer("display_order").notNull(),
});

export const citations = pgTable("citations", {
  id: uuid("id").primaryKey().defaultRandom(),
  findingId: uuid("finding_id").references(() => aiFindings.id).notNull(),
  sourceType: citationSourceType("source_type").notNull(),
  resumeLineId: uuid("resume_line_id").references(() => resumeLines.id),
  jobRequirementId: uuid("job_requirement_id").references(() => jobRequirements.id),
  startLine: integer("start_line").notNull(),
  endLine: integer("end_line").notNull(),
  quotedText: text("quoted_text").notNull(),
});

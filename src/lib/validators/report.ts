import { z } from "zod";

export const ApplicationStatusSchema = z.enum([
  "saved",
  "applied",
  "interviewing",
  "offer",
  "rejected",
]);

export const FitScoreSchema = z.number().int().min(0).max(100);

export const CitationSchema = z.object({
  id: z.string(),
  findingId: z.string(),
  sourceType: z.enum(["resume_line", "job_requirement"]),
  sourceId: z.string(),
  startLine: z.number().int().positive(),
  endLine: z.number().int().positive(),
  quotedText: z.string().min(1),
});

export const AiFindingSchema = z.object({
  id: z.string(),
  reportId: z.string(),
  type: z.enum(["strength", "gap", "suggestion", "interview_prep"]),
  title: z.string().min(3),
  explanation: z.string().min(10),
  recommendation: z.string().min(10),
  severity: z.enum(["low", "medium", "high"]),
  displayOrder: z.number().int().nonnegative(),
  citations: z.array(CitationSchema).min(1),
});

export const AiReportSchema = z.object({
  id: z.string(),
  applicationId: z.string(),
  fitScore: FitScoreSchema,
  summary: z.string().min(10),
  status: z.enum(["seeded", "generated", "failed"]),
  generatedBy: z.enum(["mock-provider-v1", "openai-provider-v1"]),
  promptVersion: z.string().min(1),
  createdAt: z.string(),
  findings: z.array(AiFindingSchema).min(1),
});

export const CreateApplicationSchema = z.object({
  jobId: z.string(),
  resumeId: z.string(),
  status: ApplicationStatusSchema,
  priority: z.enum(["low", "medium", "high"]),
  deadline: z.string().nullable(),
  notes: z.string().max(1000).optional(),
});

export const UpdateApplicationSchema = CreateApplicationSchema.partial();

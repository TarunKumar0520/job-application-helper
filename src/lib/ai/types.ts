export type ApplicationStatus =
  | "saved"
  | "applied"
  | "interviewing"
  | "offer"
  | "rejected";

export type FindingType = "strength" | "gap" | "suggestion" | "interview_prep";
export type CitationSourceType = "resume_line" | "job_requirement";

export type GenerateFitReportInput = {
  applicationId: string;
  resumeId: string;
  jobId: string;
};

export type AiReportProvider = {
  generateFitReport(input: GenerateFitReportInput): Promise<AiReport>;
};

export type Citation = {
  id: string;
  findingId: string;
  sourceType: CitationSourceType;
  sourceId: string;
  startLine: number;
  endLine: number;
  quotedText: string;
};

export type AiFinding = {
  id: string;
  reportId: string;
  type: FindingType;
  title: string;
  explanation: string;
  recommendation: string;
  severity: "low" | "medium" | "high";
  displayOrder: number;
  citations: Citation[];
};

export type AiReport = {
  id: string;
  applicationId: string;
  fitScore: number;
  summary: string;
  status: "seeded" | "generated" | "failed";
  generatedBy: "mock-provider-v1" | "openai-provider-v1";
  promptVersion: string;
  createdAt: string;
  findings: AiFinding[];
};

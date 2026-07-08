import type { AiReport, ApplicationStatus } from "@/lib/ai/types";

export type ResumeLine = {
  id: string;
  resumeId: string;
  lineNumber: number;
  section: string;
  content: string;
};

export type JobRequirement = {
  id: string;
  jobId: string;
  lineNumber: number;
  category: string;
  importance: "required" | "preferred";
  content: string;
};

export type Job = {
  id: string;
  company: string;
  title: string;
  location: string;
  jobUrl: string;
  description: string;
  createdAt: string;
  requirements: JobRequirement[];
};

export type Application = {
  id: string;
  jobId: string;
  resumeId: string;
  status: ApplicationStatus;
  priority: "low" | "medium" | "high";
  appliedAt: string | null;
  deadline: string | null;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export const resume = {
  id: "de969f68-7c18-47fe-bb5c-4cf2ad4230ad",
  title: "Full-Stack New Grad Resume",
  candidateName: "Tarun Candidate",
  summary:
    "Full-stack software engineer focused on practical web products, data-backed features, and reliable delivery.",
  createdAt: "2026-07-01",
};

export const resumeLines: ResumeLine[] = [
  { id: "a0000000-0000-0000-0000-000000000001", resumeId: resume.id, lineNumber: 1, section: "Summary", content: "Full-stack software engineer with Java, Python, TypeScript, React, REST APIs, and SQL experience." },
  { id: "a0000000-0000-0000-0000-000000000002", resumeId: resume.id, lineNumber: 2, section: "Summary", content: "Interested in AI-assisted products, developer tooling, and reliable backend systems." },
  { id: "a0000000-0000-0000-0000-000000000003", resumeId: resume.id, lineNumber: 3, section: "Skills", content: "Languages: Java, Python, JavaScript, TypeScript, SQL." },
  { id: "a0000000-0000-0000-0000-000000000004", resumeId: resume.id, lineNumber: 4, section: "Skills", content: "Frontend: React, Angular, Tailwind CSS, accessible component systems." },
  { id: "a0000000-0000-0000-0000-000000000005", resumeId: resume.id, lineNumber: 5, section: "Skills", content: "Backend: REST APIs, Node.js, Express, PostgreSQL, schema design, validation." },
  { id: "a0000000-0000-0000-0000-000000000006", resumeId: resume.id, lineNumber: 6, section: "Skills", content: "Tools: Docker, Jenkins pipelines, GitHub Actions, AWS fundamentals." },
  { id: "a0000000-0000-0000-0000-000000000007", resumeId: resume.id, lineNumber: 7, section: "Project", content: "Built a full-stack job tracking dashboard with TypeScript, Postgres, and evidence-backed reports." },
  { id: "a0000000-0000-0000-0000-000000000008", resumeId: resume.id, lineNumber: 8, section: "Project", content: "Modeled applications, jobs, resume lines, AI findings, and citations as relational data." },
  { id: "a0000000-0000-0000-0000-000000000009", resumeId: resume.id, lineNumber: 9, section: "Project", content: "Implemented Zod validation for structured report payloads and citation integrity checks." },
  { id: "a0000000-0000-0000-0000-000000000010", resumeId: resume.id, lineNumber: 10, section: "Experience", content: "Created Java REST endpoints backed by PostgreSQL tables and request validation." },
  { id: "a0000000-0000-0000-0000-000000000011", resumeId: resume.id, lineNumber: 11, section: "Experience", content: "Improved React dashboard loading states, empty states, and reusable table components." },
  { id: "a0000000-0000-0000-0000-000000000012", resumeId: resume.id, lineNumber: 12, section: "Experience", content: "Maintained Jenkins CI jobs for tests and Docker image builds in a class team project." },
  { id: "a0000000-0000-0000-0000-000000000013", resumeId: resume.id, lineNumber: 13, section: "Experience", content: "Deployed coursework projects to AWS-managed services, but did not own production operations." },
  { id: "a0000000-0000-0000-0000-000000000014", resumeId: resume.id, lineNumber: 14, section: "Coursework", content: "Completed AI/ML coursework using Python, embeddings concepts, LangChain prototypes, and OpenAI-style structured outputs." },
];

export const jobs: Job[] = [
  {
    id: "f0000000-0000-0000-0000-000000000001",
    company: "Northstar Health",
    title: "Full-Stack Software Engineer",
    location: "Remote",
    jobUrl: "https://example.com/jobs/fullstack",
    description: "Build patient operations tools across React, Node, PostgreSQL, and internal workflow systems.",
    createdAt: "2026-07-01",
    requirements: [
      { id: "b0000000-0000-0000-0000-000000000001", jobId: "f0000000-0000-0000-0000-000000000001", lineNumber: 1, category: "frontend", importance: "required", content: "Build production React interfaces with clear loading and empty states." },
      { id: "b0000000-0000-0000-0000-000000000002", jobId: "f0000000-0000-0000-0000-000000000001", lineNumber: 2, category: "backend", importance: "required", content: "Design REST APIs and relational PostgreSQL schemas." },
      { id: "b0000000-0000-0000-0000-000000000003", jobId: "f0000000-0000-0000-0000-000000000001", lineNumber: 3, category: "quality", importance: "preferred", content: "Use TypeScript validation to keep server and UI contracts consistent." },
      { id: "b0000000-0000-0000-0000-000000000004", jobId: "f0000000-0000-0000-0000-000000000001", lineNumber: 4, category: "delivery", importance: "preferred", content: "Contribute to CI/CD workflows and deployment reliability." },
    ],
  },
  {
    id: "f0000000-0000-0000-0000-000000000002",
    company: "Atlas Cloud Labs",
    title: "Junior Cloud Engineer",
    location: "New York, NY",
    jobUrl: "https://example.com/jobs/cloud",
    description: "Support cloud deployment pipelines, observability, and AWS infrastructure improvements.",
    createdAt: "2026-07-01",
    requirements: [
      { id: "b0000000-0000-0000-0000-000000000005", jobId: "f0000000-0000-0000-0000-000000000002", lineNumber: 1, category: "cloud", importance: "required", content: "Own AWS deployment workflows for production services." },
      { id: "b0000000-0000-0000-0000-000000000006", jobId: "f0000000-0000-0000-0000-000000000002", lineNumber: 2, category: "delivery", importance: "required", content: "Maintain CI/CD pipelines and troubleshoot failed builds." },
      { id: "b0000000-0000-0000-0000-000000000007", jobId: "f0000000-0000-0000-0000-000000000002", lineNumber: 3, category: "operations", importance: "required", content: "Monitor service health, incidents, and reliability metrics." },
      { id: "b0000000-0000-0000-0000-000000000008", jobId: "f0000000-0000-0000-0000-000000000002", lineNumber: 4, category: "containerization", importance: "preferred", content: "Package services with Docker and document release steps." },
    ],
  },
  {
    id: "f0000000-0000-0000-0000-000000000003",
    company: "BrightHire Tools",
    title: "AI Application Engineer",
    location: "Hybrid",
    jobUrl: "https://example.com/jobs/ai-app",
    description: "Ship AI-assisted workflow features with structured outputs, retrieval, and explainable user experiences.",
    createdAt: "2026-07-01",
    requirements: [
      { id: "b0000000-0000-0000-0000-000000000009", jobId: "f0000000-0000-0000-0000-000000000003", lineNumber: 1, category: "ai", importance: "required", content: "Build AI-assisted product features that cite or explain source evidence." },
      { id: "b0000000-0000-0000-0000-000000000010", jobId: "f0000000-0000-0000-0000-000000000003", lineNumber: 2, category: "backend", importance: "required", content: "Design data models for structured AI outputs and validation." },
      { id: "b0000000-0000-0000-0000-000000000011", jobId: "f0000000-0000-0000-0000-000000000003", lineNumber: 3, category: "frontend", importance: "preferred", content: "Create polished review interfaces for generated recommendations." },
      { id: "b0000000-0000-0000-0000-000000000012", jobId: "f0000000-0000-0000-0000-000000000003", lineNumber: 4, category: "ml", importance: "preferred", content: "Experience with embeddings, retrieval, LangChain, or OpenAI APIs." },
    ],
  },
];

export const applications: Application[] = [
  { id: "11111111-1111-1111-1111-111111111111", jobId: "f0000000-0000-0000-0000-000000000001", resumeId: resume.id, status: "interviewing", priority: "high", appliedAt: "2026-07-02", deadline: "2026-07-15", notes: "Strong full-stack match. Use as primary demo path.", createdAt: "2026-07-02", updatedAt: "2026-07-05" },
  { id: "22222222-2222-2222-2222-222222222222", jobId: "f0000000-0000-0000-0000-000000000002", resumeId: resume.id, status: "applied", priority: "medium", appliedAt: "2026-07-03", deadline: "2026-07-20", notes: "Stretch role because production cloud ownership is thin.", createdAt: "2026-07-03", updatedAt: "2026-07-04" },
  { id: "33333333-3333-3333-3333-333333333333", jobId: "f0000000-0000-0000-0000-000000000003", resumeId: resume.id, status: "saved", priority: "high", appliedAt: null, deadline: "2026-07-24", notes: "Good product angle, needs stronger real AI deployment evidence.", createdAt: "2026-07-04", updatedAt: "2026-07-04" },
];

export const reports: AiReport[] = [
  {
    id: "d1111111-1111-1111-1111-111111111111",
    applicationId: "11111111-1111-1111-1111-111111111111",
    fitScore: 88,
    summary: "Strong fit for a junior full-stack role because the resume shows React, REST APIs, PostgreSQL, TypeScript, validation, and delivery awareness.",
    status: "seeded",
    generatedBy: "mock-provider-v1",
    promptVersion: "seeded-demo-v1",
    createdAt: "2026-07-05",
    findings: [
      {
        id: "e1111111-1111-1111-1111-111111111111",
        reportId: "d1111111-1111-1111-1111-111111111111",
        type: "strength",
        title: "Full-stack evidence is specific",
        explanation: "The role asks for React interfaces and relational backend work. The resume names both frontend delivery and PostgreSQL-backed REST APIs.",
        recommendation: "Lead with the full-stack project and mention validation plus schema design in the first interview answer.",
        severity: "low",
        displayOrder: 1,
        citations: [
          { id: "c0000000-0000-0000-0000-000000000001", findingId: "e1111111-1111-1111-1111-111111111111", sourceType: "job_requirement", sourceId: "b0000000-0000-0000-0000-000000000001", startLine: 1, endLine: 1, quotedText: "Build production React interfaces with clear loading and empty states." },
          { id: "c0000000-0000-0000-0000-000000000002", findingId: "e1111111-1111-1111-1111-111111111111", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000011", startLine: 11, endLine: 11, quotedText: "Improved React dashboard loading states, empty states, and reusable table components." },
          { id: "c0000000-0000-0000-0000-000000000003", findingId: "e1111111-1111-1111-1111-111111111111", sourceType: "job_requirement", sourceId: "b0000000-0000-0000-0000-000000000002", startLine: 2, endLine: 2, quotedText: "Design REST APIs and relational PostgreSQL schemas." },
          { id: "c0000000-0000-0000-0000-000000000004", findingId: "e1111111-1111-1111-1111-111111111111", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000010", startLine: 10, endLine: 10, quotedText: "Created Java REST endpoints backed by PostgreSQL tables and request validation." },
        ],
      },
      {
        id: "e1111111-1111-1111-1111-111111111112",
        reportId: "d1111111-1111-1111-1111-111111111111",
        type: "gap",
        title: "Deployment ownership is present but light",
        explanation: "The job prefers CI/CD and deployment reliability. The resume mentions Jenkins and AWS fundamentals, but not recurring ownership of production releases.",
        recommendation: "Add one bullet that says what was deployed, how often, and what reliability improvement resulted.",
        severity: "medium",
        displayOrder: 2,
        citations: [
          { id: "c0000000-0000-0000-0000-000000000005", findingId: "e1111111-1111-1111-1111-111111111112", sourceType: "job_requirement", sourceId: "b0000000-0000-0000-0000-000000000004", startLine: 4, endLine: 4, quotedText: "Contribute to CI/CD workflows and deployment reliability." },
          { id: "c0000000-0000-0000-0000-000000000006", findingId: "e1111111-1111-1111-1111-111111111112", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000012", startLine: 12, endLine: 12, quotedText: "Maintained Jenkins CI jobs for tests and Docker image builds in a class team project." },
          { id: "c0000000-0000-0000-0000-000000000007", findingId: "e1111111-1111-1111-1111-111111111112", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000013", startLine: 13, endLine: 13, quotedText: "Deployed coursework projects to AWS-managed services, but did not own production operations." },
        ],
      },
      {
        id: "e1111111-1111-1111-1111-111111111113",
        reportId: "d1111111-1111-1111-1111-111111111111",
        type: "interview_prep",
        title: "Prepare a schema design story",
        explanation: "This role will likely probe whether the backend work involved real modeling decisions, not only endpoint wiring.",
        recommendation: "Be ready to explain why applications, reports, findings, and citations are separate tables.",
        severity: "low",
        displayOrder: 3,
        citations: [
          { id: "c0000000-0000-0000-0000-000000000008", findingId: "e1111111-1111-1111-1111-111111111113", sourceType: "job_requirement", sourceId: "b0000000-0000-0000-0000-000000000002", startLine: 2, endLine: 2, quotedText: "Design REST APIs and relational PostgreSQL schemas." },
          { id: "c0000000-0000-0000-0000-000000000009", findingId: "e1111111-1111-1111-1111-111111111113", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000008", startLine: 8, endLine: 8, quotedText: "Modeled applications, jobs, resume lines, AI findings, and citations as relational data." },
        ],
      },
    ],
  },
  {
    id: "d2222222-2222-2222-2222-222222222222",
    applicationId: "22222222-2222-2222-2222-222222222222",
    fitScore: 61,
    summary: "Medium stretch fit: CI/CD and Docker evidence exists, but the job asks for production cloud ownership and operations depth.",
    status: "seeded",
    generatedBy: "mock-provider-v1",
    promptVersion: "seeded-demo-v1",
    createdAt: "2026-07-05",
    findings: [
      {
        id: "e2222222-2222-2222-2222-222222222221",
        reportId: "d2222222-2222-2222-2222-222222222222",
        type: "gap",
        title: "Production operations evidence is missing",
        explanation: "The job requires monitoring service health and incidents. The resume shows deployment coursework, but not operational ownership.",
        recommendation: "Add a small project or bullet around uptime checks, incident notes, metrics, or alerting to close this gap.",
        severity: "high",
        displayOrder: 1,
        citations: [
          { id: "c0000000-0000-0000-0000-000000000010", findingId: "e2222222-2222-2222-2222-222222222221", sourceType: "job_requirement", sourceId: "b0000000-0000-0000-0000-000000000007", startLine: 3, endLine: 3, quotedText: "Monitor service health, incidents, and reliability metrics." },
          { id: "c0000000-0000-0000-0000-000000000011", findingId: "e2222222-2222-2222-2222-222222222221", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000013", startLine: 13, endLine: 13, quotedText: "Deployed coursework projects to AWS-managed services, but did not own production operations." },
        ],
      },
      {
        id: "e2222222-2222-2222-2222-222222222222",
        reportId: "d2222222-2222-2222-2222-222222222222",
        type: "strength",
        title: "CI/CD foundation is useful",
        explanation: "The Jenkins and Docker experience maps to the pipeline maintenance part of the role.",
        recommendation: "Frame this as a foundation and be direct that production ownership is your growth area.",
        severity: "low",
        displayOrder: 2,
        citations: [
          { id: "c0000000-0000-0000-0000-000000000012", findingId: "e2222222-2222-2222-2222-222222222222", sourceType: "job_requirement", sourceId: "b0000000-0000-0000-0000-000000000006", startLine: 2, endLine: 2, quotedText: "Maintain CI/CD pipelines and troubleshoot failed builds." },
          { id: "c0000000-0000-0000-0000-000000000013", findingId: "e2222222-2222-2222-2222-222222222222", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000012", startLine: 12, endLine: 12, quotedText: "Maintained Jenkins CI jobs for tests and Docker image builds in a class team project." },
        ],
      },
    ],
  },
  {
    id: "d3333333-3333-3333-3333-333333333333",
    applicationId: "33333333-3333-3333-3333-333333333333",
    fitScore: 78,
    summary: "Good fit for AI application work because the strongest evidence is product-oriented AI structure, validation, and source-backed recommendations.",
    status: "seeded",
    generatedBy: "mock-provider-v1",
    promptVersion: "seeded-demo-v1",
    createdAt: "2026-07-05",
    findings: [
      {
        id: "e3333333-3333-3333-3333-333333333331",
        reportId: "d3333333-3333-3333-3333-333333333333",
        type: "strength",
        title: "Evidence-backed AI UX matches the role",
        explanation: "The role wants AI features that explain source evidence. The resume project is built around evidence-backed reports and citations.",
        recommendation: "Show the citation click workflow early in the demo because it maps directly to the role.",
        severity: "low",
        displayOrder: 1,
        citations: [
          { id: "c0000000-0000-0000-0000-000000000014", findingId: "e3333333-3333-3333-3333-333333333331", sourceType: "job_requirement", sourceId: "b0000000-0000-0000-0000-000000000009", startLine: 1, endLine: 1, quotedText: "Build AI-assisted product features that cite or explain source evidence." },
          { id: "c0000000-0000-0000-0000-000000000015", findingId: "e3333333-3333-3333-3333-333333333331", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000007", startLine: 7, endLine: 7, quotedText: "Built a full-stack job tracking dashboard with TypeScript, Postgres, and evidence-backed reports." },
          { id: "c0000000-0000-0000-0000-000000000016", findingId: "e3333333-3333-3333-3333-333333333331", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000009", startLine: 9, endLine: 9, quotedText: "Implemented Zod validation for structured report payloads and citation integrity checks." },
        ],
      },
      {
        id: "e3333333-3333-3333-3333-333333333332",
        reportId: "d3333333-3333-3333-3333-333333333333",
        type: "suggestion",
        title: "Separate v1 mock AI from v2 real AI",
        explanation: "The role values AI implementation, but the v1 resume evidence is architectural. Make the tradeoff explicit and show the provider boundary.",
        recommendation: "In the README, state that the public demo uses deterministic reports and that OpenAI structured outputs are the planned provider swap.",
        severity: "medium",
        displayOrder: 2,
        citations: [
          { id: "c0000000-0000-0000-0000-000000000017", findingId: "e3333333-3333-3333-3333-333333333332", sourceType: "job_requirement", sourceId: "b0000000-0000-0000-0000-000000000012", startLine: 4, endLine: 4, quotedText: "Experience with embeddings, retrieval, LangChain, or OpenAI APIs." },
          { id: "c0000000-0000-0000-0000-000000000018", findingId: "e3333333-3333-3333-3333-333333333332", sourceType: "resume_line", sourceId: "a0000000-0000-0000-0000-000000000014", startLine: 14, endLine: 14, quotedText: "Completed AI/ML coursework using Python, embeddings concepts, LangChain prototypes, and OpenAI-style structured outputs." },
        ],
      },
    ],
  },
];

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
  id: "resume-tarun-v1",
  title: "Full-Stack New Grad Resume",
  candidateName: "Tarun Candidate",
  summary:
    "Full-stack software engineer focused on practical web products, data-backed features, and reliable delivery.",
  createdAt: "2026-07-01",
};

export const resumeLines: ResumeLine[] = [
  { id: "rl-1", resumeId: resume.id, lineNumber: 1, section: "Summary", content: "Full-stack software engineer with Java, Python, TypeScript, React, REST APIs, and SQL experience." },
  { id: "rl-2", resumeId: resume.id, lineNumber: 2, section: "Summary", content: "Interested in AI-assisted products, developer tooling, and reliable backend systems." },
  { id: "rl-3", resumeId: resume.id, lineNumber: 3, section: "Skills", content: "Languages: Java, Python, JavaScript, TypeScript, SQL." },
  { id: "rl-4", resumeId: resume.id, lineNumber: 4, section: "Skills", content: "Frontend: React, Angular, Tailwind CSS, accessible component systems." },
  { id: "rl-5", resumeId: resume.id, lineNumber: 5, section: "Skills", content: "Backend: REST APIs, Node.js, Express, PostgreSQL, schema design, validation." },
  { id: "rl-6", resumeId: resume.id, lineNumber: 6, section: "Skills", content: "Tools: Docker, Jenkins pipelines, GitHub Actions, AWS fundamentals." },
  { id: "rl-7", resumeId: resume.id, lineNumber: 7, section: "Project", content: "Built a full-stack job tracking dashboard with TypeScript, Postgres, and evidence-backed reports." },
  { id: "rl-8", resumeId: resume.id, lineNumber: 8, section: "Project", content: "Modeled applications, jobs, resume lines, AI findings, and citations as relational data." },
  { id: "rl-9", resumeId: resume.id, lineNumber: 9, section: "Project", content: "Implemented Zod validation for structured report payloads and citation integrity checks." },
  { id: "rl-10", resumeId: resume.id, lineNumber: 10, section: "Experience", content: "Created Java REST endpoints backed by PostgreSQL tables and request validation." },
  { id: "rl-11", resumeId: resume.id, lineNumber: 11, section: "Experience", content: "Improved React dashboard loading states, empty states, and reusable table components." },
  { id: "rl-12", resumeId: resume.id, lineNumber: 12, section: "Experience", content: "Maintained Jenkins CI jobs for tests and Docker image builds in a class team project." },
  { id: "rl-13", resumeId: resume.id, lineNumber: 13, section: "Experience", content: "Deployed coursework projects to AWS-managed services, but did not own production operations." },
  { id: "rl-14", resumeId: resume.id, lineNumber: 14, section: "Coursework", content: "Completed AI/ML coursework using Python, embeddings concepts, LangChain prototypes, and OpenAI-style structured outputs." },
];

export const jobs: Job[] = [
  {
    id: "job-fullstack",
    company: "Northstar Health",
    title: "Full-Stack Software Engineer",
    location: "Remote",
    jobUrl: "https://example.com/jobs/fullstack",
    description: "Build patient operations tools across React, Node, PostgreSQL, and internal workflow systems.",
    createdAt: "2026-07-01",
    requirements: [
      { id: "jr-1", jobId: "job-fullstack", lineNumber: 1, category: "frontend", importance: "required", content: "Build production React interfaces with clear loading and empty states." },
      { id: "jr-2", jobId: "job-fullstack", lineNumber: 2, category: "backend", importance: "required", content: "Design REST APIs and relational PostgreSQL schemas." },
      { id: "jr-3", jobId: "job-fullstack", lineNumber: 3, category: "quality", importance: "preferred", content: "Use TypeScript validation to keep server and UI contracts consistent." },
      { id: "jr-4", jobId: "job-fullstack", lineNumber: 4, category: "delivery", importance: "preferred", content: "Contribute to CI/CD workflows and deployment reliability." },
    ],
  },
  {
    id: "job-cloud",
    company: "Atlas Cloud Labs",
    title: "Junior Cloud Engineer",
    location: "New York, NY",
    jobUrl: "https://example.com/jobs/cloud",
    description: "Support cloud deployment pipelines, observability, and AWS infrastructure improvements.",
    createdAt: "2026-07-01",
    requirements: [
      { id: "jr-5", jobId: "job-cloud", lineNumber: 1, category: "cloud", importance: "required", content: "Own AWS deployment workflows for production services." },
      { id: "jr-6", jobId: "job-cloud", lineNumber: 2, category: "delivery", importance: "required", content: "Maintain CI/CD pipelines and troubleshoot failed builds." },
      { id: "jr-7", jobId: "job-cloud", lineNumber: 3, category: "operations", importance: "required", content: "Monitor service health, incidents, and reliability metrics." },
      { id: "jr-8", jobId: "job-cloud", lineNumber: 4, category: "containerization", importance: "preferred", content: "Package services with Docker and document release steps." },
    ],
  },
  {
    id: "job-ai-app",
    company: "BrightHire Tools",
    title: "AI Application Engineer",
    location: "Hybrid",
    jobUrl: "https://example.com/jobs/ai-app",
    description: "Ship AI-assisted workflow features with structured outputs, retrieval, and explainable user experiences.",
    createdAt: "2026-07-01",
    requirements: [
      { id: "jr-9", jobId: "job-ai-app", lineNumber: 1, category: "ai", importance: "required", content: "Build AI-assisted product features that cite or explain source evidence." },
      { id: "jr-10", jobId: "job-ai-app", lineNumber: 2, category: "backend", importance: "required", content: "Design data models for structured AI outputs and validation." },
      { id: "jr-11", jobId: "job-ai-app", lineNumber: 3, category: "frontend", importance: "preferred", content: "Create polished review interfaces for generated recommendations." },
      { id: "jr-12", jobId: "job-ai-app", lineNumber: 4, category: "ml", importance: "preferred", content: "Experience with embeddings, retrieval, LangChain, or OpenAI APIs." },
    ],
  },
];

export const applications: Application[] = [
  { id: "app-fullstack", jobId: "job-fullstack", resumeId: resume.id, status: "interviewing", priority: "high", appliedAt: "2026-07-02", deadline: "2026-07-15", notes: "Strong full-stack match. Use as primary demo path.", createdAt: "2026-07-02", updatedAt: "2026-07-05" },
  { id: "app-cloud", jobId: "job-cloud", resumeId: resume.id, status: "applied", priority: "medium", appliedAt: "2026-07-03", deadline: "2026-07-20", notes: "Stretch role because production cloud ownership is thin.", createdAt: "2026-07-03", updatedAt: "2026-07-04" },
  { id: "app-ai", jobId: "job-ai-app", resumeId: resume.id, status: "saved", priority: "high", appliedAt: null, deadline: "2026-07-24", notes: "Good product angle, needs stronger real AI deployment evidence.", createdAt: "2026-07-04", updatedAt: "2026-07-04" },
];

export const reports: AiReport[] = [
  {
    id: "report-fullstack",
    applicationId: "app-fullstack",
    fitScore: 88,
    summary: "Strong fit for a junior full-stack role because the resume shows React, REST APIs, PostgreSQL, TypeScript, validation, and delivery awareness.",
    status: "seeded",
    generatedBy: "mock-provider-v1",
    promptVersion: "seeded-demo-v1",
    createdAt: "2026-07-05",
    findings: [
      {
        id: "finding-fullstack-strength",
        reportId: "report-fullstack",
        type: "strength",
        title: "Full-stack evidence is specific",
        explanation: "The role asks for React interfaces and relational backend work. The resume names both frontend delivery and PostgreSQL-backed REST APIs.",
        recommendation: "Lead with the full-stack project and mention validation plus schema design in the first interview answer.",
        severity: "low",
        displayOrder: 1,
        citations: [
          { id: "cit-1", findingId: "finding-fullstack-strength", sourceType: "job_requirement", sourceId: "jr-1", startLine: 1, endLine: 1, quotedText: "Build production React interfaces with clear loading and empty states." },
          { id: "cit-2", findingId: "finding-fullstack-strength", sourceType: "resume_line", sourceId: "rl-11", startLine: 11, endLine: 11, quotedText: "Improved React dashboard loading states, empty states, and reusable table components." },
          { id: "cit-3", findingId: "finding-fullstack-strength", sourceType: "job_requirement", sourceId: "jr-2", startLine: 2, endLine: 2, quotedText: "Design REST APIs and relational PostgreSQL schemas." },
          { id: "cit-4", findingId: "finding-fullstack-strength", sourceType: "resume_line", sourceId: "rl-10", startLine: 10, endLine: 10, quotedText: "Created Java REST endpoints backed by PostgreSQL tables and request validation." },
        ],
      },
      {
        id: "finding-fullstack-gap",
        reportId: "report-fullstack",
        type: "gap",
        title: "Deployment ownership is present but light",
        explanation: "The job prefers CI/CD and deployment reliability. The resume mentions Jenkins and AWS fundamentals, but not recurring ownership of production releases.",
        recommendation: "Add one bullet that says what was deployed, how often, and what reliability improvement resulted.",
        severity: "medium",
        displayOrder: 2,
        citations: [
          { id: "cit-5", findingId: "finding-fullstack-gap", sourceType: "job_requirement", sourceId: "jr-4", startLine: 4, endLine: 4, quotedText: "Contribute to CI/CD workflows and deployment reliability." },
          { id: "cit-6", findingId: "finding-fullstack-gap", sourceType: "resume_line", sourceId: "rl-12", startLine: 12, endLine: 12, quotedText: "Maintained Jenkins CI jobs for tests and Docker image builds in a class team project." },
          { id: "cit-7", findingId: "finding-fullstack-gap", sourceType: "resume_line", sourceId: "rl-13", startLine: 13, endLine: 13, quotedText: "Deployed coursework projects to AWS-managed services, but did not own production operations." },
        ],
      },
      {
        id: "finding-fullstack-interview",
        reportId: "report-fullstack",
        type: "interview_prep",
        title: "Prepare a schema design story",
        explanation: "This role will likely probe whether the backend work involved real modeling decisions, not only endpoint wiring.",
        recommendation: "Be ready to explain why applications, reports, findings, and citations are separate tables.",
        severity: "low",
        displayOrder: 3,
        citations: [
          { id: "cit-8", findingId: "finding-fullstack-interview", sourceType: "job_requirement", sourceId: "jr-2", startLine: 2, endLine: 2, quotedText: "Design REST APIs and relational PostgreSQL schemas." },
          { id: "cit-9", findingId: "finding-fullstack-interview", sourceType: "resume_line", sourceId: "rl-8", startLine: 8, endLine: 8, quotedText: "Modeled applications, jobs, resume lines, AI findings, and citations as relational data." },
        ],
      },
    ],
  },
  {
    id: "report-cloud",
    applicationId: "app-cloud",
    fitScore: 61,
    summary: "Medium stretch fit: CI/CD and Docker evidence exists, but the job asks for production cloud ownership and operations depth.",
    status: "seeded",
    generatedBy: "mock-provider-v1",
    promptVersion: "seeded-demo-v1",
    createdAt: "2026-07-05",
    findings: [
      {
        id: "finding-cloud-gap",
        reportId: "report-cloud",
        type: "gap",
        title: "Production operations evidence is missing",
        explanation: "The job requires monitoring service health and incidents. The resume shows deployment coursework, but not operational ownership.",
        recommendation: "Add a small project or bullet around uptime checks, incident notes, metrics, or alerting to close this gap.",
        severity: "high",
        displayOrder: 1,
        citations: [
          { id: "cit-10", findingId: "finding-cloud-gap", sourceType: "job_requirement", sourceId: "jr-7", startLine: 3, endLine: 3, quotedText: "Monitor service health, incidents, and reliability metrics." },
          { id: "cit-11", findingId: "finding-cloud-gap", sourceType: "resume_line", sourceId: "rl-13", startLine: 13, endLine: 13, quotedText: "Deployed coursework projects to AWS-managed services, but did not own production operations." },
        ],
      },
      {
        id: "finding-cloud-strength",
        reportId: "report-cloud",
        type: "strength",
        title: "CI/CD foundation is useful",
        explanation: "The Jenkins and Docker experience maps to the pipeline maintenance part of the role.",
        recommendation: "Frame this as a foundation and be direct that production ownership is your growth area.",
        severity: "low",
        displayOrder: 2,
        citations: [
          { id: "cit-12", findingId: "finding-cloud-strength", sourceType: "job_requirement", sourceId: "jr-6", startLine: 2, endLine: 2, quotedText: "Maintain CI/CD pipelines and troubleshoot failed builds." },
          { id: "cit-13", findingId: "finding-cloud-strength", sourceType: "resume_line", sourceId: "rl-12", startLine: 12, endLine: 12, quotedText: "Maintained Jenkins CI jobs for tests and Docker image builds in a class team project." },
        ],
      },
    ],
  },
  {
    id: "report-ai",
    applicationId: "app-ai",
    fitScore: 78,
    summary: "Good fit for AI application work because the strongest evidence is product-oriented AI structure, validation, and source-backed recommendations.",
    status: "seeded",
    generatedBy: "mock-provider-v1",
    promptVersion: "seeded-demo-v1",
    createdAt: "2026-07-05",
    findings: [
      {
        id: "finding-ai-strength",
        reportId: "report-ai",
        type: "strength",
        title: "Evidence-backed AI UX matches the role",
        explanation: "The role wants AI features that explain source evidence. The resume project is built around evidence-backed reports and citations.",
        recommendation: "Show the citation click workflow early in the demo because it maps directly to the role.",
        severity: "low",
        displayOrder: 1,
        citations: [
          { id: "cit-14", findingId: "finding-ai-strength", sourceType: "job_requirement", sourceId: "jr-9", startLine: 1, endLine: 1, quotedText: "Build AI-assisted product features that cite or explain source evidence." },
          { id: "cit-15", findingId: "finding-ai-strength", sourceType: "resume_line", sourceId: "rl-7", startLine: 7, endLine: 7, quotedText: "Built a full-stack job tracking dashboard with TypeScript, Postgres, and evidence-backed reports." },
          { id: "cit-16", findingId: "finding-ai-strength", sourceType: "resume_line", sourceId: "rl-9", startLine: 9, endLine: 9, quotedText: "Implemented Zod validation for structured report payloads and citation integrity checks." },
        ],
      },
      {
        id: "finding-ai-suggestion",
        reportId: "report-ai",
        type: "suggestion",
        title: "Separate v1 mock AI from v2 real AI",
        explanation: "The role values AI implementation, but the v1 resume evidence is architectural. Make the tradeoff explicit and show the provider boundary.",
        recommendation: "In the README, state that the public demo uses deterministic reports and that OpenAI structured outputs are the planned provider swap.",
        severity: "medium",
        displayOrder: 2,
        citations: [
          { id: "cit-17", findingId: "finding-ai-suggestion", sourceType: "job_requirement", sourceId: "jr-12", startLine: 4, endLine: 4, quotedText: "Experience with embeddings, retrieval, LangChain, or OpenAI APIs." },
          { id: "cit-18", findingId: "finding-ai-suggestion", sourceType: "resume_line", sourceId: "rl-14", startLine: 14, endLine: 14, quotedText: "Completed AI/ML coursework using Python, embeddings concepts, LangChain prototypes, and OpenAI-style structured outputs." },
        ],
      },
    ],
  },
];

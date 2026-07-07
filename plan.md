# Job Application Copilot

## Blunt Project Direction

Job Application Copilot should be a demo-first portfolio app, not a full SaaS. The goal is to prove that you can build and deploy a polished full-stack product with a real database, clean data modeling, validation, and a memorable AI-adjacent feature.

The memorable feature is evidence-backed recommendations: every fit score, skill gap, and interview prep item cites exact resume lines or job description requirements.

For v1, do not pay for AI API calls. Use seeded/mock AI reports that are architecturally honest: the database, UI, validation, and service boundaries should look like they could support OpenAI later.

## 20-Second Recruiter Pitch

I built Job Application Copilot, a full-stack job search dashboard where candidates track applications, save job descriptions, and review AI-style fit reports. The key differentiator is that every recommendation cites the exact resume lines and job requirements behind it, making the feedback traceable instead of generic. I built it with Next.js, TypeScript, Zod, Drizzle, Supabase Postgres, and Vercel.

## Core Product Story

Most AI resume tools give vague advice. Job Application Copilot makes the advice inspectable.

Instead of saying:

> Improve your backend experience.

It says:

> Gap: The job asks for production CI/CD experience. Your resume mentions Jenkins pipelines on lines 22-24, but there is no deployment ownership evidence. Add a bullet showing what you deployed, how often, and what reliability impact it had.

Evidence:

- Resume lines 22-24
- Job requirement lines 12-14

That is the product.

## v1 Scope

Build a polished seeded demo with real infrastructure.

### Include

- Next.js app with TypeScript
- Zod validation
- Drizzle schema and migrations
- Supabase Postgres database
- Seeded demo data
- Dashboard of job applications
- Application detail page
- Resume evidence viewer with line numbers
- Job description and requirements viewer
- Fit report page section
- Strengths, gaps, recommendations, and interview prep
- Citation UI linking findings back to resume/job evidence
- Basic status editing if time allows
- Vercel deployment
- README with architecture, screenshots, and tradeoffs

### Exclude

- Auth
- Paid AI API calls
- Browser extension
- LinkedIn/Indeed scraping
- Auto-apply
- Resume formatting editor
- Payment/subscriptions
- Calendar/email integrations
- Complex analytics
- Multi-user organizations

Skipping auth is acceptable for v1 because this is a portfolio demo with seeded data. Add auth only after the deployed app works.

## Recommended Stack

- Framework: Next.js App Router
- Language: TypeScript
- Styling: Tailwind CSS
- Components: shadcn/ui
- Validation: Zod
- Database: Supabase Postgres
- ORM: Drizzle
- Deployment: Vercel
- CI: GitHub Actions
- Testing: Vitest for pure logic, Playwright later for demo flow
- AI v1: mock provider + seeded reports
- AI v2: OpenAI API + embeddings + pgvector

## Project Structure

Keep it single-app, not monorepo.

```txt
job-application-copilot/
  src/
    app/
      page.tsx
      applications/
        page.tsx
        [id]/
          page.tsx
      jobs/
        [id]/
          page.tsx
      resume/
        page.tsx
    components/
      dashboard/
      applications/
      reports/
      evidence/
      ui/
    lib/
      db/
        schema.ts
        queries.ts
        seed.ts
      validators/
      ai/
        types.ts
        mock-provider.ts
        citation-validator.ts
      utils.ts
  drizzle/
  public/
  README.md
```

## Database Schema

Use a schema that proves you understand relational modeling without overbuilding.

### resumes

- id
- title
- candidate_name
- summary
- created_at

### resume_lines

- id
- resume_id
- line_number
- section
- content

### jobs

- id
- company
- title
- location
- job_url
- description
- created_at

### job_requirements

- id
- job_id
- line_number
- category
- importance
- content

### applications

- id
- job_id
- resume_id
- status
- priority
- applied_at
- deadline
- notes
- created_at
- updated_at

### ai_reports

- id
- application_id
- fit_score
- summary
- model_label
- prompt_version
- created_at

For v1, `model_label` can be `seeded-demo-v1`.

### ai_findings

- id
- report_id
- type
- title
- explanation
- recommendation
- severity
- display_order

Types:

- strength
- gap
- suggestion
- interview_prep

### citations

- id
- finding_id
- source_type
- source_id
- start_line
- end_line
- quoted_text

Source types:

- resume
- job

## Zod Models

Create Zod schemas for the data that enters or leaves the server layer.

Useful schemas:

- `ApplicationStatusSchema`
- `CreateApplicationSchema`
- `UpdateApplicationSchema`
- `AiFindingSchema`
- `CitationSchema`
- `AiReportSchema`
- `FitScoreSchema`

The citation validator should enforce:

- every finding has at least one citation
- cited line numbers exist
- citation source type is valid
- fit score is between 0 and 100
- finding type is one of the allowed values

This gives you a strong interview story even before real AI.

## Mock AI Architecture

Do not hardcode report UI directly in components. Build a small AI service boundary.

```ts
type GenerateFitReportInput = {
  applicationId: string;
  resumeId: string;
  jobId: string;
};

type AiReportProvider = {
  generateFitReport(input: GenerateFitReportInput): Promise<AiReport>;
};
```

For v1:

```txt
MockAiReportProvider
 -> reads seeded resume/job/application data
 -> returns deterministic report
 -> validates citations
 -> stores report in database
```

For v2:

```txt
OpenAiReportProvider
 -> retrieves resume/job chunks
 -> calls OpenAI
 -> validates structured response
 -> stores report in database
```

This is how you honestly say:

> The public demo uses deterministic seeded reports to avoid API costs, but the app is designed around an AI provider interface so OpenAI can be added without rewriting the product.

## Citation System

This is the main technical differentiator.

### Implementation Rules

1. Resume content is stored as line-numbered records.
2. Job requirements are stored as line-numbered records.
3. AI findings never cite raw text only.
4. AI findings cite source type and line ranges.
5. The server validates citations before saving a report.
6. The UI renders citations as clickable evidence.

### UI Behavior

On the application detail page:

- left/main area: report findings
- right/side area: evidence panel
- clicking a citation highlights the relevant resume or job lines

Example:

```txt
Gap: Cloud deployment ownership

The job asks for AWS deployment experience, but the resume only mentions coursework
and does not show ownership of a deployed production system.

Evidence:
- Job lines 18-20
- Resume lines 31-32
```

## Core Pages

### Dashboard `/`

Purpose: recruiter-friendly first impression.

Show:

- total applications
- interviews
- active applications
- average fit score
- recent applications
- top skill gaps
- pipeline by status

### Applications `/applications`

Purpose: portfolio CRUD/database proof.

Show:

- list/table of applications
- company
- role
- status
- fit score
- deadline
- priority

### Application Detail `/applications/[id]`

Purpose: main demo flow.

Show:

- company and role
- application status
- fit score
- strengths
- gaps
- recommendations
- interview prep
- citations
- linked resume/job evidence

### Resume `/resume`

Purpose: citation proof.

Show:

- parsed resume with line numbers
- section labels
- highlighted lines when linked from report

### Job Detail `/jobs/[id]`

Purpose: requirement proof.

Show:

- job metadata
- job description
- extracted requirements
- line numbers
- requirement categories

## Seed Data Plan

Seed enough data to make the demo feel alive.

### Candidate Resume

Use one realistic new-grad/full-stack resume based on your background:

- Java
- Python
- JavaScript/TypeScript
- React/Angular
- REST APIs
- SQL/Postgres
- Docker
- Jenkins/CI-CD
- AWS
- AI/ML/OpenAI/LangChain coursework

### Jobs

Create 6-8 realistic jobs:

- Full-Stack Software Engineer
- Backend Engineer
- Frontend Engineer
- Junior Cloud Engineer
- AI Application Engineer
- Software Engineer, Internal Tools
- Platform Engineer Intern/New Grad
- Data/ML Application Developer

### Applications

Use statuses:

- saved
- applied
- interviewing
- offer
- rejected

### Reports

Create 3 high-quality reports:

- one strong match
- one medium match
- one stretch role

This lets the demo show contrast.

## Demo Flow

The ideal recruiter demo should take 60-90 seconds.

1. Open dashboard.
2. Show application pipeline and fit score cards.
3. Click one application.
4. Show fit report.
5. Click a skill gap.
6. Show citations to exact resume/job lines.
7. Show interview prep generated from the same evidence.
8. Mention stack and deployment.

The entire project should be understandable without explaining embeddings, agents, or LLM theory first.

## Build Roadmap

### Week 1: App Foundation

- Create Next.js app
- Add TypeScript, Tailwind, shadcn/ui
- Add basic layout
- Create dashboard shell
- Create static mock screens

Goal: the app looks real before the database is connected.

### Week 2: Database And Drizzle

- Create Supabase project
- Add Drizzle
- Define schema
- Generate migrations
- Add seed script
- Render dashboard from database

Goal: real database-backed demo data.

### Week 3: Application Detail And Evidence

- Build application detail page
- Build resume line viewer
- Build job requirement viewer
- Build citation component
- Link findings to evidence

Goal: the differentiator works visually.

### Week 4: Mock AI Service And Validation

- Add mock AI provider interface
- Add Zod report schemas
- Add citation validator
- Store reports/findings/citations in DB
- Add error states

Goal: architecture-real AI without API costs.

### Week 5: CRUD And Polish

- Add basic create/edit application
- Add status updates
- Add loading states
- Add empty states
- Improve mobile layout
- Add filters

Goal: feels like a usable product.

### Week 6: Deployment And Portfolio Finish

- Deploy to Vercel
- Configure env vars
- Add GitHub Actions
- Add README
- Add screenshots/GIF
- Add resume bullets
- Practice demo script

Goal: resume-ready.

## What To Cut If Behind

Cut in this order:

1. CRUD creation forms
2. Filters
3. Mobile polish beyond basic responsiveness
4. Interview prep
5. Multiple resumes
6. Analytics charts

Do not cut:

- deployed app
- real database
- application detail page
- citations
- README

## Technical Tradeoffs

### Seeded AI vs Real AI

Seeded AI is weaker as a live AI demo, but stronger for a cost-free, reliable portfolio demo. The key is to be transparent and design the code so a real provider can be added later.

### No Auth

No auth is fine for v1 because the project is a demo. Auth can be added later with Supabase Auth. Do not let auth block the first deployment.

### Drizzle vs Prisma

Drizzle is a good choice because it exposes SQL concepts and makes the schema/interview story stronger. Prisma may be faster for some CRUD, but Drizzle fits your learning goals.

### RAG Later

Real RAG is a v2 feature. In v1, model the data as if RAG exists later:

- line-numbered resume content
- extracted job requirements
- citations
- provider interface
- validation

## v2 Scope

Add real AI only after v1 is deployed.

- OpenAI integration
- Embeddings
- Supabase pgvector
- Resume/job chunk retrieval
- Structured model responses
- Real citation validation
- Small eval suite
- Resume versioning
- PDF export

## Evals

Do not add evals in v1 unless everything else is done.

Add lightweight validation in v1:

- valid JSON-like report shape
- every finding has citations
- citations point to real lines
- no invalid score
- no invalid finding type

Add real evals in v2:

- 10 sample resumes
- 10 sample job descriptions
- expected gaps
- expected citation references
- rubric for citation accuracy

## Resume Bullets

Use after the project is finished:

- Built and deployed Job Application Copilot, a full-stack job search dashboard using Next.js, TypeScript, Drizzle, Supabase Postgres, Zod, and Vercel.
- Designed a citation-backed AI report system that links resume-job recommendations to exact resume lines and job requirements for auditable feedback.
- Modeled applications, resumes, job requirements, AI reports, findings, and citations in Postgres with Drizzle migrations and seeded demo data.
- Implemented server-side validation with Zod to enforce report shape, fit-score bounds, and citation integrity before rendering recommendations.
- Created a production-style portfolio demo with dashboard analytics, application tracking, fit reports, skill gaps, and interview prep.

## README Structure

```md
# Job Application Copilot

## Overview
## Live Demo
## Screenshots
## Why I Built This
## Features
## Tech Stack
## Architecture
## Database Schema
## Evidence-Based Citation System
## Mock AI Provider
## Future OpenAI/RAG Upgrade
## Local Development
## Environment Variables
## Deployment
## Testing
## Tradeoffs
## Future Work
```

## Interview Talking Points

### Product

- I chose a narrow workflow instead of trying to build a giant job platform.
- The core value is trustworthy, evidence-backed feedback.
- The demo is optimized for recruiters to understand quickly.

### Backend

- I modeled citations as first-class relational data.
- I used Drizzle migrations to keep schema changes explicit.
- I used Zod to validate application inputs and AI report outputs.

### AI

- I avoided paying for API calls in v1 by using seeded deterministic reports.
- I kept the AI provider behind an interface so OpenAI can be swapped in later.
- I designed the data model around future RAG: resume lines, job requirements, citations, and findings.

### Infra

- I deployed on Vercel.
- I used Supabase Postgres as the hosted database.
- I managed environment variables and migrations as part of the deployment workflow.

### Tradeoffs

- I skipped auth in v1 to focus on deployment and the core product.
- I prioritized citation integrity over breadth of features.
- I chose seeded AI reports for reliability and cost control.

## Go Recommendation

Go.

This project is strong if you keep it narrow. The risk is trying to make it a complete job search platform. Build the evidence-backed application detail page first, then expand around it.

The finished project should feel like this:

> A clean full-stack dashboard with one technically memorable feature: AI-style career advice that shows its work.

## Task Progress Log

Use this section as the learning trail for the actual build.

### 2026-07-07 Setup Session

- Created a new Next.js App Router project at `C:\Users\tarun\Documents\Codex\2026-07-07\c-users-tarun-documents-codex-2026\job-application-copilot`.
- Used TypeScript, Tailwind CSS, ESLint, `src/` directory, and the `@/*` import alias.
- Worked around local Windows/npm permission issues by pointing npm cache and config writes into the Codex workspace.
- Installed local project dependencies: `zod`, `drizzle-orm`, `postgres`, `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority`.
- Installed dev dependencies: `drizzle-kit`, `vitest`.
- Updated starter metadata and global styles from the default Next.js template toward the portfolio demo.
- Added initial project folders for app routes, dashboard components, application views, report views, evidence views, UI primitives, database files, validators, and AI provider boundaries.
- Added seeded v1 domain data for one resume, three jobs, three applications, and three evidence-backed reports.
- Added TypeScript AI/report types for applications, findings, citations, and provider interfaces.
- Added Zod schemas for application status, fit score, citations, findings, reports, and application create/update payloads.

### Account-Gated Work Still Needed

- Create or connect a Supabase project.
- Add Supabase Postgres connection strings to `.env.local`.
- Run Drizzle migrations once the schema file is finished.
- Seed the hosted database after Supabase is connected.
- Create or connect a Vercel project.
- Add Vercel environment variables.
- Deploy and verify the live demo.

## Adversarial Review Addendum

### Verdict

Conditional go.

The project can be impressive for a new-grad/full-stack portfolio, but only if the citation-backed evidence workflow is unmistakably real. If the app feels like a dashboard wrapped around canned AI text, it will look generic. The current plan has the right differentiator, but it still includes too much peripheral dashboard/product surface and not enough proof that the citation system is mechanically enforced.

The strongest version is not "AI job application copilot." The strongest version is "an auditable fit-analysis system that validates every recommendation against structured resume and job evidence."

### Top 10 Risks, Ranked By Severity

1. Mock AI can look fake if the app does not prove that reports are validated against actual line-level evidence. The defense must be citation integrity, deterministic generation, and clear provider boundaries.
2. Recruiters may not understand the differentiator quickly if the first screen is a generic dashboard. The demo should reach the application detail and citation click within 20 seconds.
3. Technical interviewers may see "AI copilot" as shallow unless the README and demo emphasize schema design, validation, migrations, and provider abstraction.
4. The dashboard scope can consume time while adding little proof. Metrics like average fit score and top gaps are nice, but they are not the reason this project should exist.
5. CRUD forms can become polish traps. Status editing is enough for v1; creating complex applications manually is not necessary for a portfolio demo.
6. The schema is close, but citations are under-specified. A citation should reference a concrete source table and line range, and the validator should verify the range and quoted text.
7. Skipping auth is reasonable, but the app must be explicit that it is a single-user seeded demo. Do not pretend it is a production multi-user SaaS.
8. Supabase/Vercel/Drizzle deployment can break on environment variables, migration order, seed assumptions, and server/client boundaries. Deployment should be tested before UI polish week.
9. The citation UI could be too subtle. If clicking a citation does not visibly highlight exact lines, the main differentiator disappears.
10. The project can fail as a resume project if the README is a feature list instead of a technical case study with tradeoffs, schema diagrams, screenshots, and demo script.

### What To Cut

Cut these from v1 unless everything else is already deployed and working:

- Top skill gaps across all applications.
- Pipeline charts beyond a simple status count.
- Application creation flow.
- Complex filters and sorting.
- Multiple resumes.
- Dedicated job detail page unless it is directly used by citation navigation.
- Interview prep as a large feature area. Keep 2-3 evidence-backed questions inside the report instead.
- GitHub Actions if deployment is not already stable. A working deployed app matters more.
- Mobile perfection. Make it responsive enough, but do not sink time into a phone-first dashboard.

### What To Keep

Keep these because they make the project defensible:

- Next.js App Router, TypeScript, Drizzle, Supabase Postgres, Zod, and Vercel.
- Seeded data with realistic applications and reports.
- Application detail page as the hero experience.
- Resume lines and job requirements as first-class records.
- AI reports, findings, and citations as relational data.
- Mock provider interface that could be swapped for OpenAI later.
- Citation validator that fails bad reports before persistence or rendering.
- README sections explaining the mock AI tradeoff, schema, validation, and future RAG path.

### What To Change

Make the application detail page the primary product, not the dashboard. The dashboard can exist, but it should be a launchpad with 3-4 cards and a short application list.

Move "citation integrity" from a UI feature to the technical center of the project. Add a small validation story that interviewers can inspect:

- A finding cannot be saved without at least one citation.
- Citation `source_type` must be `resume_line` or `job_requirement`.
- Citation start/end lines must exist for the cited resume or job.
- `quoted_text` must match the underlying source text or be removed entirely to avoid drift.
- Fit score must be bounded.
- Finding types and severities must be enums.

Rename the public story away from broad "copilot" claims. The app can still be called Job Application Copilot, but the README should describe it as an "evidence-backed job fit analyzer." That sounds more specific and more credible.

### Revised v1 Scope

Build only the smallest version that proves the technical idea:

- Seed one candidate resume.
- Seed three jobs.
- Seed three applications: strong match, medium match, stretch role.
- Seed or generate one validated report per application.
- Build dashboard with status counts and recent applications.
- Build application detail with report findings and evidence panel.
- Build citation click behavior that highlights exact resume/job lines.
- Build status editing only.
- Build Zod validators and citation validator.
- Deploy to Vercel with Supabase Postgres.
- Write README as a technical case study.

Do not build full application creation, advanced analytics, real AI calls, auth, browser scraping, resume editing, or multi-user flows in v1.

### Revised Schema Changes

Change `citations.source_type` from generic `resume`/`job` to more explicit source types:

- `resume_line`
- `job_requirement`

Use nullable foreign keys instead of one generic `source_id` if possible:

- `resume_line_id`
- `job_requirement_id`

If keeping a polymorphic citation table for speed, document the tradeoff and enforce it in code with Zod plus a server-side validator.

Add practical fields:

- `ai_reports.status`: `seeded`, `generated`, `failed`
- `ai_reports.generated_by`: `mock-provider-v1`
- `ai_findings.confidence`: optional integer 0-100, only if it is used in the UI
- `applications.source`: optional, such as `manual`, `seed`, `imported`, only if it helps explain seeded data

Do not add embeddings, chunks, organizations, user accounts, or resume versions in v1.

### Revised Demo Flow

The demo should be 60-90 seconds and should avoid generic dashboard wandering.

1. Open the dashboard and say: "This is a seeded full-stack demo for tracking applications and reviewing evidence-backed fit reports."
2. Click the stretch application immediately.
3. Show the fit score and one gap.
4. Click the gap's citation.
5. Show the exact highlighted job requirement and resume line.
6. Explain that reports are deterministic in v1, but every finding is validated before save.
7. Show one strength and one interview question generated from the same evidence.
8. Briefly mention stack: Next.js, TypeScript, Drizzle, Supabase Postgres, Zod, Vercel.
9. End on the README/schema section if the audience is technical.

The citation click must happen early. That is the project.

### Revised Technical Story

The technical story should be:

"I built a database-backed fit analysis app where AI-style recommendations are not just text blobs. Reports are structured into findings and citations, and the server validates that every citation points to real resume or job evidence before the report is rendered. The demo uses seeded deterministic reports to avoid paid API calls, but the provider boundary is designed so a real OpenAI structured-output provider can replace the mock provider later."

This is stronger than:

"I built an AI job application dashboard."

### Revised Recruiter Story

The recruiter story should be:

"This helps a candidate understand why a job is or is not a good fit. Instead of generic advice, each gap or strength links directly to the resume line and job requirement behind it."

Avoid explaining RAG, embeddings, agents, or evals in the first 30 seconds. Those are interview-depth topics, not recruiter pitch material.

### README And Interview Story Changes

The README should emphasize:

- Live demo link.
- 3-screenshot demo path: dashboard, report, highlighted citation.
- What problem the app solves.
- What is real in v1: database, migrations, validation, seeded data, deployment.
- What is intentionally mocked: AI generation.
- Why mocking is acceptable: deterministic demo, no API costs, clear provider interface.
- Schema diagram or schema table.
- Citation validation rules.
- Deployment notes and tradeoffs.
- Future OpenAI/RAG upgrade path.

Likely interview questions:

- Why did you use mock AI instead of the OpenAI API?
- How do you guarantee citations are valid?
- Why store resume lines separately?
- Why Drizzle instead of Prisma?
- How would auth change the schema?
- How would you add real AI safely?
- How would you evaluate report quality?
- What happens if the model cites a line that does not exist?
- What would you change for a production multi-user version?

Strongest resume bullet:

- Built and deployed an evidence-backed job fit analyzer using Next.js, TypeScript, Drizzle, Supabase Postgres, and Zod, with server-side validation ensuring every AI-style recommendation cites real resume or job requirement records.

Weakest resume bullet:

- Built an AI-powered job application tracker with dashboards and recommendations.

The weak bullet sounds generic and invites skepticism. Use the strong version.

### Best Narrower Version

If time is tight, build only:

- One dashboard page.
- One application detail page.
- One resume evidence panel.
- One job requirements panel.
- Three seeded applications.
- Validated reports and citations.
- Vercel deployment.
- README with screenshots.

This narrower version is still portfolio-worthy if the citation workflow is polished.

### Best More Technical Version

If there is extra time after v1 is deployed:

- Add a real OpenAI structured-output provider behind the existing interface.
- Add `pgvector` only after the line-based citation system works.
- Add a small eval set that checks whether generated findings cite expected requirements.
- Add auth only if the app is already stable.

Do not start here. This is v2.

### Go/No-Go Recommendation

Go, but narrow the ambition.

This project is worth building if the v1 promise is:

> A deployed full-stack app that makes AI-style job fit feedback auditable through validated citations.

No-go if the builder drifts toward:

> A generic AI job tracker with lots of dashboard cards and canned recommendations.

The implementation should start with the application detail page, seed data, schema, and citation validator. If those are strong, the rest of the app can stay simple and still look credible.

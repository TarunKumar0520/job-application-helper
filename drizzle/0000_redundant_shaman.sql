CREATE TYPE "public"."application_status" AS ENUM('saved', 'applied', 'interviewing', 'offer', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."citation_source_type" AS ENUM('resume_line', 'job_requirement');--> statement-breakpoint
CREATE TYPE "public"."finding_type" AS ENUM('strength', 'gap', 'suggestion', 'interview_prep');--> statement-breakpoint
CREATE TYPE "public"."priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('seeded', 'generated', 'failed');--> statement-breakpoint
CREATE TYPE "public"."requirement_importance" AS ENUM('required', 'preferred');--> statement-breakpoint
CREATE TYPE "public"."severity" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TABLE "ai_findings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"report_id" uuid NOT NULL,
	"type" "finding_type" NOT NULL,
	"title" text NOT NULL,
	"explanation" text NOT NULL,
	"recommendation" text NOT NULL,
	"severity" "severity" NOT NULL,
	"display_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_reports" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"application_id" uuid NOT NULL,
	"fit_score" integer NOT NULL,
	"summary" text NOT NULL,
	"status" "report_status" NOT NULL,
	"generated_by" text NOT NULL,
	"prompt_version" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "applications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"resume_id" uuid NOT NULL,
	"status" "application_status" NOT NULL,
	"priority" "priority" NOT NULL,
	"applied_at" date,
	"deadline" date,
	"notes" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "citations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"finding_id" uuid NOT NULL,
	"source_type" "citation_source_type" NOT NULL,
	"resume_line_id" uuid,
	"job_requirement_id" uuid,
	"start_line" integer NOT NULL,
	"end_line" integer NOT NULL,
	"quoted_text" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_requirements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"job_id" uuid NOT NULL,
	"line_number" integer NOT NULL,
	"category" text NOT NULL,
	"importance" "requirement_importance" NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jobs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company" text NOT NULL,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"job_url" text NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resume_lines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"resume_id" uuid NOT NULL,
	"line_number" integer NOT NULL,
	"section" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "resumes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"candidate_name" text NOT NULL,
	"summary" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_findings" ADD CONSTRAINT "ai_findings_report_id_ai_reports_id_fk" FOREIGN KEY ("report_id") REFERENCES "public"."ai_reports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_reports" ADD CONSTRAINT "ai_reports_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "citations" ADD CONSTRAINT "citations_finding_id_ai_findings_id_fk" FOREIGN KEY ("finding_id") REFERENCES "public"."ai_findings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "citations" ADD CONSTRAINT "citations_resume_line_id_resume_lines_id_fk" FOREIGN KEY ("resume_line_id") REFERENCES "public"."resume_lines"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "citations" ADD CONSTRAINT "citations_job_requirement_id_job_requirements_id_fk" FOREIGN KEY ("job_requirement_id") REFERENCES "public"."job_requirements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_requirements" ADD CONSTRAINT "job_requirements_job_id_jobs_id_fk" FOREIGN KEY ("job_id") REFERENCES "public"."jobs"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "resume_lines" ADD CONSTRAINT "resume_lines_resume_id_resumes_id_fk" FOREIGN KEY ("resume_id") REFERENCES "public"."resumes"("id") ON DELETE no action ON UPDATE no action;
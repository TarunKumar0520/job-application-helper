import type { AiReport } from "@/lib/ai/types";
import type { JobRequirement, ResumeLine } from "@/lib/db/seed-data";
import { AiReportSchema } from "@/lib/validators/report";

export function validateReportCitations(
  report: AiReport,
  resumeLines: ResumeLine[],
  jobRequirements: JobRequirement[],
) {
  const parsed = AiReportSchema.parse(report);

  for (const finding of parsed.findings) {
    for (const citation of finding.citations) {
      const source =
        citation.sourceType === "resume_line"
          ? resumeLines.find((line) => line.id === citation.sourceId)
          : jobRequirements.find((requirement) => requirement.id === citation.sourceId);

      if (!source) {
        throw new Error(`Citation ${citation.id} points to a missing ${citation.sourceType}.`);
      }

      if (source.lineNumber < citation.startLine || source.lineNumber > citation.endLine) {
        throw new Error(`Citation ${citation.id} line range does not include source line ${source.lineNumber}.`);
      }

      if (source.content !== citation.quotedText) {
        throw new Error(`Citation ${citation.id} quoted text does not match source text.`);
      }
    }
  }

  return parsed;
}

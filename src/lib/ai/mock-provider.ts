import type { AiReportProvider, GenerateFitReportInput } from "@/lib/ai/types";
import { getApplication } from "@/lib/db/queries";

export const MockAiReportProvider: AiReportProvider = {
  async generateFitReport(input: GenerateFitReportInput) {
    const application = getApplication(input.applicationId);

    if (!application?.report) {
      throw new Error(`No seeded report found for application ${input.applicationId}`);
    }

    return application.report;
  },
};

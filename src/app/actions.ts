"use server";

import { updateApplicationStatus } from "@/lib/db/queries";
import { revalidatePath } from "next/cache";
import type { ApplicationStatus } from "@/lib/ai/types";

export async function updateStatusAction(applicationId: string, status: ApplicationStatus) {
  try {
    await updateApplicationStatus(applicationId, status);
    
    // Revalidate the pages that show application details or application lists
    revalidatePath("/");
    revalidatePath("/applications");
    revalidatePath(`/applications/${applicationId}`);
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update application status:", error);
    return { success: false, error: error instanceof Error ? error.message : "Failed to update status" };
  }
}

"use server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function submitUserInfo(prevState: any, formData: FormData) {
  try {
    // Extract all form data
    const userData = {
      // Personal Information
      name: formData.get("name") as string,
      age: formData.get("age") as string,
      email: formData.get("email") as string,

      // Cycle History
      lastPeriodDate: formData.get("lastPeriodDate") as string,
      averageCycleLength: formData.get("averageCycleLength") as string,
      averagePeriodLength: formData.get("averagePeriodLength") as string,
      cycleRegularity: formData.get("cycleRegularity") as string,

      // Health Information
      contraceptiveMethod: formData.get("contraceptiveMethod") as string,
      medications: formData.get("medications") as string,
      medicalConditions: formData.getAll("medicalConditions") as string[],
      pregnancyHistory: formData.get("pregnancyHistory") as string,

      // Symptoms Tracking Preferences
      symptomsToTrack: formData.getAll("symptomsToTrack") as string[],
      moodTracking: formData.get("moodTracking") === "on",
      flowTracking: formData.get("flowTracking") === "on",
      painTracking: formData.get("painTracking") === "on",

      // Goals and Preferences
      primaryGoal: formData.get("primaryGoal") as string,
      notificationPreferences: formData.getAll(
        "notificationPreferences"
      ) as string[],
      privacyLevel: formData.get("privacyLevel") as string,

      // Additional Information
      lifestyle: formData.get("lifestyle") as string,
      additionalNotes: formData.get("additionalNotes") as string,
    };

    console.log("[v0] User information collected:", userData);

    // Here you would typically save to database
    // await saveUserData(userData)

    return {
      success: true,
      message:
        "Welcome to FloWise! Your information has been saved successfully.",
      data: userData,
    };
  } catch (error) {
    console.error("[v0] Error saving user data:", error);
    return {
      success: false,
      message: "There was an error saving your information. Please try again.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

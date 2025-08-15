"use server";

import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { UserData, SymptomEntry, CycleEntry } from "../store/user-store";

interface AIInsightRequest {
  userData: UserData;
  symptomEntries: SymptomEntry[];
  cycleEntries: CycleEntry[];
}

export type AIInsightResponse = {
  type:
    | "cycle_prediction"
    | "symptom_pattern"
    | "health_recommendation"
    | "fertility_insight";
  title: string;
  content: string;
  confidence: number;
  actionable: boolean;
};

// ---- Structured output schema (keeps Gemini in JSON mode) ----
const InsightType = z.enum([
  "cycle_prediction",
  "symptom_pattern",
  "health_recommendation",
  "fertility_insight",
]);

const InsightSchema = z.object({
  type: InsightType,
  title: z.string().min(1),
  content: z.string().min(1),
  confidence: z.number().min(0).max(1),
  actionable: z.boolean(),
});

const AIInsightsSchema = z.object({
  insights: z.array(InsightSchema).min(3).max(4),
});

export async function generateAIInsights(data: AIInsightRequest) {
  const { userData, symptomEntries, cycleEntries } = data;

  const prompt = `
You are a specialized AI health assistant for menstrual cycle tracking. Analyze the following user data and provide 3–4 personalized insights.

User Profile:
- Age: ${userData.age}
- Average Cycle Length: ${userData.averageCycleLength} days
- Average Period Length: ${userData.averagePeriodLength} days
- Cycle Regularity: ${userData.cycleRegularity}
- Last Period Date: ${userData.lastPeriodDate}
- Contraceptive Method: ${userData.contraceptiveMethod}
- Medical Conditions: ${userData.medicalConditions.join(", ") || "None"}
- Primary Goal: ${userData.primaryGoal}
- Symptoms Tracked: ${userData.symptomsToTrack.join(", ")}
- Lifestyle: ${userData.lifestyle || "Not provided"}

Recent Symptom Entries: ${symptomEntries.length} entries
Recent Cycle Entries: ${cycleEntries.length} entries

Return ONLY JSON that matches the schema.
`;

  try {
    const { object } = await generateObject({
      model: google("gemini-2.5-flash"), // works with generateObject + schemas
      system:
        "You are a helpful AI assistant specializing in women's health and menstrual cycle analysis. Provide supportive, evidence-based insights without medical diagnoses. Encourage consulting healthcare professionals for medical concerns.",
      prompt,
      schema: AIInsightsSchema,
      schemaName: "AIInsights",
      // providerOptions.google.structuredOutputs is true by default; leaving explicit here is optional.
      providerOptions: { google: { structuredOutputs: true } },
      mode: "json", // forces JSON generation strategy
    });

    return {
      success: true,
      insights: object.insights as AIInsightResponse[],
    };
  } catch (error) {
    console.error("[v0] AI Insights generation error:", error);
    return {
      success: false,
      error: "Failed to generate insights. Please try again.",
    };
  }
}

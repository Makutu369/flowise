"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Sparkles,
  TrendingUp,
  Heart,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import useUserStore from "../store/user-store";
import { generateAIInsights } from "./ai-action";

interface InsightCard {
  type:
    | "cycle_prediction"
    | "symptom_pattern"
    | "health_recommendation"
    | "fertility_insight";
  title: string;
  content: string;
  confidence: number;
  actionable: boolean;
  icon: React.ReactNode;
}

export default function AIInsights() {
  const [insights, setInsights] = useState<InsightCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userData, symptomEntries, cycleEntries, addAIInsight } =
    useUserStore();

  const handleGenerateInsights = async () => {
    if (!userData) {
      setError(
        "Please complete your profile setup first to get personalized insights."
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await generateAIInsights({
        userData,
        symptomEntries,
        cycleEntries,
      });

      if (result.success && result.insights) {
        const formattedInsights: InsightCard[] = result.insights.map(
          (insight) => ({
            type: insight.type,
            title: insight.title,
            content: insight.content,
            confidence: insight.confidence,
            actionable: insight.actionable,
            icon: getInsightIcon(insight.type),
          })
        );

        setInsights(formattedInsights);

        // Save insights to store
        result.insights.forEach((insight) => {
          addAIInsight({
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            date: new Date().toISOString(),
            type: insight.type,
            title: insight.title,
            content: insight.content,
            confidence: insight.confidence,
            actionable: insight.actionable,
          });
        });
      } else {
        setError(
          result.error || "Failed to generate insights. Please try again."
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("[v0] AI Insights error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "cycle_prediction":
        return <TrendingUp className="h-5 w-5" />;
      case "symptom_pattern":
        return <Heart className="h-5 w-5" />;
      case "health_recommendation":
        return <CheckCircle className="h-5 w-5" />;
      case "fertility_insight":
        return <Sparkles className="h-5 w-5" />;
      default:
        return <Brain className="h-5 w-5" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-green-600 bg-green-50 border-green-200";
    if (confidence >= 0.6)
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-orange-600 bg-orange-50 border-orange-200";
  };

  const getConfidenceText = (confidence: number) => {
    if (confidence >= 0.8) return "High Confidence";
    if (confidence >= 0.6) return "Medium Confidence";
    return "Low Confidence";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Health Insights</h2>
            <p className="text-muted-foreground">
              Personalized analysis based on your cycle data
            </p>
          </div>
        </div>

        {/* Generate Insights Button */}
        <Button
          onClick={handleGenerateInsights}
          disabled={isLoading || !userData}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Analyzing Your Data...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Check Insights
            </>
          )}
        </Button>

        {!userData && (
          <p className="text-sm text-muted-foreground">
            Complete your profile setup to unlock personalized AI insights
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Insights Display */}
      {insights.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Your Personalized Insights
          </h3>

          <div className="grid gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    {insight.icon}
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {insight.title}
                      </h4>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getConfidenceColor(
                          insight.confidence
                        )}`}
                      >
                        {getConfidenceText(insight.confidence)}
                      </div>
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {insight.content}
                    </p>

                    {insight.actionable && (
                      <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                        <CheckCircle className="h-4 w-4" />
                        Actionable Recommendation
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700 font-medium">
              <AlertCircle className="h-4 w-4 inline mr-2" />
              These insights are AI-generated suggestions based on your data
              patterns. Always consult with healthcare professionals for medical
              advice.
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {insights.length === 0 && !isLoading && !error && (
        <div className="text-center py-12 space-y-4">
          <div className="p-4 bg-muted/50 rounded-full w-fit mx-auto">
            <Brain className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground">
              Ready to Analyze
            </h3>
            <p className="text-muted-foreground">
              Click Check Insights to get personalized AI analysis of your cycle
              patterns and health data.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

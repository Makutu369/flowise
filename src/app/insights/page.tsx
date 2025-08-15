"use client";

import AIInsights from "./insights-component";

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            AI Insights
          </h1>
          <p className="text-muted-foreground">
            Get personalized health insights powered by AI
          </p>
        </div>

        <AIInsights />
      </main>
    </div>
  );
}

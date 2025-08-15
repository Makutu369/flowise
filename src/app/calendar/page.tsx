"use client";

import Calendar from "./calendar-component";

export default function CalendarPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Calendar</h1>
          <p className="text-muted-foreground">
            Track your cycle, symptoms, and predictions
          </p>
        </div>

        <Calendar />
      </main>
    </div>
  );
}

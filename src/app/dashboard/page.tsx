"use client";

import { useMemo } from "react";
import {
  CalendarIcon,
  TrendingUp,
  Heart,
  Droplets,
  Moon,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import useUserStore from "../store/user-store";

export default function Dashboard() {
  const { userData, symptomEntries } = useUserStore();

  const cycleData = useMemo(() => {
    if (!userData?.lastPeriodDate || !userData?.averageCycleLength) {
      return {
        currentDay: 0,
        cycleLength: 28,
        nextPeriod: 0,
        lastPeriod: "Not set",
        avgCycleLength: 28,
        periodLength: 5,
      };
    }

    const lastPeriodDate = new Date(userData.lastPeriodDate);
    const today = new Date();
    const daysSinceLastPeriod = Math.floor(
      (today.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const currentDay = (daysSinceLastPeriod % userData.averageCycleLength) + 1;
    const nextPeriod = userData.averageCycleLength - currentDay + 1;

    return {
      currentDay,
      cycleLength: userData.averageCycleLength,
      nextPeriod,
      lastPeriod: lastPeriodDate.toLocaleDateString(),
      avgCycleLength: userData.averageCycleLength,
      periodLength: userData.averagePeriodLength,
    };
  }, [userData]);

  const recentSymptoms = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const todaySymptoms = symptomEntries.filter(
      (entry) => entry.date === today
    );

    if (todaySymptoms.length === 0) {
      return [];
    }

    return todaySymptoms.flatMap((entry) =>
      entry.symptoms.map((symptom) => ({
        name: symptom,
        severity: entry.painLevel
          ? entry.painLevel <= 3
            ? "mild"
            : entry.painLevel <= 7
            ? "moderate"
            : "severe"
          : "mild",
        color: entry.painLevel
          ? entry.painLevel <= 3
            ? "bg-yellow-500"
            : entry.painLevel <= 7
            ? "bg-orange-500"
            : "bg-red-500"
          : "bg-yellow-500",
      }))
    );
  }, [symptomEntries]);

  const currentPhase = useMemo(() => {
    if (!userData?.averageCycleLength)
      return {
        name: "Unknown",
        progress: 0,
        description: "Complete your profile to see cycle phases",
      };

    const { currentDay, cycleLength } = cycleData;
    const ovulationDay = cycleLength - 14;

    if (currentDay <= userData.averagePeriodLength) {
      return {
        name: "Menstrual Phase",
        progress: (currentDay / userData.averagePeriodLength) * 100,
        description: "Your period is active. Focus on rest and self-care.",
      };
    } else if (currentDay <= ovulationDay) {
      return {
        name: "Follicular Phase",
        progress:
          ((currentDay - userData.averagePeriodLength) /
            (ovulationDay - userData.averagePeriodLength)) *
          100,
        description: "Energy levels may be increasing and mood stabilizing.",
      };
    } else if (currentDay <= ovulationDay + 1) {
      return {
        name: "Ovulation",
        progress: 100,
        description: "Peak fertility window. You may feel more energetic.",
      };
    } else {
      return {
        name: "Luteal Phase",
        progress:
          ((currentDay - ovulationDay - 1) / (cycleLength - ovulationDay - 1)) *
          100,
        description: "PMS symptoms may occur. Focus on stress management.",
      };
    }
  }, [userData, cycleData]);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back
            {userData?.name ? `, ${userData.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-muted-foreground">
            Here's your cycle overview and health insights
          </p>
          {!userData && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-700 font-medium">
                <AlertCircle className="h-4 w-4 inline mr-2" />
                Complete your{" "}
                <Link href="/" className="underline hover:no-underline">
                  profile setup
                </Link>{" "}
                to see personalized insights and predictions.
              </p>
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-background border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Current Cycle</h3>
              <CalendarIcon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">
                Day {cycleData.currentDay}
              </div>
              <Progress
                value={(cycleData.currentDay / cycleData.cycleLength) * 100}
                className="h-2"
              />
              <p className="text-sm text-muted-foreground">
                of {cycleData.cycleLength} day cycle
              </p>
            </div>
          </div>

          <div className="bg-background border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Next Period</h3>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">
                {cycleData.nextPeriod} days
              </div>
              <p className="text-sm text-muted-foreground">
                {userData?.lastPeriodDate
                  ? `Expected: ${new Date(
                      Date.now() + cycleData.nextPeriod * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}`
                  : "Set last period date"}
              </p>
            </div>
          </div>

          <div className="bg-background border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Avg Cycle</h3>
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">
                {cycleData.avgCycleLength} days
              </div>
              <p className="text-sm text-muted-foreground">Your average</p>
            </div>
          </div>

          <div className="bg-background border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Period Length</h3>
              <Droplets className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-foreground">
                {cycleData.periodLength} days
              </div>
              <p className="text-sm text-muted-foreground">Average duration</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cycle Phase */}
              <div className="bg-background border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Current Phase
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {currentPhase.name}
                    </span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-muted-foreground">
                        {Math.round(currentPhase.progress)}%
                      </span>
                    </div>
                    <Progress value={currentPhase.progress} className="h-2" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentPhase.description}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-background border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Log
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  >
                    <Droplets className="h-5 w-5" />
                    <span className="text-sm">Flow</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  >
                    <Heart className="h-5 w-5" />
                    <span className="text-sm">Mood</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  >
                    <Moon className="h-5 w-5" />
                    <span className="text-sm">Sleep</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm">Symptoms</span>
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-6">
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Today's Symptoms
              </h3>
              <div className="space-y-4">
                {recentSymptoms.length > 0 ? (
                  recentSymptoms.map((symptom, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full ${symptom.color}`}
                        />
                        <span className="font-medium text-foreground">
                          {symptom.name}
                        </span>
                      </div>
                      <Badge
                        variant={
                          symptom.severity === "mild"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {symptom.severity}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No symptoms logged today</p>
                    <p className="text-sm">
                      Track your symptoms to see patterns over time
                    </p>
                  </div>
                )}
                <Button className="w-full mt-4">Log New Symptom</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-6">
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                AI Predictions
              </h3>
              {userData?.lastPeriodDate && userData?.averageCycleLength ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">
                      Next 3 Cycles
                    </h4>
                    <div className="space-y-2">
                      {[1, 2, 3].map((cycle) => {
                        const nextPeriodDate = new Date(
                          userData.lastPeriodDate
                        );
                        nextPeriodDate.setDate(
                          nextPeriodDate.getDate() +
                            userData.averageCycleLength * cycle
                        );
                        const endDate = new Date(nextPeriodDate);
                        endDate.setDate(
                          endDate.getDate() + userData.averagePeriodLength - 1
                        );

                        return (
                          <div
                            key={cycle}
                            className="flex justify-between items-center p-3 border rounded-lg"
                          >
                            <span className="text-foreground">
                              {cycle === 1
                                ? "Next Period"
                                : cycle === 2
                                ? "Following Period"
                                : "Third Period"}
                            </span>
                            <span className="font-medium text-foreground">
                              {nextPeriodDate.toLocaleDateString()} -{" "}
                              {endDate.toLocaleDateString()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">
                      Fertility Window
                    </h4>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      {(() => {
                        const nextOvulation = new Date(userData.lastPeriodDate);
                        nextOvulation.setDate(
                          nextOvulation.getDate() +
                            userData.averageCycleLength -
                            14
                        );
                        const fertileStart = new Date(nextOvulation);
                        fertileStart.setDate(fertileStart.getDate() - 5);
                        const fertileEnd = new Date(nextOvulation);
                        fertileEnd.setDate(fertileEnd.getDate() + 1);

                        return (
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            Your next fertile window is predicted to be{" "}
                            <strong>
                              {fertileStart.toLocaleDateString()} -{" "}
                              {fertileEnd.toLocaleDateString()}
                            </strong>{" "}
                            based on your cycle patterns.
                          </p>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Complete your profile to see predictions</p>
                  <p className="text-sm">
                    Add your last period date and cycle information
                  </p>
                  <Link href="/">
                    <Button className="mt-4">Complete Profile</Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

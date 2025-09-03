"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Heart,
  Brain,
  Shield,
  CalendarIcon,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { submitUserInfo } from "./action";
import useUserStore from "../store/user-store";
import { useRouter } from "next/navigation";

export default function UserInfoPage() {
  const [state, formAction, isPending] = useActionState(submitUserInfo, {
    success: false,
    message: "",
    error: "",
  });
  const { setUserData } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    if (state.success && state.data) {
      const userData = {
        ...state.data,
        age: Number.parseInt(state.data.age) || 0,
        averageCycleLength:
          Number.parseInt(state.data.averageCycleLength) || 28,
        averagePeriodLength:
          Number.parseInt(state.data.averagePeriodLength) || 5,
      };
      setUserData(userData);
      router.push("/dashboard");
    }
  }, [state.success, state.data, setUserData]);

  const medicalConditionOptions = [
    "PCOS (Polycystic Ovary Syndrome)",
    "Endometriosis",
    "Thyroid disorders",
    "Diabetes",
    "Anemia",
    "Irregular periods",
    "Heavy bleeding",
    "None of the above",
  ];

  const symptomOptions = [
    "Cramps/Pain",
    "Mood changes",
    "Bloating",
    "Headaches",
    "Fatigue",
    "Breast tenderness",
    "Acne",
    "Food cravings",
    "Sleep changes",
    "Energy levels",
  ];

  const notificationOptions = [
    "Period predictions",
    "Fertile window alerts",
    "Symptom reminders",
    "Health insights",
    "Medication reminders",
    "Cycle irregularity alerts",
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Heart className="h-10 w-10 text-pink-500" />
            <h1 className="text-4xl font-bold text-foreground">FloWise</h1>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-medium text-muted-foreground">
              AI-Powered Period Tracker
            </p>
            <p className="text-muted-foreground">
              Help us personalize your experience with some basic information
            </p>
          </div>
        </div>

        {state.message && (
          <div
            className={`p-4 rounded-lg flex items-center gap-3 ${
              state.success
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {state.success ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <p className="font-medium">{state.message}</p>
          </div>
        )}

        <form action={formAction} className="space-y-12">
          {/* Personal Information */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Heart className="h-6 w-6 text-pink-500" />
                Personal Information
              </h2>
              <p className="text-muted-foreground">
                Basic information to get started with your personalized tracking
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-semibold">
                  Age *
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="Enter your age"
                  min="10"
                  max="60"
                  required
                  className="h-11"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="h-11"
                />
              </div>
            </div>
          </div>

          {/* Cycle History */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <CalendarIcon className="h-6 w-6 text-pink-500" />
                Cycle History
              </h2>
              <p className="text-muted-foreground">
                Information about your menstrual cycle to improve AI predictions
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="lastPeriodDate"
                  className="text-sm font-semibold"
                >
                  Last Period Start Date
                </Label>
                <Input
                  id="lastPeriodDate"
                  name="lastPeriodDate"
                  type="date"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="averageCycleLength"
                  className="text-sm font-semibold"
                >
                  Average Cycle Length (days)
                </Label>
                <Select name="averageCycleLength">
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select cycle length" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 21).map(
                      (days) => (
                        <SelectItem key={days} value={days.toString()}>
                          {days} days
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="averagePeriodLength"
                  className="text-sm font-semibold"
                >
                  Average Period Length (days)
                </Label>
                <Select name="averagePeriodLength">
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select period length" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 8 }, (_, i) => i + 2).map((days) => (
                      <SelectItem key={days} value={days.toString()}>
                        {days} days
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 space-y-3">
                <Label className="text-sm font-semibold">
                  How regular are your cycles?
                </Label>
                <RadioGroup name="cycleRegularity">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="very-regular" id="very-regular" />
                    <Label htmlFor="very-regular" className="font-medium">
                      Very regular (within 1-2 days)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem
                      value="somewhat-regular"
                      id="somewhat-regular"
                    />
                    <Label htmlFor="somewhat-regular" className="font-medium">
                      Somewhat regular (within 3-5 days)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="irregular" id="irregular" />
                    <Label htmlFor="irregular" className="font-medium">
                      Irregular (varies significantly)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="unsure" id="unsure" />
                    <Label htmlFor="unsure" className="font-medium">
                      not sure
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Shield className="h-6 w-6 text-pink-500" />
                Health Information
              </h2>
              <p className="text-muted-foreground">
                Health details to provide better insights and recommendations
              </p>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="contraceptiveMethod"
                    className="text-sm font-semibold"
                  >
                    Current Contraceptive Method
                  </Label>
                  <Select name="contraceptiveMethod">
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select contraceptive method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="birth-control-pill">
                        Birth Control Pill
                      </SelectItem>
                      <SelectItem value="iud">IUD</SelectItem>
                      <SelectItem value="implant">Implant</SelectItem>
                      <SelectItem value="injection">Injection</SelectItem>
                      <SelectItem value="condoms">Condoms</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="pregnancyHistory"
                    className="text-sm font-semibold"
                  >
                    Pregnancy History
                  </Label>
                  <Select name="pregnancyHistory">
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select pregnancy history" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never-pregnant">
                        Never been pregnant
                      </SelectItem>
                      <SelectItem value="currently-pregnant">
                        Currently pregnant
                      </SelectItem>
                      <SelectItem value="previously-pregnant">
                        Previously pregnant
                      </SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medications" className="text-sm font-semibold">
                  Current Medications
                </Label>
                <Textarea
                  id="medications"
                  name="medications"
                  placeholder="List any medications you're currently taking (optional)"
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Medical Conditions (select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {medicalConditionOptions.map((condition) => (
                    <div
                      key={condition}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={condition}
                        name="medicalConditions"
                        value={condition}
                      />
                      <Label
                        htmlFor={condition}
                        className="text-sm font-medium leading-relaxed"
                      >
                        {condition}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tracking Preferences */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Brain className="h-6 w-6 text-pink-500" />
                Tracking Preferences
              </h2>
              <p className="text-muted-foreground">
                Choose what symptoms and data you like to track for personalized
                insights
              </p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Symptoms to Track (select all that apply)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {symptomOptions.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-3">
                      <Checkbox
                        id={symptom}
                        name="symptomsToTrack"
                        value={symptom}
                      />
                      <Label htmlFor={symptom} className="text-sm font-medium">
                        {symptom}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox id="mood-tracking" name="moodTracking" />
                  <Label htmlFor="mood-tracking" className="font-medium">
                    Enable detailed mood tracking
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox id="flow-tracking" name="flowTracking" />
                  <Label htmlFor="flow-tracking" className="font-medium">
                    Track menstrual flow intensity
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox id="pain-tracking" name="painTracking" />
                  <Label htmlFor="pain-tracking" className="font-medium">
                    Track pain levels and locations
                  </Label>
                </div>
              </div>
            </div>
          </div>

          {/* Goals and Privacy */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Shield className="h-6 w-6 text-pink-500" />
                Goals & Privacy
              </h2>
              <p className="text-muted-foreground">
                Final preferences to customize your FloWise experience
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="primaryGoal" className="text-sm font-semibold">
                  Primary Goal for Using FloWise
                </Label>
                <Select name="primaryGoal">
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your primary goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="period-prediction">
                      Accurate period prediction
                    </SelectItem>
                    <SelectItem value="fertility-tracking">
                      Fertility and ovulation tracking
                    </SelectItem>
                    <SelectItem value="symptom-management">
                      Symptom pattern recognition
                    </SelectItem>
                    <SelectItem value="health-insights">
                      General health insights
                    </SelectItem>
                    <SelectItem value="cycle-understanding">
                      Better understanding of my cycle
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">
                  Notification Preferences (select all that apply)
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {notificationOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-3">
                      <Checkbox
                        id={option}
                        name="notificationPreferences"
                        value={option}
                      />
                      <Label htmlFor={option} className="text-sm font-medium">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold">Privacy Level</Label>
                <RadioGroup name="privacyLevel">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="high" id="high-privacy" />
                    <Label htmlFor="high-privacy" className="font-medium">
                      High - Store data locally only
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="medium" id="medium-privacy" />
                    <Label htmlFor="medium-privacy" className="font-medium">
                      Medium - Encrypted cloud storage
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="low" id="low-privacy" />
                    <Label htmlFor="low-privacy" className="font-medium">
                      Standard - Allow data for AI improvements
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lifestyle" className="text-sm font-semibold">
                  Lifestyle Information
                </Label>
                <Textarea
                  id="lifestyle"
                  name="lifestyle"
                  placeholder="Tell us about your lifestyle, stress levels, exercise routine, etc. (optional)"
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="additionalNotes"
                  className="text-sm font-semibold"
                >
                  Additional Notes
                </Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  placeholder="Any additional information you'd like to share (optional)"
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 px-12 py-4 text-lg font-semibold rounded-lg transition-colors"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Complete Setup"}
            </Button>
          </div>
        </form>

        {/* Privacy Notice */}
        <div className="p-6 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground text-center font-medium">
            🔒 Your privacy is our priority. All data is encrypted and you
            maintain full control over your information.
          </p>
        </div>
      </div>
    </div>
  );
}

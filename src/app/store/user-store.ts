import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserData {
  // Personal Information
  name: string;
  age: number;
  email: string;

  // Cycle History
  lastPeriodDate: string;
  averageCycleLength: number;
  averagePeriodLength: number;
  cycleRegularity: string;

  // Health Information
  contraceptiveMethod: string;
  pregnancyHistory: string;
  medications: string;
  medicalConditions: string[];

  // Tracking Preferences
  symptomsToTrack: string[];
  moodTracking: boolean;
  flowTracking: boolean;
  painTracking: boolean;

  // Goals and Privacy
  primaryGoal: string;
  notificationPreferences: string[];
  privacyLevel: string;
  lifestyle: string;
  additionalNotes: string;
}

interface UserStore {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;

  // Cycle tracking data
  cycleEntries: CycleEntry[];
  addCycleEntry: (entry: CycleEntry) => void;

  // Symptoms tracking
  symptomEntries: SymptomEntry[];
  addSymptomEntry: (entry: SymptomEntry) => void;

  // AI insights
  aiInsights: AIInsight[];
  addAIInsight: (insight: AIInsight) => void;
}

export interface CycleEntry {
  id: string;
  date: string;
  type: "period_start" | "period_end" | "ovulation" | "fertile_window";
  flow?: "light" | "medium" | "heavy";
  notes?: string;
}

export interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  mood?: number; // 1-10 scale
  painLevel?: number; // 1-10 scale
  painLocation?: string[];
  notes?: string;
}

export interface AIInsight {
  id: string;
  date: string;
  type:
    | "cycle_prediction"
    | "symptom_pattern"
    | "health_recommendation"
    | "fertility_insight";
  title: string;
  content: string;
  confidence: number; // 0-1
  actionable: boolean;
}

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      userData: null,
      setUserData: (data) => set({ userData: data }),
      updateUserData: (data) =>
        set((state) => ({
          userData: state.userData ? { ...state.userData, ...data } : null,
        })),
      clearUserData: () =>
        set({
          userData: null,
          cycleEntries: [],
          symptomEntries: [],
          aiInsights: [],
        }),

      cycleEntries: [],
      addCycleEntry: (entry) =>
        set((state) => ({
          cycleEntries: [...state.cycleEntries, entry],
        })),

      symptomEntries: [],
      addSymptomEntry: (entry) =>
        set((state) => ({
          symptomEntries: [...state.symptomEntries, entry],
        })),

      aiInsights: [],
      addAIInsight: (insight) =>
        set((state) => ({
          aiInsights: [...state.aiInsights, insight],
        })),
    }),
    {
      name: "flowise-user-storage",
      partialize: (state) => ({
        userData: state.userData,
        cycleEntries: state.cycleEntries,
        symptomEntries: state.symptomEntries,
        aiInsights: state.aiInsights,
      }),
    }
  )
);

export default useUserStore;

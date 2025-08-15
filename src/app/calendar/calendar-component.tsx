"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useUserStore from "../store/user-store";

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPeriod: boolean;
  isFertile: boolean;
  isOvulation: boolean;
  isPredicted: boolean;
  symptoms: string[];
}

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { userData, cycleEntries, symptomEntries } = useUserStore();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Calculate cycle predictions based on user data
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Get days from previous month
    const prevMonth = new Date(year, month - 1, 0);
    const daysFromPrevMonth = startingDayOfWeek;

    // Get days for next month
    const totalCells = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;
    const daysFromNextMonth = totalCells - daysInMonth - daysFromPrevMonth;

    const days: CalendarDay[] = [];
    const today = new Date();

    // Add previous month days
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(year, month - 1, prevMonth.getDate() - i + 1);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isPeriod: false,
        isFertile: false,
        isOvulation: false,
        isPredicted: false,
        symptoms: [],
      });
    }

    // Add current month days with cycle predictions
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split("T")[0];

      // Check if it's today
      const isToday = date.toDateString() === today.toDateString();

      // Calculate cycle predictions if user data exists
      let isPeriod = false;
      let isFertile = false;
      let isOvulation = false;
      let isPredicted = false;

      if (userData?.lastPeriodDate && userData?.averageCycleLength) {
        const lastPeriodDate = new Date(userData.lastPeriodDate);
        const daysSinceLastPeriod = Math.floor(
          (date.getTime() - lastPeriodDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const cycleDay =
          (((daysSinceLastPeriod % userData.averageCycleLength) +
            userData.averageCycleLength) %
            userData.averageCycleLength) +
          1;

        // Period days (first few days of cycle)
        if (cycleDay <= (userData.averagePeriodLength || 5)) {
          isPeriod = true;
          isPredicted = daysSinceLastPeriod > 0; // Predicted if not the actual recorded period
        }

        // Fertile window (typically days 10-17 of cycle)
        const ovulationDay = userData.averageCycleLength - 14;
        if (cycleDay >= ovulationDay - 5 && cycleDay <= ovulationDay + 1) {
          isFertile = true;
        }

        // Ovulation day
        if (cycleDay === ovulationDay) {
          isOvulation = true;
        }
      }

      // Get symptoms for this date
      const daySymptoms = symptomEntries
        .filter((entry) => entry.date === dateStr)
        .flatMap((entry) => entry.symptoms);

      days.push({
        date,
        isCurrentMonth: true,
        isToday,
        isPeriod,
        isFertile,
        isOvulation,
        isPredicted,
        symptoms: daySymptoms,
      });
    }

    // Add next month days
    for (let day = 1; day <= daysFromNextMonth; day++) {
      const date = new Date(year, month + 1, day);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        isPeriod: false,
        isFertile: false,
        isOvulation: false,
        isPredicted: false,
        symptoms: [],
      });
    }

    return days;
  }, [currentDate, userData, cycleEntries, symptomEntries]);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getDayClasses = (day: CalendarDay) => {
    let classes =
      "h-12 w-full flex items-center justify-center text-sm font-medium relative transition-colors ";

    if (!day.isCurrentMonth) {
      classes += "text-muted-foreground/40 ";
    } else if (day.isToday) {
      classes += "bg-pink-500 text-white rounded-lg font-bold ";
    } else if (day.isPeriod) {
      classes += day.isPredicted
        ? "bg-pink-100 text-pink-700 rounded-lg border-2 border-dashed border-pink-300 "
        : "bg-pink-200 text-pink-800 rounded-lg ";
    } else if (day.isOvulation) {
      classes += "bg-purple-200 text-purple-800 rounded-lg ";
    } else if (day.isFertile) {
      classes += "bg-blue-100 text-blue-700 rounded-lg ";
    } else {
      classes += "hover:bg-muted rounded-lg ";
    }

    return classes;
  };

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="text-sm bg-transparent"
          >
            Today
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-200 rounded"></div>
          <span>Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-100 border-2 border-dashed border-pink-300 rounded"></div>
          <span>Predicted Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 rounded"></div>
          <span>Fertile Window</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-200 rounded"></div>
          <span>Ovulation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-pink-500 rounded"></div>
          <span>Today</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border rounded-lg overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 bg-muted/50">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-semibold text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className="border-r border-b last:border-r-0 [&:nth-child(7n)]:border-r-0 min-h-[48px] relative"
            >
              <div className={getDayClasses(day)}>
                {day.date.getDate()}

                {/* Symptom indicators */}
                {day.symptoms.length > 0 && (
                  <div className="absolute bottom-1 right-1">
                    <Circle className="h-2 w-2 fill-orange-400 text-orange-400" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cycle Summary */}
      {userData && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-sm">Cycle Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Cycle Length:</span>
              <div className="font-medium">
                {userData.averageCycleLength} days
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Period Length:</span>
              <div className="font-medium">
                {userData.averagePeriodLength} days
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Last Period:</span>
              <div className="font-medium">
                {userData.lastPeriodDate
                  ? new Date(userData.lastPeriodDate).toLocaleDateString()
                  : "Not set"}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Regularity:</span>
              <div className="font-medium capitalize">
                {userData.cycleRegularity?.replace("-", " ") || "Not set"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client"

import { useMemo } from "react"
import { WeekBox } from "@/components/week-box"
import type { ProcessedData } from "@/lib/types"
import { getWeekNumber, getWeeksInYear, getDateRangeForWeek } from "@/lib/date-utils"

interface WeeklyCalendarProps {
  processedData: ProcessedData
  selectedField: string
  palette: "highGood" | "lowGood"
  maxValue: number
}

export function WeeklyCalendar({ processedData, selectedField, palette, maxValue }: WeeklyCalendarProps) {
  const weeklyData = useMemo(() => {
    const { dateField, fields, rows } = processedData
    const fieldType = fields[selectedField].type

    // Group data by week
    const weekData: Record<string, number> = {}
    let minDate: Date | null = null
    let maxDate: Date | null = null

    rows.forEach((row) => {
      const date = new Date(row[dateField])
      if (isNaN(date.getTime())) return

      // Track min and max dates
      if (minDate === null || date < minDate) minDate = new Date(date)
      if (maxDate === null || date > maxDate) maxDate = new Date(date)

      const year = date.getFullYear()
      const week = getWeekNumber(date)
      const weekKey = `${year}-${week}`

      // Initialize if not exists
      if (!weekData[weekKey]) {
        weekData[weekKey] = 0
      }

      // Aggregate based on field type
      if (fieldType === "boolean") {
        const value = row[selectedField]
        if (value === "Yes" || value === "yes" || value === "true" || value === "TRUE" || value === "1") {
          weekData[weekKey] += 1
        }
      } else if (fieldType === "number") {
        const numValue = Number.parseFloat(row[selectedField])
        if (!isNaN(numValue)) {
          weekData[weekKey] += numValue
        }
      }
    })

    return {
      data: weekData,
      minDate,
      maxDate,
    }
  }, [processedData, selectedField])

  const calendarData = useMemo(() => {
    if (!weeklyData.minDate || !weeklyData.maxDate) return []

    const { data, minDate, maxDate } = weeklyData
    const minYear = minDate.getFullYear()
    const maxYear = maxDate.getFullYear()
    const minWeek = getWeekNumber(minDate)
    const maxWeek = getWeekNumber(maxDate)

    const years = []

    for (let year = minYear; year <= maxYear; year++) {
      const weeksInYear = getWeeksInYear(year)
      const startWeek = year === minYear ? minWeek : 1
      const endWeek = year === maxYear ? maxWeek : weeksInYear

      const weeks = []
      for (let week = startWeek; week <= endWeek; week++) {
        const weekKey = `${year}-${week}`
        const value = data[weekKey] || 0
        const dateRange = getDateRangeForWeek(year, week)

        weeks.push({
          week,
          value,
          hasData: weekKey in data,
          startDate: dateRange.start,
          endDate: dateRange.end,
        })
      }

      years.push({
        year,
        weeks,
      })
    }

    return years
  }, [weeklyData])

  if (calendarData.length === 0) {
    return <div className="text-center py-8">No data available for the selected field.</div>
  }

  // Group weeks into 8-week sections
  const groupWeeks = (weeks: typeof calendarData[0]['weeks']) => {
    const groups = [];
    for (let i = 0; i < weeks.length; i += 8) {
      groups.push(weeks.slice(i, i + 8));
    }
    return groups;
  };

  // Create full year of weeks, including empty ones
  const createFullYearWeeks = (year: number, existingWeeks: typeof calendarData[0]['weeks']) => {
    const totalWeeks = 52; // Standard year has 52 weeks
    const weeks = new Array(totalWeeks).fill(null).map((_, index) => {
      const weekNum = index + 1;
      const existingWeek = existingWeeks.find(w => w.week === weekNum);
      if (existingWeek) return existingWeek;

      // Create empty week
      const dateRange = getDateRangeForWeek(year, weekNum);
      return {
        week: weekNum,
        value: 0,
        hasData: false,
        startDate: dateRange.start,
        endDate: dateRange.end,
        isEmpty: true
      };
    });
    return weeks;
  };

  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {calendarData.map((yearData) => {
        const fullYearWeeks = createFullYearWeeks(yearData.year, yearData.weeks);
        const weekGroups = groupWeeks(fullYearWeeks);
        
        return (
          <section key={yearData.year} className="bg-white rounded-lg shadow-sm p-6 flex-grow-0">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">{yearData.year}</h2>
            <div className="space-y-2 flex flex-col items-center">
              {weekGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="flex gap-1 flex-nowrap">
                  {group.map((weekData) => (
                    <WeekBox
                      key={weekData.week}
                      week={weekData.week}
                      value={weekData.value}
                      maxValue={maxValue}
                      palette={palette}
                      hasData={weekData.hasData}
                      startDate={weekData.startDate}
                      endDate={weekData.endDate}
                      isEmpty={weekData.isEmpty}
                    />
                  ))}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  )
}
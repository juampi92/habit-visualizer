export function getWeekNumber(date: Date): number {
  // Create a copy of the date to avoid modifying the original
  const d = new Date(date)

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))

  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))

  // Calculate full weeks to nearest Thursday
  const weekNumber = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)

  return weekNumber
}

export function getWeeksInYear(year: number): number {
  // Check if the year has 53 weeks
  const lastDay = new Date(year, 11, 31)
  const lastWeek = getWeekNumber(lastDay)

  return lastWeek === 1 ? 52 : lastWeek
}

export function getMonthFromWeek(year: number, week: number): number {
  // Approximate the month from the week number
  const date = new Date(year, 0, 1 + (week - 1) * 7)
  return date.getMonth()
}

export function getDateRangeForWeek(year: number, week: number): { start: Date; end: Date } {
  // Get the first day of the year
  const firstDayOfYear = new Date(year, 0, 1)

  // Calculate the first day of the week
  // Find the first day of the year
  const dayOfWeek = firstDayOfYear.getDay() // 0 = Sunday, 1 = Monday, etc.

  // Calculate days to add to get to the first day of week 1
  // If the first day is a Sunday, week 1 starts on that day
  // Otherwise, week 1 starts on the previous Sunday
  const daysToFirstSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek

  // Calculate the start date of the requested week
  const startDate = new Date(year, 0, 1 + daysToFirstSunday + (week - 1) * 7)

  // Calculate the end date (6 days after start date)
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)

  return { start: startDate, end: endDate }
}


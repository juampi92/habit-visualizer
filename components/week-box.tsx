"use client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface WeekBoxProps {
  week: number
  value: number
  maxValue: number
  palette: "highGood" | "lowGood"
  hasData: boolean
  startDate: Date
  endDate: Date
  isEmpty?: boolean
}

export function WeekBox({ week, value, maxValue, palette, hasData, startDate, endDate, isEmpty }: WeekBoxProps) {
  // Format dates for tooltip
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  // Generate color based on palette and value
  const getColor = () => {
    if (!hasData) return "transparent"
    
    // If value is 0, return transparent
    if (value === 0) return "transparent"
    
    // Define an explicit list of 14 colors from green (good) to red (bad)
    const colors = [
      "#2ecc40", // Base Green
      "#34d03d", // Light Forest Green
      "#3dd63a", // Fresh Green
      "#66c75a", // Sage Green
      "#8fbd60", // Muted Green
      "#ffeb3b", // Yellow
      "#ffd700", // Golden Yellow
      "#ffa700", // Orange Yellow
      "#ff851b", // Orange
      "#ff7f50", // Coral
      "#ff4136", // Red Orange
      "#ff0000", // Pure Red
      "#e41a1c", // Bright Red
      "#800000"  // Dark Red
    ]
    
    // Ensure value is within bounds
    const safeValue = Math.max(1, Math.min(value, maxValue))
    
    // Calculate the position in our color array (0 to colors.length - 1)
    let position = Math.round((safeValue - 1) * (colors.length - 1) / (maxValue - 1))
    
    // For highGood palette, reverse the position
    if (palette === "highGood") {
      position = (colors.length - 1) - position
    }
    
    // Ensure position is within bounds
    position = Math.max(0, Math.min(position, colors.length - 1))
    
    return colors[position]
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            className={`w-8 h-8 rounded-md relative transition-all ${!isEmpty && 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-400'}`}
            style={{
              backgroundColor: isEmpty ? '#f3f4f6' : getColor(),
              border: "1px solid rgba(27, 31, 35, 0.06)",
              boxShadow: hasData ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              opacity: isEmpty ? 0.4 : 1
            }}
          >
            {isEmpty && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-[1px] bg-gray-300 rotate-45"></div>
                <div className="w-full h-[1px] bg-gray-300 -rotate-45"></div>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className={`px-3 py-2 ${isEmpty ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-gray-900 text-white border-gray-800'}`}
        >
          <div className="text-xs space-y-1">
            <div className="font-medium">
              {formatDate(startDate)} - {formatDate(endDate)}
            </div>
            <div>Week {week}</div>
            {hasData && <div>Value: {value}</div>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

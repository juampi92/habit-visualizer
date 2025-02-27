"use client"

import { WeekBox } from "@/components/week-box"

interface PalettePreviewProps {
  palette: "highGood" | "lowGood"
  maxValue: number
}

export function PalettePreview({ palette, maxValue }: PalettePreviewProps) {
  // Define the color names from week-box.tsx
  const colorNames = [
    "Base Green",
    "Light Forest Green",
    "Fresh Green",
    "Sage Green",
    "Muted Green",
    "Yellow",
    "Golden Yellow",
    "Orange Yellow",
    "Orange",
    "Coral",
    "Red Orange",
    "Pure Red",
    "Bright Red",
    "Dark Red"
  ]

  // Generate preview boxes
  const boxes = []
  for (let i = 1; i <= maxValue; i++) {
    boxes.push(
      <div key={i} className="flex flex-col items-center gap-1">
        <WeekBox
          week={i}
          value={i}
          maxValue={maxValue}
          palette={palette}
          hasData={true}
          startDate={new Date()}
          endDate={new Date()}
        />
        <span className="text-xs text-gray-600">{i}</span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Palette Preview</div>
      <div className="flex gap-2 items-center">
        {boxes}
      </div>
      <div className="text-xs text-gray-500">
        Colors: {colorNames.join(" → ")}
      </div>
    </div>
  )
}

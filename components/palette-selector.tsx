"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PaletteSelectorProps {
  palette: "highGood" | "lowGood"
  onChange: (palette: "highGood" | "lowGood") => void
}

export function PaletteSelector({ palette, onChange }: PaletteSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Color Palette</Label>
      <RadioGroup value={palette} onValueChange={(value) => onChange(value as "highGood" | "lowGood")}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="highGood" id="high-good" />
          <Label htmlFor="high-good" className="flex items-center gap-2">
            High values are good
            <div className="w-16 h-4 rounded-sm bg-gradient-to-r from-red-500 to-green-500"></div>
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lowGood" id="low-good" />
          <Label htmlFor="low-good" className="flex items-center gap-2">
            Low values are good
            <div className="w-16 h-4 rounded-sm bg-gradient-to-r from-green-500 to-red-500"></div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}


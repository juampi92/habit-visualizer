"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MaxValueInputProps {
  value: number
  onChange: (value: number) => void
}

export function MaxValueInput({ value, onChange }: MaxValueInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="max-value">Maximum Value</Label>
      <Input
        id="max-value"
        type="number"
        min="1"
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value) || 7)}
      />
      <p className="text-xs text-muted-foreground">This sets the scale for color intensity. Default is 7.</p>
    </div>
  )
}


"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { FieldTypes } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface FieldSelectorProps {
  fields: FieldTypes
  selectedField: string | null
  onFieldSelect: (field: string) => void
}

export function FieldSelector({ fields, selectedField, onFieldSelect }: FieldSelectorProps) {
  // Filter to only show boolean and number fields
  const visualizableFields = Object.entries(fields).filter(
    ([_, info]) => info.type === "boolean" || info.type === "number",
  )

  if (visualizableFields.length === 0) {
    return (
      <div className="text-muted-foreground italic">
        No boolean or number fields found in the CSV. Please upload a CSV with boolean or number data to visualize.
      </div>
    )
  }

  return (
    <RadioGroup value={selectedField || undefined} onValueChange={onFieldSelect}>
      <div className="space-y-2">
        {visualizableFields.map(([fieldName, info]) => (
          <div key={fieldName} className="flex items-center space-x-2">
            <RadioGroupItem value={fieldName} id={`field-${fieldName}`} />
            <Label htmlFor={`field-${fieldName}`} className="flex items-center gap-2">
              {fieldName}
              <Badge variant="outline" className="text-xs">
                {info.type}
              </Badge>
            </Label>
          </div>
        ))}
      </div>
    </RadioGroup>
  )
}


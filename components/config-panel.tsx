"use client"
import { FileUpload } from "@/components/file-upload"
import { FieldSelector } from "@/components/field-selector"
import { PaletteSelector } from "@/components/palette-selector"
import { PalettePreview } from "@/components/palette-preview"
import { MaxValueInput } from "@/components/max-value-input"
import type { CSVData, ProcessedData } from "@/lib/types"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ConfigPanelProps {
  isOpen: boolean
  onToggle: () => void
  onCSVUpload: (data: CSVData) => void
  processedData: ProcessedData | null
  selectedField: string | null
  onFieldSelect: (field: string) => void
  palette: "highGood" | "lowGood"
  onPaletteChange: (palette: "highGood" | "lowGood") => void
  maxValue: number
  onMaxValueChange: (value: number) => void
}

export function ConfigPanel({
  isOpen,
  onToggle,
  onCSVUpload,
  processedData,
  selectedField,
  onFieldSelect,
  palette,
  onPaletteChange,
  maxValue,
  onMaxValueChange,
}: ConfigPanelProps) {
  return (
    <Card className="mb-8 bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
      <CardHeader className="pb-2 px-6 pt-6">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-semibold text-gray-900">Data Configuration</CardTitle>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>

      {isOpen && (
        <CardContent className="px-6 pb-6">
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-600">1. Upload CSV Data</h3>
              <FileUpload onUpload={onCSVUpload} />
            </div>

            {processedData && (
              <>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600">2. Select Field to Visualize</h3>
                  <FieldSelector
                    fields={processedData.fields}
                    selectedField={selectedField}
                    onFieldSelect={onFieldSelect}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-600">3. Rendering Options</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <PaletteSelector palette={palette} onChange={onPaletteChange} />
                      <MaxValueInput value={maxValue} onChange={onMaxValueChange} />
                    </div>
                    <PalettePreview palette={palette} maxValue={maxValue} />
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  )
}


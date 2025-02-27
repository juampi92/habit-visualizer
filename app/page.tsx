"use client"

import { useState } from "react"
import { WeeklyCalendar } from "@/components/weekly-calendar"
import { ConfigPanel } from "@/components/config-panel"
import type { CSVData, ProcessedData } from "@/lib/types"
import { processCSVData } from "@/lib/csv-processor"

export default function Home() {
  const [csvData, setCsvData] = useState<CSVData | null>(null)
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null)
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [palette, setPalette] = useState<"highGood" | "lowGood">("highGood")
  const [maxValue, setMaxValue] = useState<number>(7)
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(true)

  const handleCSVUpload = (data: CSVData) => {
    setCsvData(data)
    const processed = processCSVData(data)
    setProcessedData(processed)

    // Auto-select first boolean or number field if available
    const fields = processed.fields
    const autoSelectField = Object.keys(fields).find(
      (key) => fields[key].type === "boolean" || fields[key].type === "number",
    )
    if (autoSelectField) {
      setSelectedField(autoSelectField)
    }
  }

  return (
    <main className="container mx-auto py-12 px-4 max-w-5xl space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">📊 Weekly Calendar Visualization</h1>

      <ConfigPanel
        isOpen={isConfigOpen}
        onToggle={() => setIsConfigOpen(!isConfigOpen)}
        onCSVUpload={handleCSVUpload}
        processedData={processedData}
        selectedField={selectedField}
        onFieldSelect={setSelectedField}
        palette={palette}
        onPaletteChange={setPalette}
        maxValue={maxValue}
        onMaxValueChange={setMaxValue}
      />

      {processedData && selectedField && (
        <WeeklyCalendar
          processedData={processedData}
          selectedField={selectedField}
          palette={palette}
          maxValue={maxValue}
        />
      )}
    </main>
  )
}


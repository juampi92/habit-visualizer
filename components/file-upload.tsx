"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CSVData } from "@/lib/types"
import { Upload } from "lucide-react"
import Papa from "papaparse"

interface FileUploadProps {
  onUpload: (data: CSVData) => void
}

export function FileUpload({ onUpload }: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const showSampleLink = !fileName

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setError(null)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError("Error parsing CSV file. Please check the format.")
          return
        }

        if (results.data.length === 0) {
          setError("The CSV file appears to be empty.")
          return
        }

        onUpload({
          headers: results.meta.fields || [],
          rows: results.data as Record<string, string>[],
        })
      },
      error: (error) => {
        setError(`Error parsing CSV: ${error.message}`)
      },
    })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        {fileName && (
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            {fileName}
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {showSampleLink && (
        <div className="mt-2 text-sm text-gray-600">
          <a 
            href="/sample-habits.csv" 
            download
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            Download sample CSV
          </a>
        </div>
      )}
    </div>
  )
}


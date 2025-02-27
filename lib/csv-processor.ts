import type { CSVData, FieldTypes, ProcessedData } from "./types"

export function processCSVData(data: CSVData): ProcessedData {
  const { headers, rows } = data

  // Identify date field
  const dateField = identifyDateField(headers, rows)

  // Identify field types
  const fields = identifyFieldTypes(headers, rows)

  return {
    dateField,
    fields,
    rows,
  }
}

function identifyDateField(headers: string[], rows: Record<string, string>[]): string {
  // Look for common date field names
  const dateFieldNames = ["date", "day", "timestamp", "time", "datetime"]
  const dateField = headers.find((header) => dateFieldNames.some((name) => header.toLowerCase().includes(name)))

  if (dateField) return dateField

  // Try to identify date field by checking if values are valid dates
  for (const header of headers) {
    const sampleValue = rows[0]?.[header]
    if (sampleValue && isValidDate(sampleValue)) {
      return header
    }
  }

  // Default to first field if no date field is found
  return headers[0]
}

function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  return !isNaN(date.getTime())
}

// Update the identifyFieldTypes function to better detect numeric fields
function identifyFieldTypes(headers: string[], rows: Record<string, string>[]): FieldTypes {
  const fields: FieldTypes = {}

  headers.forEach((header) => {
    // Sample up to 100 values for this field
    const sampleSize = Math.min(rows.length, 20)
    const values = rows.slice(0, sampleSize).map((row) => row[header])

    // Check if field is a date
    if (values.length > 0 && isValidDate(values[0])) {
      fields[header] = { type: "date" }
      return
    }

    // Check if field is boolean
    const booleanValues = ["yes", "no", "true", "false", "1", "0"]
    const nonEmptyValues = values.filter(value => value.trim() !== "")
    const isBooleanField = nonEmptyValues.length > 0 && nonEmptyValues.every((value) => {
      const normalizedValue = value.trim().toLowerCase()
      return booleanValues.includes(normalizedValue)
    })

    if (isBooleanField) {
      fields[header] = { type: "boolean" }
      return
    }

    // Check if field is numeric - improved to handle strings that contain numbers
    const nonEmptyNumericValues = values.filter(value => value.trim() !== "")
    const isNumericField = nonEmptyNumericValues.length > 0 && nonEmptyNumericValues.every((value) => {
      // Try to parse as number and ensure it's a valid integer or decimal
      const trimmed = value.trim()
      const num = Number(trimmed)
      return !isNaN(num) && isFinite(num) && /^-?\d*\.?\d+$/.test(trimmed)
    })

    if (isNumericField) {
      fields[header] = { type: "number" }
      return
    }

    // Check if field has unique values
    const uniqueValues = new Set(values)
    if (uniqueValues.size >= sampleSize * 0.9) {
      fields[header] = { type: "unique" }
      return
    }

    // Default to text
    fields[header] = {
      type: "text",
      uniqueValues: Array.from(uniqueValues),
    }
  })

  return fields
}


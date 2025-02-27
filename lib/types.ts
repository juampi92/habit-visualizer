export interface CSVData {
  headers: string[]
  rows: Record<string, string>[]
}

export type FieldType = "boolean" | "number" | "text" | "unique" | "date"

export interface FieldInfo {
  type: FieldType
  uniqueValues?: string[]
}

export type FieldTypes = Record<string, FieldInfo>

export interface ProcessedData {
  dateField: string
  fields: FieldTypes
  rows: Record<string, string>[]
}


import type { QuestionnaireData } from "@/hooks/use-questionnaire"

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"

export interface FieldDataPayload {
  Soil_Type: string
  Soil_pH: number
  Electrical_Conductivity: number
  Crop_Type: string
  Crop_Growth_Stage: string
  Irrigation_Type: string
  Water_Source: string
  Field_Area_hectare: number
  Mulching_Used: string
  Previous_Irrigation_mm: number
  Organic_Carbon: number
  latitude: number
  longitude: number
}

export interface PredictionResponse {
  success: boolean
  predicted_water_usage: number
}

function buildPayload(data: QuestionnaireData): FieldDataPayload {
  const requiredStrings: (keyof QuestionnaireData)[] = [
    "Crop_Type",
    "Crop_Growth_Stage",
    "Irrigation_Type",
    "Water_Source",
    "Soil_Type",
    "Mulching_Used",
  ]
  for (const key of requiredStrings) {
    if (!data[key]) {
      throw new Error(`Missing required field: ${key}`)
    }
  }

  const requiredNumbers: (keyof QuestionnaireData)[] = [
    "Field_Area_hectare",
    "Previous_Irrigation_mm",
    "Soil_pH",
    "Electrical_Conductivity",
    "Organic_Carbon",
    "latitude",
    "longitude",
  ]
  for (const key of requiredNumbers) {
    if (data[key] === null || data[key] === undefined) {
      throw new Error(`Missing required field: ${key}`)
    }
  }

  return {
    Crop_Type: data.Crop_Type,
    Crop_Growth_Stage: data.Crop_Growth_Stage,
    Irrigation_Type: data.Irrigation_Type,
    Water_Source: data.Water_Source,
    Soil_Type: data.Soil_Type,
    Mulching_Used: data.Mulching_Used,
    Field_Area_hectare: data.Field_Area_hectare as number,
    Previous_Irrigation_mm: data.Previous_Irrigation_mm as number,
    Soil_pH: data.Soil_pH as number,
    Electrical_Conductivity: data.Electrical_Conductivity as number,
    Organic_Carbon: data.Organic_Carbon as number,
    latitude: data.latitude as number,
    longitude: data.longitude as number,
  }
}

export async function submitFieldData(
  data: QuestionnaireData,
): Promise<PredictionResponse> {
  const payload = buildPayload(data)

  const response = await fetch(`${API_BASE_URL}/field_data`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`)
  }

  const result: PredictionResponse = await response.json()

  if (!result.success) {
    throw new Error("Prediction failed on the server")
  }

  return result
}

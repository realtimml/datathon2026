import { useState } from "react"

export interface QuestionnaireData {
  Crop_Type: string
  Crop_Growth_Stage: string
  Field_Area_hectare: number | null
  Irrigation_Type: string
  Water_Source: string
  Mulching_Used: string
  Previous_Irrigation_mm: number | null
  Soil_Type: string
  Soil_pH: number | null
  Electrical_Conductivity: number | null
  Organic_Carbon: number | null
  latitude: number | null
  longitude: number | null
}

const initialData: QuestionnaireData = {
  Crop_Type: "",
  Crop_Growth_Stage: "",
  Field_Area_hectare: null,
  Irrigation_Type: "",
  Water_Source: "",
  Mulching_Used: "",
  Previous_Irrigation_mm: null,
  Soil_Type: "",
  Soil_pH: null,
  Electrical_Conductivity: null,
  Organic_Carbon: null,
  latitude: null,
  longitude: null,
}

export const TOTAL_STEPS = 3

export function useQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(1)
  const [data, setData] = useState<QuestionnaireData>(initialData)

  const updateField = <K extends keyof QuestionnaireData>(
    field: K,
    value: QuestionnaireData[K]
  ) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const goToStep = (step: number) => {
    if (step >= 1 && step <= TOTAL_STEPS) {
      setCurrentStep(step)
    }
  }

  const resetForm = () => {
    setData(initialData)
    setCurrentStep(1)
  }

  return {
    currentStep,
    data,
    updateField,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    isFirstStep: currentStep === 1,
    isLastStep: currentStep === TOTAL_STEPS,
  }
}

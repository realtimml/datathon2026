import { useState } from "react"

export interface QuestionnaireData {
  crop_type: string
  Crop_Growth_Stage: string
  field_area: number | null
  irrigation_type: string
  water_source: string
  mulching_used: boolean | null
  previous_water_usage: number | null
  Soil_Type: string
  Soil_pH: number | null
  Electrical_Conductivity: number | null
  Organic_Carbon: number | null
  latitude: number | null
  longitude: number | null
}

const initialData: QuestionnaireData = {
  crop_type: "",
  Crop_Growth_Stage: "",
  field_area: null,
  irrigation_type: "",
  water_source: "",
  mulching_used: null,
  previous_water_usage: null,
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

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { QuestionnaireData } from "@/hooks/use-questionnaire"

interface StepCropInfoProps {
  data: QuestionnaireData
  updateField: <K extends keyof QuestionnaireData>(
    field: K,
    value: QuestionnaireData[K]
  ) => void
}

const cropTypes = [
  "Cotton",
  "Maize",
  "Potato",
  "Rice",
  "Sugarcane",
  "Wheat",
]

const cropGrowthStages = [
  "Flowering",
  "Harvest",
  "Sowing",
  "Vegetative",
]

const mulchingOptions = ["Yes", "No"]

export function StepCropInfo({ data, updateField }: StepCropInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="Crop_Type">Crop Type</Label>
        <Select
          value={data.Crop_Type}
          onValueChange={(value) => updateField("Crop_Type", value)}
        >
          <SelectTrigger id="Crop_Type">
            <SelectValue placeholder="Select crop type" />
          </SelectTrigger>
          <SelectContent>
            {cropTypes.map((crop) => (
              <SelectItem key={crop} value={crop}>
                {crop}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="Crop_Growth_Stage">Crop Growth Stage</Label>
        <Select
          value={data.Crop_Growth_Stage}
          onValueChange={(value) => updateField("Crop_Growth_Stage", value)}
        >
          <SelectTrigger id="Crop_Growth_Stage">
            <SelectValue placeholder="Select growth stage" />
          </SelectTrigger>
          <SelectContent>
            {cropGrowthStages.map((stage) => (
              <SelectItem key={stage} value={stage}>
                {stage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="Field_Area_hectare">Field Area (hectares)</Label>
        <Input
          id="Field_Area_hectare"
          type="number"
          placeholder="Enter field area"
          min="0.1"
          max="1000"
          step="0.1"
          value={data.Field_Area_hectare ?? ""}
          onChange={(e) =>
            updateField(
              "Field_Area_hectare",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="Mulching_Used">Mulching Used</Label>
        <Select
          value={data.Mulching_Used}
          onValueChange={(value) => updateField("Mulching_Used", value)}
        >
          <SelectTrigger id="Mulching_Used">
            <SelectValue placeholder="Select mulching status" />
          </SelectTrigger>
          <SelectContent>
            {mulchingOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

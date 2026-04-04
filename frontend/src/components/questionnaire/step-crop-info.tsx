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
  "Rice",
  "Wheat",
  "Corn",
  "Soybean",
  "Cotton",
  "Sugarcane",
  "Other",
]

const mulchingOptions = ["Yes", "No"]

export function StepCropInfo({ data, updateField }: StepCropInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="crop_type">Crop Type</Label>
        <Select
          value={data.crop_type}
          onValueChange={(value) => updateField("crop_type", value)}
        >
          <SelectTrigger id="crop_type">
            <SelectValue placeholder="Select crop type" />
          </SelectTrigger>
          <SelectContent>
            {cropTypes.map((crop) => (
              <SelectItem key={crop} value={crop.toLowerCase()}>
                {crop}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="field_area">Field Area (hectares)</Label>
        <Input
          id="field_area"
          type="number"
          placeholder="Enter field area"
          min="0.1"
          max="1000"
          step="0.1"
          value={data.field_area ?? ""}
          onChange={(e) =>
            updateField(
              "field_area",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="mulching_used">Mulching Used</Label>
        <Select
          value={data.mulching_used === null ? "" : data.mulching_used ? "yes" : "no"}
          onValueChange={(value) => updateField("mulching_used", value === "yes")}
        >
          <SelectTrigger id="mulching_used">
            <SelectValue placeholder="Select mulching status" />
          </SelectTrigger>
          <SelectContent>
            {mulchingOptions.map((option) => (
              <SelectItem key={option} value={option.toLowerCase()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

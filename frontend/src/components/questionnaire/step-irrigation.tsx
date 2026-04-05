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

interface StepIrrigationProps {
  data: QuestionnaireData
  updateField: <K extends keyof QuestionnaireData>(
    field: K,
    value: QuestionnaireData[K]
  ) => void
}

const irrigationTypes = ["Canal", "Drip", "Rainfed", "Sprinkler"]

const waterSources = [
  "Groundwater",
  "Rainwater",
  "Reservoir",
  "River",
]

export function StepIrrigation({ data, updateField }: StepIrrigationProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="Irrigation_Type">Irrigation Type</Label>
        <Select
          value={data.Irrigation_Type}
          onValueChange={(value) => updateField("Irrigation_Type", value)}
        >
          <SelectTrigger id="Irrigation_Type">
            <SelectValue placeholder="Select irrigation type" />
          </SelectTrigger>
          <SelectContent>
            {irrigationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="Water_Source">Water Source</Label>
        <Select
          value={data.Water_Source}
          onValueChange={(value) => updateField("Water_Source", value)}
        >
          <SelectTrigger id="Water_Source">
            <SelectValue placeholder="Select water source" />
          </SelectTrigger>
          <SelectContent>
            {waterSources.map((source) => (
              <SelectItem key={source} value={source}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="Previous_Irrigation_mm">
          Previous Irrigation (mm)
        </Label>
        <Input
          id="Previous_Irrigation_mm"
          type="number"
          placeholder="Enter previous irrigation amount"
          min="0"
          max="500"
          step="1"
          value={data.Previous_Irrigation_mm ?? ""}
          onChange={(e) =>
            updateField(
              "Previous_Irrigation_mm",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
        />
      </div>
    </div>
  )
}

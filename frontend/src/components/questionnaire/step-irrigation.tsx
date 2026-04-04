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

const irrigationTypes = ["Drip", "Sprinkler", "Flood", "Furrow", "None"]

const waterSources = [
  "Groundwater",
  "River",
  "Canal",
  "Rainwater",
  "Municipal",
]

export function StepIrrigation({ data, updateField }: StepIrrigationProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="irrigation_type">Irrigation Type</Label>
        <Select
          value={data.irrigation_type}
          onValueChange={(value) => updateField("irrigation_type", value)}
        >
          <SelectTrigger id="irrigation_type">
            <SelectValue placeholder="Select irrigation type" />
          </SelectTrigger>
          <SelectContent>
            {irrigationTypes.map((type) => (
              <SelectItem key={type} value={type.toLowerCase()}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="water_source">Water Source</Label>
        <Select
          value={data.water_source}
          onValueChange={(value) => updateField("water_source", value)}
        >
          <SelectTrigger id="water_source">
            <SelectValue placeholder="Select water source" />
          </SelectTrigger>
          <SelectContent>
            {waterSources.map((source) => (
              <SelectItem key={source} value={source.toLowerCase()}>
                {source}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="previous_water_usage">
          Previous Water Usage (mm)
        </Label>
        <Input
          id="previous_water_usage"
          type="number"
          placeholder="Enter previous water usage"
          min="0"
          max="500"
          step="1"
          value={data.previous_water_usage ?? ""}
          onChange={(e) =>
            updateField(
              "previous_water_usage",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
        />
      </div>
    </div>
  )
}

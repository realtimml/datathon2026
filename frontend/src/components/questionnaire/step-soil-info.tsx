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

interface StepSoilInfoProps {
  data: QuestionnaireData
  updateField: <K extends keyof QuestionnaireData>(
    field: K,
    value: QuestionnaireData[K]
  ) => void
}

const soilTypes = [
  "Clay",
  "Loamy",
  "Sandy",
  "Silt",
]

export function StepSoilInfo({ data, updateField }: StepSoilInfoProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="Soil_Type">Soil Type</Label>
        <Select
          value={data.Soil_Type}
          onValueChange={(value) => updateField("Soil_Type", value)}
        >
          <SelectTrigger id="Soil_Type">
            <SelectValue placeholder="Select soil type" />
          </SelectTrigger>
          <SelectContent>
            {soilTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="Soil_pH">Soil pH</Label>
        <Input
          id="Soil_pH"
          type="number"
          placeholder="0 - 14"
          min="0"
          max="14"
          step="0.1"
          value={data.Soil_pH ?? ""}
          onChange={(e) =>
            updateField(
              "Soil_pH",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="Electrical_Conductivity">
          Electrical Conductivity (dS/m)
        </Label>
        <Input
          id="Electrical_Conductivity"
          type="number"
          placeholder="Enter value in dS/m"
          min="0"
          step="0.01"
          value={data.Electrical_Conductivity ?? ""}
          onChange={(e) =>
            updateField(
              "Electrical_Conductivity",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="Organic_Carbon">Organic Carbon (%)</Label>
        <Input
          id="Organic_Carbon"
          type="number"
          placeholder="Enter percentage"
          min="0"
          step="0.01"
          value={data.Organic_Carbon ?? ""}
          onChange={(e) =>
            updateField(
              "Organic_Carbon",
              e.target.value ? parseFloat(e.target.value) : null
            )
          }
        />
      </div>
    </div>
  )
}

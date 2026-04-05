import { useState } from "react"
import { MapPin, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { QuestionnaireData } from "@/hooks/use-questionnaire"

interface StepLocationProps {
  data: QuestionnaireData
  updateField: <K extends keyof QuestionnaireData>(
    field: K,
    value: QuestionnaireData[K]
  ) => void
}

export function StepLocation({ data, updateField }: StepLocationProps) {
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser")
      return
    }

    setLocating(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        updateField("latitude", parseFloat(position.coords.latitude.toFixed(6)))
        updateField("longitude", parseFloat(position.coords.longitude.toFixed(6)))
        setLocating(false)
      },
      (err) => {
        setLocating(false)
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Location permission denied. Please allow access or enter manually.")
            break
          case err.POSITION_UNAVAILABLE:
            setError("Location unavailable. Please enter coordinates manually.")
            break
          case err.TIMEOUT:
            setError("Location request timed out. Please try again.")
            break
          default:
            setError("Could not get your location. Please enter manually.")
        }
      },
      { enableHighAccuracy: true, timeout: 10000 },
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Enter your field location manually or use your device's GPS
        </p>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGeolocation}
          disabled={locating}
        >
          {locating ? (
            <Loader2 data-icon="inline-start" className="animate-spin" />
          ) : (
            <MapPin data-icon="inline-start" />
          )}
          {locating ? "Locating…" : "Use My Location"}
        </Button>
        {error && (
          <p className="text-sm text-destructive mt-2">{error}</p>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or enter manually
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            placeholder="-90 to 90"
            min="-90"
            max="90"
            step="0.000001"
            value={data.latitude ?? ""}
            onChange={(e) =>
              updateField(
                "latitude",
                e.target.value ? parseFloat(e.target.value) : null
              )
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            placeholder="-180 to 180"
            min="-180"
            max="180"
            step="0.000001"
            value={data.longitude ?? ""}
            onChange={(e) =>
              updateField(
                "longitude",
                e.target.value ? parseFloat(e.target.value) : null
              )
            }
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Coordinates are used to determine local climate and soil conditions
      </p>
    </div>
  )
}

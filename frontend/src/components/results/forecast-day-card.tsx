import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Droplets, Thermometer, Wind, DollarSign } from "lucide-react"

interface ForecastDayCardProps {
  date: Date
  waterNeededLiters: number
  temperatureCelsius: number
  humidityPercent: number
  windSpeedKmh: number
  pumpingCost: number
  isToday?: boolean
}

function formatDay(date: Date, isToday: boolean): string {
  if (isToday) return "Today"
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
}

export function ForecastDayCard({
  date,
  waterNeededLiters,
  temperatureCelsius,
  humidityPercent,
  windSpeedKmh,
  pumpingCost,
  isToday = false,
}: ForecastDayCardProps) {
  return (
    <Card className="min-w-48 shrink-0 flex flex-col lg:min-w-0 lg:shrink">
      <CardHeader className="pb-2">
        <CardTitle
          className={cn(
            "text-sm font-medium",
            isToday ? "text-primary" : "text-muted-foreground",
          )}
        >
          {formatDay(date, isToday)}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {/* Water needed */}
        <div>
          <div className="text-2xl font-bold tracking-tight">
            {waterNeededLiters.toLocaleString()}
            <span className="text-sm font-normal ml-1">L</span>
          </div>
          <p className="text-xs text-muted-foreground">Water needed</p>
        </div>

        {/* Weather metrics */}
        <div className="flex flex-col gap-1.5 border-t pt-3">
          <div className="flex items-center gap-2 text-sm">
            <Thermometer data-icon="inline-start" className="text-muted-foreground" />
            <span>{temperatureCelsius}°C</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Droplets data-icon="inline-start" className="text-muted-foreground" />
            <span>{humidityPercent}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wind data-icon="inline-start" className="text-muted-foreground" />
            <span>{windSpeedKmh} km/h</span>
          </div>
        </div>

        {/* Cost */}
        <div className="flex items-center gap-2 border-t pt-3 text-sm font-medium">
          <DollarSign data-icon="inline-start" className="text-muted-foreground" />
          <span>${pumpingCost.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

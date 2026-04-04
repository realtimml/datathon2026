import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface WpiCardProps {
  waterNeededLiters: number
}

export function WpiCard({ waterNeededLiters }: WpiCardProps) {
  const [projectedYieldValue, setProjectedYieldValue] = useState<number | null>(null)

  const wpi = useMemo(() => {
    if (projectedYieldValue === null || projectedYieldValue <= 0) return null
    if (waterNeededLiters <= 0) return null
    return projectedYieldValue / waterNeededLiters
  }, [projectedYieldValue, waterNeededLiters])

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Water Productivity Index
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="text-3xl font-bold tracking-tight">
          {wpi !== null ? wpi.toFixed(4) : "—"}
          {wpi !== null && (
            <span className="text-lg font-normal ml-1">$/L</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Yield value per liter of water applied
        </p>
        
        <div className="mt-4 pt-4 border-t">
          <Label htmlFor="yieldValue" className="text-xs">
            Projected Yield Value ($)
          </Label>
          <Input
            id="yieldValue"
            type="number"
            placeholder="Enter yield value"
            min="0"
            step="0.01"
            className="mt-1"
            value={projectedYieldValue ?? ""}
            onChange={(e) =>
              setProjectedYieldValue(
                e.target.value ? parseFloat(e.target.value) : null
              )
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}

import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/results/metric-card'
import { ChartPlaceholder } from '@/components/results/chart-placeholder'
import type { QuestionnaireData } from '@/hooks/use-questionnaire'

interface ResultsSearch {
  data?: string
}

export const Route = createFileRoute('/results')({
  component: ResultsPage,
  validateSearch: (search: Record<string, unknown>): ResultsSearch => {
    return {
      data: typeof search.data === 'string' ? search.data : undefined,
    }
  },
})

function ResultsPage() {
  const { data: dataParam } = Route.useSearch()
  const [projectedYieldValue, setProjectedYieldValue] = useState<number | null>(null)

  const questionnaireData: QuestionnaireData | null = useMemo(() => {
    if (!dataParam) return null
    try {
      return JSON.parse(dataParam) as QuestionnaireData
    } catch {
      return null
    }
  }, [dataParam])

  // Mock results data (would come from backend in real implementation)
  const waterNeededLiters = 12500
  const pumpingCost = 45.50

  // Calculate Water Productivity Index
  const wpi = useMemo(() => {
    if (projectedYieldValue === null || projectedYieldValue <= 0) return null
    if (waterNeededLiters <= 0) return null
    return projectedYieldValue / waterNeededLiters
  }, [projectedYieldValue, waterNeededLiters])

  return (
    <div className="flex flex-col gap-8 py-12 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Results Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Water requirements and cost analysis for your field
        </p>
      </div>

      {/* Hero Metric - Water Needed */}
      <MetricCard
        variant="hero"
        title="Water Needed"
        value={waterNeededLiters}
        unit="L"
        description="Total water required for your crops based on field conditions"
      />

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MetricCard
          title="Estimated Pumping Cost"
          value={`$${pumpingCost.toFixed(2)}`}
          description="Based on local energy rates"
        />
        <MetricCard
          title="Water Productivity Index"
          value={wpi !== null ? wpi.toFixed(4) : "—"}
          unit={wpi !== null ? "$/L" : ""}
          description="Yield value per liter of water applied"
        />
      </div>

      {/* Projected Yield Input for WPI Calculation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Calculate Water Productivity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 max-w-xs">
            <Label htmlFor="yieldValue">Projected Yield Value ($)</Label>
            <Input
              id="yieldValue"
              type="number"
              placeholder="Enter expected yield value"
              min="0"
              step="0.01"
              value={projectedYieldValue ?? ""}
              onChange={(e) =>
                setProjectedYieldValue(
                  e.target.value ? parseFloat(e.target.value) : null
                )
              }
            />
            <p className="text-xs text-muted-foreground">
              Enter your projected crop yield value to calculate the Water Productivity Index
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Chart Placeholders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartPlaceholder
          title="Water Usage Over Time"
          description="Historical and projected water consumption"
        />
        <ChartPlaceholder
          title="Cost Breakdown"
          description="Pumping costs by category"
        />
      </div>

      {/* Debug: Show submitted data */}
      {questionnaireData && (
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Submitted Field Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(questionnaireData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

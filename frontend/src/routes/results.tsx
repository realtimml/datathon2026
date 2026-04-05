import { useMemo } from "react"
import { createFileRoute } from "@tanstack/react-router"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricCard } from "@/components/results/metric-card"
import { ChartPlaceholder } from "@/components/results/chart-placeholder"
import { WpiCard } from "@/components/results/wpi-card"
import { ForecastDayCard } from "@/components/results/forecast-day-card"
import { ForecastChart } from "@/components/results/forecast-chart"
import { WorkflowProgress } from "@/components/workflow-progress"
import { generateMockForecast } from "@/lib/mock-forecast"

export const Route = createFileRoute("/results")({
  component: ResultsPage,
})

function ResultsPage() {
  const waterNeededLiters = 12500
  const pumpingCost = 45.5

  const forecast = useMemo(
    () => generateMockForecast(waterNeededLiters, pumpingCost),
    [waterNeededLiters, pumpingCost],
  )

  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r p-4">
        <Card className="sticky top-4 p-4">
          <WorkflowProgress currentPage="results" />
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="today" className="flex flex-col gap-4">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="flex flex-col gap-4">
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
              <WpiCard waterNeededLiters={waterNeededLiters} />
            </div>

            {/* Chart Placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
              <ChartPlaceholder
                title="Water Usage Over Time"
                description="Historical and projected water consumption"
              />
              <ChartPlaceholder
                title="Cost Breakdown"
                description="Pumping costs by category"
              />
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="flex flex-col gap-4 p-1">
            <ForecastChart forecast={forecast} />

            <div className="flex gap-4 pb-4 lg:grid lg:grid-cols-5">
              {forecast.map((day, i) => (
                <ForecastDayCard key={day.date.toISOString()} isToday={i === 0} {...day} />
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard
                title="Projected Total Water Usage"
                value={forecast.reduce((sum, d) => sum + d.waterNeededLiters, 0)}
                unit="L"
                description="Combined water needed over 5 days"
              />
              <MetricCard
                title="Projected Total Cost"
                value={`$${forecast.reduce((sum, d) => sum + d.pumpingCost, 0).toFixed(2)}`}
                description="Combined pumping cost over 5 days"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

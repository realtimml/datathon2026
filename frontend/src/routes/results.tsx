import { createFileRoute } from '@tanstack/react-router'
import { Card } from '@/components/ui/card'
import { MetricCard } from '@/components/results/metric-card'
import { ChartPlaceholder } from '@/components/results/chart-placeholder'
import { WpiCard } from '@/components/results/wpi-card'
import { WorkflowProgress } from '@/components/workflow-progress'

export const Route = createFileRoute('/results')({
  component: ResultsPage,
})

function ResultsPage() {
  // Mock results data (would come from backend in real implementation)
  const waterNeededLiters = 12500
  const pumpingCost = 45.50

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r p-4">
        <Card className="sticky top-4 p-4">
          <WorkflowProgress currentPage="results" />
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden p-6">
        <div className="flex flex-col gap-4 h-full">
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
        </div>
      </main>
    </div>
  )
}

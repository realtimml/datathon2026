import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { ForecastDay } from "@/lib/mock-forecast"

interface ForecastChartProps {
  forecast: ForecastDay[]
}

const chartConfig = {
  waterNeededLiters: {
    label: "Water Needed",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ForecastChart({ forecast }: ForecastChartProps) {
  const chartData = forecast.map((day) => ({
    day: day.date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
    waterNeededLiters: day.waterNeededLiters,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Water Usage Forecast
        </CardTitle>
        <CardDescription>Projected daily water needs over 5 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[110px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{ left: 12, right: 12, top: 4 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tick={{ fontSize: 11 }}
              tickCount={3}
              tickFormatter={(value) => `${(Number(value) / 1000).toFixed(0)}k`}
              domain={["dataMin - 500", "dataMax + 500"]}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    `${Number(value).toLocaleString()} L`
                  }
                />
              }
            />
            <defs>
              <linearGradient id="waterFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-waterNeededLiters)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-waterNeededLiters)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="waterNeededLiters"
              type="monotone"
              fill="url(#waterFill)"
              stroke="var(--color-waterNeededLiters)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

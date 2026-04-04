import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  unit?: string
  description?: string
  variant?: "hero" | "default"
}

export function MetricCard({
  title,
  value,
  unit,
  description,
  variant = "default",
}: MetricCardProps) {
  const isHero = variant === "hero"

  return (
    <Card
      className={cn(
        isHero && "bg-primary text-primary-foreground"
      )}
    >
      <CardHeader className={cn(isHero ? "pb-2" : "pb-2")}>
        <CardTitle
          className={cn(
            "font-medium",
            isHero
              ? "text-lg text-primary-foreground/80"
              : "text-sm text-muted-foreground"
          )}
        >
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "font-bold tracking-tight",
            isHero ? "text-5xl md:text-6xl" : "text-3xl"
          )}
        >
          {typeof value === "number" ? value.toLocaleString() : value}
          {unit && (
            <span
              className={cn(
                "font-normal",
                isHero ? "text-2xl md:text-3xl ml-2" : "text-lg ml-1"
              )}
            >
              {unit}
            </span>
          )}
        </div>
        {description && (
          <p
            className={cn(
              "mt-2",
              isHero
                ? "text-sm text-primary-foreground/70"
                : "text-xs text-muted-foreground"
            )}
          >
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

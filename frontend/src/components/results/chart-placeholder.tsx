import { BarChart3 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartPlaceholderProps {
  title: string
  description?: string
}

export function ChartPlaceholder({ title, description }: ChartPlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-muted rounded-lg">
          <BarChart3 className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-2 text-sm text-muted-foreground">
            {description || "Chart coming soon"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

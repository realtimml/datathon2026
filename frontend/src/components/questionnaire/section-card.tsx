import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface SectionCardProps {
  id: string
  title: string
  description: string
  children: React.ReactNode
}

export function SectionCard({
  id,
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <Card id={id} className="scroll-mt-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

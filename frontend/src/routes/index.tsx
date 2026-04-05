import { createFileRoute, Link } from '@tanstack/react-router'
import { Droplets, Calculator, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import heroImage from '../../assets/hero.jpg'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const features = [
  {
    icon: Droplets,
    title: "Water Analysis",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.",
  },
  {
    icon: Calculator,
    title: "Cost Estimation",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
  {
    icon: BarChart3,
    title: "Productivity Index",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.",
  },
]

function HomePage() {
  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-8rem)]">
      {/* Hero Card */}
      <Card className="flex-1">
        <div className="grid md:grid-cols-2 h-full">
          <div className="p-6 md:p-8 flex items-center">
            <img
              src={heroImage}
              alt="Irrigation field with sprinklers"
              className="w-full h-full min-h-[200px] rounded-lg object-cover"
            />
          </div>
          <CardContent className="flex flex-col justify-center gap-4 p-6 md:p-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
              Optimize Your Irrigation with AI-Powered Insights
            </h1>
            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="pt-2">
              <Button asChild size="lg">
                <Link to="/questionnaire">Get Started</Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

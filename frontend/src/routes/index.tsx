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
    title: "Optimize Water Usage",
    description: "Our Machine Learning models take into account various factors such as weather conditions, soil type, and crop requirements to help you find the minimum amount of usage, maximizing you business’s crop yields. Save water and reduce costs with the cutting-edge technology at your fingertips.",
  },
  {
    icon: Calculator,
    title: "Estimate Costs",
    description: "Estimate your irrigation costs with precision. We pair our pinpoint-accurate metrics with electricity rates local to your buisness to provide you with accurate cost predictions. Make informed decisions and optimize your budget effectively.",
  },
  {
    icon: BarChart3,
    title: "Forecast into the Future",
    description: "Our five-day forecasts provide you with insights into future irrigation needs. By analyzing historical data and current conditions, we help you plan ahead and make proactive decisions to ensure optimal crop health and resource management.",
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
              Precision in every drop.
            </h1>
            <p className="text-lg text-muted-foreground">
              Maximize your irrigation effectiveness while minimizing costs. Leverage our in-house Machine Learning models to optimize your business’s efficency. Join us in revolutionizing agriculture for a sustainable future.
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

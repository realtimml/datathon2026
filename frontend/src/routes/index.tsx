import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight">
        Welcome to Datathon 2026
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        Get started by navigating to the questionnaire to begin your journey.
      </p>
    </div>
  )
}

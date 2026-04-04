import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/results')({
  component: ResultsPage,
})

function ResultsPage() {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Results</h1>
      <p className="text-lg text-muted-foreground max-w-2xl text-center">
        This is the results page. Your results will be displayed here.
      </p>
    </div>
  )
}

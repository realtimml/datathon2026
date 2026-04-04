import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex flex-col items-center gap-12 py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center gap-6 text-center max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight">
          Welcome to Datathon 2026
        </h1>
        <p className="text-xl text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button asChild size="lg" className="mt-4">
          <Link to="/questionnaire">Get Started</Link>
        </Button>
      </section>

      {/* Content Section */}
      <section className="flex flex-col gap-6 max-w-2xl text-muted-foreground">
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
          omnis iste natus error sit voluptatem accusantium doloremque
          laudantium.
        </p>
        <p>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
          fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
          sequi nesciunt.
        </p>
      </section>
    </div>
  )
}

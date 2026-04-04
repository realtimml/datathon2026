import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from '@/components/theme-provider'
import { ThemeToggle } from '@/components/theme-toggle'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="datathon-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <nav className="container mx-auto flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-lg font-semibold hover:text-primary transition-colors"
              >
                Datathon 2026
              </Link>
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors [&.active]:text-foreground [&.active]:font-medium"
              >
                Home
              </Link>
            </div>
            <ThemeToggle />
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </ThemeProvider>
  )
}

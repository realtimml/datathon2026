import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useQuestionnaire } from '@/hooks/use-questionnaire'
import { SidebarProgress } from '@/components/questionnaire/sidebar-progress'
import { SectionCard } from '@/components/questionnaire/section-card'
import { StepCropInfo } from '@/components/questionnaire/step-crop-info'
import { StepIrrigation } from '@/components/questionnaire/step-irrigation'
import { StepLocation } from '@/components/questionnaire/step-location'

export const Route = createFileRoute('/questionnaire')({
  component: QuestionnairePage,
})

function QuestionnairePage() {
  const navigate = useNavigate()
  const { data, updateField } = useQuestionnaire()

  const handleSubmit = () => {
    console.log('Form submitted:', data)
    navigate({
      to: '/results',
      search: { data: JSON.stringify(data) },
    })
  }

  return (
    <div className="flex h-[calc(100vh-8rem)]">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r p-4">
        <Card className="sticky top-4 p-4">
          <SidebarProgress data={data} />
        </Card>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-6 pb-24">
          <h1 className="text-3xl font-bold tracking-tight">Questionnaire</h1>

          <SectionCard
            id="crop-info"
            title="Crop Information"
            description="Tell us about your crop and field"
          >
            <StepCropInfo data={data} updateField={updateField} />
          </SectionCard>

          <SectionCard
            id="irrigation"
            title="Irrigation Details"
            description="Describe your irrigation setup"
          >
            <StepIrrigation data={data} updateField={updateField} />
          </SectionCard>

          <SectionCard
            id="location"
            title="Location"
            description="Where is your field located?"
          >
            <StepLocation data={data} updateField={updateField} />
          </SectionCard>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
        <div className="max-w-4xl mx-auto flex justify-end">
          <Button size="lg" onClick={handleSubmit}>
            Submit Questionnaire
          </Button>
        </div>
      </div>
    </div>
  )
}

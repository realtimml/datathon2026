import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useQuestionnaire } from '@/hooks/use-questionnaire'
import { StepIndicator } from '@/components/questionnaire/step-indicator'
import { StepCropInfo } from '@/components/questionnaire/step-crop-info'
import { StepIrrigation } from '@/components/questionnaire/step-irrigation'
import { StepLocation } from '@/components/questionnaire/step-location'

export const Route = createFileRoute('/questionnaire')({
  component: QuestionnairePage,
})

const stepTitles = [
  { title: 'Crop Information', description: 'Tell us about your crop and field' },
  { title: 'Irrigation Details', description: 'Describe your irrigation setup' },
  { title: 'Location', description: 'Where is your field located?' },
]

function QuestionnairePage() {
  const navigate = useNavigate()
  const {
    currentStep,
    data,
    updateField,
    nextStep,
    prevStep,
    isFirstStep,
    isLastStep,
  } = useQuestionnaire()

  const handleSubmit = () => {
    console.log('Form submitted:', data)
    navigate({ to: '/results' })
  }

  const currentStepInfo = stepTitles[currentStep - 1]

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Questionnaire</h1>
      
      <StepIndicator currentStep={currentStep} />

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{currentStepInfo.title}</CardTitle>
          <CardDescription>{currentStepInfo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <StepCropInfo data={data} updateField={updateField} />
          )}
          {currentStep === 2 && (
            <StepIrrigation data={data} updateField={updateField} />
          )}
          {currentStep === 3 && (
            <StepLocation data={data} updateField={updateField} />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep}
          >
            Previous
          </Button>
          {isLastStep ? (
            <Button onClick={handleSubmit}>Submit</Button>
          ) : (
            <Button onClick={nextStep}>Next</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

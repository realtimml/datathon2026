import { Progress } from "@/components/ui/progress"
import { TOTAL_STEPS } from "@/hooks/use-questionnaire"

interface StepIndicatorProps {
  currentStep: number
}

const stepLabels = ["Crop Info", "Irrigation", "Location"]

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const progressValue = ((currentStep - 1) / (TOTAL_STEPS - 1)) * 100

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between mb-2">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div
              key={label}
              className={`flex flex-col items-center gap-1 ${
                isActive
                  ? "text-primary"
                  : isCompleted
                    ? "text-primary/70"
                    : "text-muted-foreground"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {stepNumber}
              </div>
              <span className="text-xs">{label}</span>
            </div>
          )
        })}
      </div>
      <Progress value={progressValue} className="h-2" />
    </div>
  )
}

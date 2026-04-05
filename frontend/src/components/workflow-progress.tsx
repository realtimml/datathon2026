import { Check } from "lucide-react"
import { Link } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import type { QuestionnaireData } from "@/hooks/use-questionnaire"

interface WorkflowProgressProps {
  currentPage: "questionnaire" | "results"
  data?: QuestionnaireData
}

const questionnaireSteps = [
  {
    id: "crop-info",
    label: "Crop Information",
    checkFields: (data: QuestionnaireData) =>
      data.Crop_Type !== "" &&
      data.Field_Area_hectare !== null &&
      data.Mulching_Used !== "",
  },
  {
    id: "irrigation",
    label: "Irrigation Details",
    checkFields: (data: QuestionnaireData) =>
      data.Irrigation_Type !== "" &&
      data.Water_Source !== "" &&
      data.Previous_Irrigation_mm !== null,
  },
  {
    id: "location",
    label: "Location",
    checkFields: (data: QuestionnaireData) =>
      data.latitude !== null && data.longitude !== null,
  },
]

export function WorkflowProgress({ currentPage, data }: WorkflowProgressProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const isOnResults = currentPage === "results"

  return (
    <nav className="flex flex-col gap-1">
      <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-3">
        Progress
      </h2>
      
      {questionnaireSteps.map((step, index) => {
        const isComplete = isOnResults || (data ? step.checkFields(data) : false)

        if (currentPage === "questionnaire") {
          return (
            <button
              key={step.id}
              onClick={() => handleScrollTo(step.id)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm transition-colors",
                "hover:bg-muted"
              )}
            >
              <StepIndicator index={index} isComplete={isComplete} isActive={false} />
              <span className={cn(isComplete ? "text-foreground" : "text-muted-foreground")}>
                {step.label}
              </span>
            </button>
          )
        }

        return (
          <Link
            key={step.id}
            to="/questionnaire"
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm transition-colors",
              "hover:bg-muted"
            )}
          >
            <StepIndicator index={index} isComplete={isComplete} isActive={false} />
            <span className="text-foreground">{step.label}</span>
          </Link>
        )
      })}

      {/* Results Step */}
      {currentPage === "questionnaire" ? (
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm",
            "text-muted-foreground"
          )}
        >
          <StepIndicator index={3} isComplete={false} isActive={false} />
          <span>Results</span>
        </div>
      ) : (
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm",
            "bg-primary/10"
          )}
        >
          <StepIndicator index={3} isComplete={false} isActive={true} />
          <span className="text-foreground font-medium">Results</span>
        </div>
      )}
    </nav>
  )
}

function StepIndicator({ 
  index, 
  isComplete, 
  isActive 
}: { 
  index: number
  isComplete: boolean
  isActive: boolean 
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
        isActive
          ? "bg-primary text-primary-foreground"
          : isComplete
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
      )}
    >
      {isComplete ? (
        <Check className="w-3.5 h-3.5" />
      ) : (
        index + 1
      )}
    </div>
  )
}

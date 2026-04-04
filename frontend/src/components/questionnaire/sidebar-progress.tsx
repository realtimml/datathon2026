import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { QuestionnaireData } from "@/hooks/use-questionnaire"

interface SidebarProgressProps {
  data: QuestionnaireData
}

const sections = [
  {
    id: "crop-info",
    label: "Crop Information",
    checkFields: (data: QuestionnaireData) =>
      data.crop_type !== "" &&
      data.field_area !== null &&
      data.mulching_used !== null,
  },
  {
    id: "irrigation",
    label: "Irrigation Details",
    checkFields: (data: QuestionnaireData) =>
      data.irrigation_type !== "" &&
      data.water_source !== "" &&
      data.previous_water_usage !== null,
  },
  {
    id: "location",
    label: "Location",
    checkFields: (data: QuestionnaireData) =>
      data.latitude !== null && data.longitude !== null,
  },
]

export function SidebarProgress({ data }: SidebarProgressProps) {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <nav className="flex flex-col gap-1">
      <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-3">
        Progress
      </h2>
      {sections.map((section, index) => {
        const isComplete = section.checkFields(data)

        return (
          <button
            key={section.id}
            onClick={() => handleScrollTo(section.id)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-left text-sm transition-colors",
              "hover:bg-muted"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium",
                isComplete
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
            <span
              className={cn(
                isComplete ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {section.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

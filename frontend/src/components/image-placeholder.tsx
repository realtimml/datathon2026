import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImagePlaceholderProps {
  className?: string
  aspectRatio?: "square" | "video" | "wide"
  label?: string
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[2/1]",
}

export function ImagePlaceholder({
  className,
  aspectRatio = "video",
  label,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-muted/30",
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      <ImageIcon className="h-10 w-10 text-muted-foreground/50" />
      {label && (
        <span className="mt-2 text-sm text-muted-foreground/70">{label}</span>
      )}
    </div>
  )
}

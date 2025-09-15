import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface InfoCircleProps {
  content?: string
}

export function InfoCircle({ content = "Additional information will be provided here." }: InfoCircleProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 inline-block text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
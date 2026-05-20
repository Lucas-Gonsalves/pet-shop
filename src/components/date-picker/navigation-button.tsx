import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

type NavigationButtonProps = {
  tooltipText: string
  children: React.ReactNode
  onClick: () => void
}

export const NaviagationButton = ({ tooltipText, children, onClick }: NavigationButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={onClick}
            className="border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-border-brand focus-visible:border-border-brand focus:border-border-brand h-12 w-9 bg-transparent focus-visible:ring-1 focus-visible:ring-offset-0"
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-background-tertiary">
          <span>{tooltipText}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

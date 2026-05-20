import { CalendarIcon, ChevronDown, ChevronLeftIcon, ChevronRight } from 'lucide-react'

import { Button } from '../ui/button'
import { Popover, PopoverTrigger } from '../ui/popover'

export const DatePicker = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-min[180px] border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand justify-between bg-transparent text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-content-brand h-4 w-4" />
              <span>
                Select a date<data value=""></data>
              </span>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
      </Popover>

      <Button variant="outline">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

'use client'

import { addDays, format, isValid } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, ChevronDown, ChevronLeftIcon, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export const DatePicker = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const dateParam = searchParams.get('date')

  const date = useMemo(() => {
    if (!dateParam) return

    const [year, month, day] = dateParam.split('-').map(Number)
    const parsedDate = new Date(year, month - 1, day)

    if (!isValid(parsedDate)) return new Date()

    return parsedDate
  }, [dateParam])

  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const updateURLWithDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return

    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set('date', format(selectedDate, 'yyyy-MM-dd'))

    router.push(`${pathname}?${newParams.toString()}`)
  }

  const handleNavigateDay = (days: number) => {
    const newDate = addDays(date || new Date(), days)
    updateURLWithDate(newDate)
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    updateURLWithDate(selectedDate)
    setIsPopoverOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => handleNavigateDay(-1)}>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-min[180px] border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand justify-between bg-transparent text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="text-content-brand h-4 w-4" />
              {date && format(date, 'dd/MM/yyyy')}
              {!date && <span>Select a date</span>}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            autoFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      <Button variant="outline" onClick={() => handleNavigateDay(1)}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

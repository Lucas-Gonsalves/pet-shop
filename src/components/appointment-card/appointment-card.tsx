import { PenIcon } from 'lucide-react'

import { Appointment } from '@/@types/appointments'
import { cn } from '@/lib/utils'

import { AppointmentForm } from '../appointment-form'
import { Button } from '../ui/button'

type AppointmentCardProps = {
  appointment: Appointment
  isFirstInSection?: boolean
}

export const AppointmentCard = ({ appointment, isFirstInSection }: AppointmentCardProps) => {
  return (
    <div
      className={cn(
        "md:grid-cols-[15%_35%_30%_20%]', grid grid-cols-2 items-center py-3",
        !isFirstInSection && 'border-border-divisor border-t',
      )}
    >
      <div className="pr-4 text-left md:pr-0">
        <span className="text-label-small text-content-primary font-semibold">
          {appointment.time}
        </span>
      </div>

      <div className="text-right md:pr-4 md:text-left">
        <div className="flex items-center justify-end gap-1 md:justify-start">
          <span className="text-label-small-size text-content-primary font-semibold">
            {appointment.petName}
          </span>
          <span className="text-paragraph-small-size text-content-secondary">/</span>
          <span className="text-paragraph-small-size text-content-secondary">
            {appointment.tutorName}
          </span>
        </div>
      </div>
      <div className="col-span-2 mt-1 hidden pr-4 text-left md:col-span-1 md:mt-0 md:block">
        <span className="text-paragraph-small-size text-content-secondary">
          {appointment.description}
        </span>
      </div>

      <div className="col-span-2 mt-2 flex items-center justify-end gap-2 text-right md:col-span-1 md:mt-0">
        <AppointmentForm appointment={appointment}>
          <Button variant="edit" size="icon">
            <PenIcon size={12} />
          </Button>
        </AppointmentForm>
      </div>
    </div>
  )
}

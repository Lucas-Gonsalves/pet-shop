import { Appointment } from '@/@types/appointments'

type AppointmentCardProps = {
  appointment: Appointment
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  return (
    <div className="">
      <div className="pr-4 text-left md:pr-0">
        <span className="text-label-small-size text-content-primary font-semibold">
          {appointment.time}
        </span>

        <div className="text-right md:pr-4 md:text-left">
          <div className="flex items-center justify-end gap-1 md:justify-start">
            <span className="text-label-small-size text-content-primary font-semibold">
              {appointment.petName}
            </span>
            <span className="text-paragraph-small-size text-content-secondary">/</span>
            <span className="text-label-small-size text-content-primary font-semibold">
              {appointment.tutorName}
            </span>
          </div>

          <div className="col-span-2 flex items-center justify-end gap-2 pr-4 text-left md:col-span-1 md:mt-0">
            <span className="text-paragraph-small-size text-content-secondary">
              {appointment.description}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

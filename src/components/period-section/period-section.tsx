import { CloudIcon, MoonIcon, SunIcon } from 'lucide-react'

import { AppointmentPeriod } from '@/@types/appointments'

import { AppointmentCard } from '../appointment-card'

type PeriodSection = {
  period: AppointmentPeriod
}

const periodIcons = {
  morning: <SunIcon className="text-accent-blue" />,
  afternoon: <CloudIcon className="text-accent-orange" />,
  evening: <MoonIcon className="text-accent-yellow" />,
}

export const PeriodSection = ({ period }: PeriodSection) => {
  return (
    <section className="bg-background-tertiary mb-8 rounded-xl">
      <div className="flex items-center justify-between border-b border-[#2E2C30] px-5 py-3">
        <div className="flex items-center gap-8">
          {periodIcons[period?.type]}
          <h2 className="text-label-large-size text-content-primary">{period?.title}</h2>
        </div>
        <span className="text-label-large-size text-content-secondary">{period.timeRange}</span>
      </div>

      {period.appointments.length > 0 ? (
        <div className="px-5">
          <div>
            {period.appointments.map((appointment, index) => (
              <AppointmentCard
                key={index}
                appointment={appointment}
                isFirstInSection={index === 0}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-paragraph-small-size text-content-secondary p-5">
          None schedule for this period
        </p>
      )}
    </section>
  )
}

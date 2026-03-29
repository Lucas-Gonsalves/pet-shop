import { PeriodSection } from '@/components/period-section'
import { appointments } from '@/utils/fake-data/appointments'
import { groupAppointmentByPeriod } from '@/utils/functions/group-appointment-by-period'

export default function Home() {
  const periods = groupAppointmentByPeriod(appointments)

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between md:m-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">Your schedule</h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Here you can see all clients and services schedules for today.
          </p>
        </div>
      </div>

      <div className="pb-24 md:pb-0">
        {periods.map((period, index) => (
          <PeriodSection period={period} key={index} />
        ))}
      </div>
    </div>
  )
}

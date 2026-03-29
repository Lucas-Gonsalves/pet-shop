import { PeriodSection } from '@/components/period-section'
// import prisma from '@/lib/prisma'
import { APPOINTMENTS_DATA, groupAppointmentByPeriod } from '@/utils'

export default async function Home() {
  // const appointments = await prisma.appointment.findMany()
  // console.log(appointments)

  const periods = groupAppointmentByPeriod(APPOINTMENTS_DATA)

  return (
    <div className="bg-background-primary p-6">
      <div className="mb-8 flex items-center justify-between">
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

import { endOfDay, parseISO, startOfDay } from 'date-fns'

import { AppointmentForm } from '@/components/appointment-form'
import { PeriodSection } from '@/components/period-section'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { groupAppointmentByPeriod } from '@/utils'

export default async function Home({ searchParams }: { searchParams: Promise<{ date?: string }> }) {
  const { date } = await searchParams
  const selectedDate = date ? parseISO(date) : new Date()

  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      },
    },
    orderBy: {
      scheduleAt: 'asc',
    },
  })
  console.log(appointments)

  const periods = groupAppointmentByPeriod(appointments)

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

      <div className="bg-background-tertiary fixed right-0 bottom-0 left-0 flex justify-center px-6 py-4.5 md:top-auto md:right-6 md:bottom-6 md:left-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm>
          <Button variant="brand">New scheduling</Button>
        </AppointmentForm>
      </div>
    </div>
  )
}

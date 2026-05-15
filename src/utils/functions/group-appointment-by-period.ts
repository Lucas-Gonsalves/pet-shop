import { Appointment, AppointmentPeriod, AppointmentPeriodDay } from '@/@types/appointments'
import { Appointment as AppointmentPrisma } from '@/generated/prisma/client'

const getPeriod = (hour: number): AppointmentPeriodDay => {
  if (hour >= 9 && hour < 12) return 'morning'
  if (hour >= 13 && hour < 18) return 'afternoon'
  return 'evening'
}

/**
 * Groups a list of appointments into periods of the day (morning, afternoon, evening).
 *
 * @param appointments - Array of appointments from Prisma (database format)
 *
 * @returns An array of grouped appointment periods, each containing:
 * - title: Human-readable period name ("Morning", "Afternoon", "Evening")
 * - type: Period identifier ("morning" | "afternoon" | "evening")
 * - timeRange: Display string representing the time range of the period
 * - appointments: List of appointments belonging to that period
 *
 * @example
 * groupAppointmentByPeriod(appointments)
 * // [
 * //   { title: "Morning", type: "morning", timeRange: "09h-12h", appointments: [...] },
 * //   { title: "Afternoon", type: "afternoon", timeRange: "13h-18h", appointments: [...] },
 * //   { title: "Evening", type: "evening", timeRange: "19h-21h", appointments: [...] },
 * // ]
 *
 * @remarks
 * - Each appointment is transformed before grouping:
 *   - `scheduleAt` is formatted to "HH:mm" (pt-BR)
 *   - `description` is mapped to `service`
 *   - A `period` is assigned based on the hour
 *
 * - Period rules:
 *   - Morning: 09:00–11:59
 *   - Afternoon: 13:00–17:59
 *   - Evening: all other hours (default fallback)
 *
 * - Noon (12:00) is not included in "morning"
 * - There is a gap between 12:00–12:59 (falls into "evening")
 *
 * - Function assumes `scheduleAt` is a valid Date object
 */

export function groupAppointmentByPeriod(appointments: AppointmentPrisma[]): AppointmentPeriod[] {
  const transformedAppointments: Appointment[] = appointments?.map((apt) => ({
    ...apt,
    time: apt.scheduleAt.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    service: apt.description,
    period: getPeriod(apt.scheduleAt.getHours()),
  }))

  const morningAppointments = transformedAppointments.filter((apt) => apt.period === 'morning')
  const afternoonAppointments = transformedAppointments.filter((apt) => apt.period === 'afternoon')
  const eveningAppointments = transformedAppointments.filter((apt) => apt.period === 'evening')

  return [
    {
      title: 'Morning',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppointments,
    },
    {
      title: 'Afternoon',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppointments,
    },
    {
      title: 'Evening',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningAppointments,
    },
  ]
}

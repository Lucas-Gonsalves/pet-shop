import { z } from 'zod'

const generateTimeOptionsSchema = z
  .object({
    shiftStart: z.number().min(0).max(24).default(9),
    endShift: z.number().min(0).max(24).default(21),
    timeSlots: z.number().min(5).max(60).default(30),
  })
  .refine((data) => data.shiftStart < data.endShift, {
    message: 'shiftStart must be less than endShift',
  })

type GenerateTimeOptionsProps = z.infer<typeof generateTimeOptionsSchema>

/**
 * Generates a list of formatted time slots based on a given schedule.
 *
 * @param props - Configuration object for time generation
 * @param props.shiftStart - Hour when the shift starts (0–24). Default: 9
 * @param props.endShift - Hour when the shift ends (0–24). Default: 21
 * @param props.timeSlots - Interval in minutes between each time slot (5–60). Default: 30
 *
 * @returns An array of time strings in "HH:mm" format (e.g., ["09:00", "09:30", "10:00"])
 *
 * @example
 * generateTimeOptions({
 *   shiftStart: 9,
 *   endShift: 12,
 *   timeSlots: 30,
 * })
 * // ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00"]
 *
 * @remarks
 * - Validation is handled using Zod
 * - If no props are provided, default values will be used
 * - The last hour will only include ":00" to avoid overflow beyond endShift
 */
const generateTimeOptions = (props?: Partial<GenerateTimeOptionsProps>): string[] => {
  const { shiftStart, endShift, timeSlots } = generateTimeOptionsSchema.parse(props ?? {})

  const times: string[] = []

  for (let hour = shiftStart; hour <= endShift; hour++) {
    for (let minute = 0; minute < 60; minute += timeSlots) {
      if (hour === endShift && minute > 0) break

      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

      times.push(timeString)
    }
  }

  return times
}

export { generateTimeOptions }

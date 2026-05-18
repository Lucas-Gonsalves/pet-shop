'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'

import prisma from '@/lib/prisma'

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
})

type appointmentSchemaProps = z.infer<typeof appointmentSchema>

export async function createAppointment(data: appointmentSchemaProps) {
  try {
    const parcedData = appointmentSchema.parse(data)

    const { scheduleAt } = parcedData
    const hour = scheduleAt.getHours()

    const isMorning = hour >= 9 && hour < 12
    const isAfternoon = hour >= 13 && hour < 18
    const isEvening = hour >= 19 && hour < 21

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        success: false,
        message: 'Scheduling are only made between 9h and 12hm, 13h and 18h, 19h and 21h',
      }
    }

    const existingAppointment = await prisma.appointment.findFirst({ where: { scheduleAt } })

    if (existingAppointment) {
      return {
        success: false,
        message: 'This time slot is already reserved.',
      }
    }

    await prisma.appointment.create({ data: parcedData })

    revalidatePath('/')
    return {
      success: true,
      message: 'Scheduling created with success.',
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'An error occurred while creating the appointment.',
    }
  }
}

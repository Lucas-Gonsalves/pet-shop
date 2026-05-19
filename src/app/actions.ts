'use server'

import { revalidatePath } from 'next/cache'
import z from 'zod'

import prisma from '@/lib/prisma'

const appointmentDataSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
})

type AppointmentDataSchemaProps = z.infer<typeof appointmentDataSchema>

export async function createAppointment(data: AppointmentDataSchemaProps) {
  try {
    const parcedData = appointmentDataSchema.parse(data)

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

export async function updateAppointment(id: string, data: AppointmentDataSchemaProps) {
  try {
    const parcedData = appointmentDataSchema.parse(data)

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

    const existingAppointment = await prisma.appointment.findFirst({
      where: { scheduleAt, id: { not: id } },
    })

    if (existingAppointment) {
      return {
        success: false,
        message: 'This time slot is already reserved.',
      }
    }

    await prisma.appointment.update({ where: { id }, data: parcedData })

    revalidatePath('/')

    return {
      success: true,
      message: 'Scheduling updated with success.',
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'An error occurred while updating the appointment.',
    }
  }
}

export async function deleteAppointment(id: string) {
  try {
    const existingAppointment = await prisma.appointment.findFirst({
      where: { id },
    })

    if (!existingAppointment) {
      return {
        success: false,
        message: 'Appointment unavailable to delete.',
      }
    }

    await prisma.appointment.delete({
      where: { id },
    })

    revalidatePath('/')

    return {
      success: true,
      message: 'Scheduling deleted with success.',
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'An error occurred while deleting an appointment.',
    }
  }
}

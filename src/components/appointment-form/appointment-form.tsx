'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { DogIcon, UserIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const appointmentFormSchema = z.object({
  tutorName: z.string().min(3, 'Tutor name is required'),
  petName: z.string().min(3, 'Pet name is required'),
  phone: z.string().min(11, 'Phone is required'),
  description: z.string().min(3, 'Description is required'),
})

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

export const AppointmentForm = () => {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
    },
  })

  const onSubmit = (data: AppointmentFormValues) => {
    console.log(data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">New scheduling</Button>
      </DialogTrigger>

      <DialogContent variant="appointment" overlayVariant="blurred" showCloseButton>
        <DialogHeader>
          <DialogTitle size="modal">Schedule it a service</DialogTitle>
          <DialogDescription size="modal">
            Fill all client data for realise to perform the scheduling
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FieldGroup>
            <Controller
              name="tutorName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-appointment-tutorname"
                    className="text-label-medium-size text-content-primary"
                  >
                    Tutor name
                  </FieldLabel>
                  <div className="relative">
                    <UserIcon
                      className="text-content-brand absolute top-1/2 left-3 -translate-y-1/2 transform"
                      size={20}
                    />
                    <Input
                      {...field}
                      id="form-appointment-tutorname"
                      placeholder="Tutor name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="pl-10"
                    />
                  </div>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="petName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-appointment-petName"
                    className="text-label-medium-size text-content-primary"
                  >
                    Pet name
                  </FieldLabel>
                  <div className="relative">
                    <DogIcon
                      className="text-content-brand absolute top-1/2 left-3 -translate-y-1/2 transform"
                      size={20}
                    />
                    <Input
                      {...field}
                      id="form-appointment-petName"
                      placeholder="Pet name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="pl-10"
                    />
                  </div>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-appointment-description"
                    className="text-label-medium-size text-content-primary"
                  >
                    Description
                  </FieldLabel>

                  <Textarea
                    {...field}
                    id="form-appointment-description"
                    placeholder="Service description"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className="resize-none"
                  />

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <Button>Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

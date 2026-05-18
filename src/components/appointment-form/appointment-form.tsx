'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format, setHours, setMinutes, startOfToday } from 'date-fns'
import {
  CalendarIcon,
  ChevronDownIcon,
  ClockIcon,
  DogIcon,
  Loader2Icon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { IMaskInput } from 'react-imask'
import { toast } from 'sonner'
import { z } from 'zod'

import { createAppointment } from '@/app/actions'
import { cn } from '@/lib/utils'
import { generateTimeOptions } from '@/utils'

import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'

const appointmentFormSchema = z
  .object({
    tutorName: z.string().min(3, 'Tutor name is required'),
    petName: z.string().min(3, 'Pet name is required'),
    phone: z.string().min(11, 'Phone is required'),
    description: z.string().min(3, 'Description is required'),
    scheduleAt: z
      .date({
        error: 'Date is required',
      })
      .min(startOfToday(), {
        message: 'Date cannot be in pass',
      }),
    time: z.string().min(1, 'Hour is required'),
  })
  .refine(
    (data) => {
      const [hour, minute] = data.time.split(':')
      const scheduleDateTime = setMinutes(setHours(data.scheduleAt, Number(hour)), Number(minute))

      return scheduleDateTime > new Date()
    },
    {
      path: ['time'],
      error: 'Hour cannot be in pass',
    },
  )

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

const TIME_OPTIONS = generateTimeOptions({
  shiftStart: 9,
  endShift: 21,
  timeSlots: 30,
})

export const AppointmentForm = () => {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      tutorName: '',
      petName: '',
      phone: '',
      description: '',
      scheduleAt: undefined,
      time: '',
    },
  })

  const firstError = Object.values(form.formState.errors)[0]

  const onSubmit = async (data: AppointmentFormValues) => {
    const [hour, minute] = data.time.split(':')

    const scheduleAt = data.scheduleAt
    scheduleAt.setHours(Number(hour), Number(minute), 0, 0)

    // call server action
    await createAppointment({ ...data, scheduleAt })
    toast.success(`Scheduling created with success.`)

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
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-appointment-phone"
                    className="text-label-medium-size text-content-primary"
                  >
                    Phone
                  </FieldLabel>
                  <div className="relative">
                    <PhoneIcon
                      className="text-content-brand absolute top-1/2 left-3 -translate-y-1/2 transform"
                      size={20}
                    />
                    <IMaskInput
                      {...field}
                      id="form-appointment-phone"
                      mask="(00) 00000-0000"
                      placeholder="(00) 00000-0000"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="border-border-primary bg-background-tertiary text-content-primary ring-offset-background placeholder:text-content-secondary focus-visible:ring-border-brand hover:border-border-secondary focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex h-12 w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
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
                </Field>
              )}
            />
            <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
              <Controller
                name="scheduleAt"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="flex flex-col">
                    <FieldLabel
                      htmlFor="form-appointment-scheduleAt"
                      className="text-label-medium-size text-content-primary"
                    >
                      Date
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            'bg-background-tertiary border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand w-full justify-between text-left font-normal focus-visible:ring-1 focus-visible:ring-offset-0',
                            !field.value && 'text-content-secondary',
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="text-content-brand" size={20} />
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>select a date</span>
                            )}
                          </div>
                          <ChevronDownIcon className="h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < startOfToday()}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                )}
              />
              <Controller
                name="time"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel
                      htmlFor="form-appointment-time"
                      className="text-label-medium-size text-content-primary"
                    >
                      Hour
                    </FieldLabel>

                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    >
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="text-content-brand h-4 w-4" />
                          <SelectValue placeholder="--:-- --" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem
                            key={`key-of-form-appointment-select-item-${time}`}
                            value={time}
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>
          </FieldGroup>

          <div className="flex items-center gap-2 pt-4">
            <Button variant="brand" disabled={form.formState.isSubmitting}>
              Agendar
              {form.formState.isSubmitting && <Loader2Icon className="h-4 w-4 animate-spin" />}
            </Button>
            {firstError && <FieldError errors={[firstError]} />}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

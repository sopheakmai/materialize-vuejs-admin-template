import type { Except } from 'type-fest'
import type { CalendarEvent } from '@/plugins/fake-api/handlers/apps/calendar/types'

export type Event = {
  extendedProps: {
    calendar?: string
    location: string
    description: string
    guests: string[]
  }
} & CalendarEvent

export type NewEvent = Except<Event, 'id'>

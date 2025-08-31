import type { Except } from 'type-fest'
import type { CalendarEvent } from '@/@fake-db/types'

export interface Event extends CalendarEvent {
  extendedProps: {
    calendar?: string
    location: string
    description: string
    guests: string[]
  }
}

export type NewEvent = Except<Event, 'id'>

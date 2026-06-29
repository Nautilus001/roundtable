import { createContext } from 'react'

export type EventsContextType = {
  events?: Record<string, any> | null
  isLoading: boolean
  fetchEvents: () => Promise<any>
  createEvent: () => Promise<any>
}

export const EventContext = createContext<EventsContextType>({
  events: [],
  isLoading: false,
  fetchEvents:  async () => {},
  createEvent: async () => {}
})
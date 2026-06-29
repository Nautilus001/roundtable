import { createContext } from 'react'

export type EventsContextType = {
  events?: Record<string, any> | null
  isLoading: boolean
  getEvents: () => Promise<any>
  createEvent: () => Promise<any>
}

export const EventContext = createContext<EventsContextType>({
  events: [],
  isLoading: false,
  getEvents:  async () => {},
  createEvent: async () => {}
})
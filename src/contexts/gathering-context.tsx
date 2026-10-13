import { Gathering } from '@/models/gathering'
import { createContext } from 'react'

interface GatheringContextType {
  gatherings: Gathering[] | null
  activeGathering: Gathering | null
  gatheringError: any
  setActive: (gathering_id: string) => void
  fetchGatherings: () => Promise<any>
  createGathering: (payload: Gathering) => Promise<any>
  joinGathering: (gatheringCode: string) => Promise<any>
  updateGathering: (payload: Gathering) => Promise<any>
  deleteGathering: (payload: Gathering) => Promise<any>
  getGatheringAttendees: (payload: string) => Promise<any>
}

export const GatheringContext = createContext<GatheringContextType>({
  gatherings: [],
  activeGathering: null,
  gatheringError: null,
  setActive: () => {},
  fetchGatherings:  async () => {},
  createGathering: async () => {},
  joinGathering: async () => {},
  updateGathering: async () => {},
  deleteGathering: async () => {},
  getGatheringAttendees: async () => {},
})

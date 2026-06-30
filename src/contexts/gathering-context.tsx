import { Gathering } from '@/models/gathering'
import { createContext } from 'react'

export type GatheringContextType = {
  gatherings: Gathering[] | null
  activeGathering: Gathering | null
  isLoading: boolean
  setActive: (gathering_id: string) => void
  fetchGatherings: () => Promise<any>
  createGathering: (payload: Gathering) => Promise<any>
}

export const GatheringContext = createContext<GatheringContextType>({
  gatherings: [],
  activeGathering: null,
  isLoading: false,
  setActive: () => {},
  fetchGatherings:  async () => {},
  createGathering: async () => {}
})
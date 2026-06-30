import { Gathering } from '@/models/gathering'
import { createContext } from 'react'

export type GatheringContextType = {
  gatherings?: Gathering[] | null
  isLoading: boolean
  fetchGatherings: () => Promise<any>
  createGathering: () => Promise<any>
}

export const GatheringContext = createContext<GatheringContextType>({
  gatherings: [],
  isLoading: false,
  fetchGatherings:  async () => {},
  createGathering: async () => {}
})
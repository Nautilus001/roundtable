import {Category} from '@/models/category';
import { Gathering } from '@/models/gathering'
import { Item } from '@/models/item'
import { createContext } from 'react'

export type JoinGatheringResult =
  | { ok: true; gatheringId: string }
  | { ok: false; message: string }

interface GatheringContextType {
  gatherings: Gathering[] | null
  activeGathering: Gathering | null
  gatheringError: any
  setActive: (gathering_id: string) => void
  fetchGatherings: () => Promise<any>
  addGathering: (payload: Gathering) => Promise<any>
  joinGathering: (gatheringCode: string) => Promise<JoinGatheringResult>
  updateGathering: (payload: Gathering) => Promise<any>
  removeGathering: (payload: Gathering) => Promise<any>
  getGatheringAttendees: (payload: string) => Promise<any>
}

export const GatheringContext = createContext<GatheringContextType>({
  gatherings: [],
  activeGathering: null,
  gatheringError: null,
  setActive: () => {},
  fetchGatherings:  async () => {},
  addGathering: async () => {},
  joinGathering: async () => ({ ok: false, message: '' }),
  updateGathering: async () => {},
  removeGathering: async () => {},
  getGatheringAttendees: async () => {},
})

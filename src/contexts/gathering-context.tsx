import {Category} from '@/models/category';
import { Gathering } from '@/models/gathering'
import { Item } from '@/models/item'
import { createContext } from 'react'

export type JoinGatheringResult =
  | { ok: true; gatheringId: string }
  | { ok: false; message: string }

interface GatheringContextType {
  gatherings: Gathering[] | null
  items: Item[] | null
  activeGathering: Gathering | null
  isLoading: boolean
  setActive: (gathering_id: string) => void
  fetchGatherings: () => Promise<any>
  createGathering: (payload: Gathering) => Promise<any>
  joinGathering: (gatheringCode: string) => Promise<JoinGatheringResult>
  updateGathering: (payload: Gathering) => Promise<any>
  removeGathering: (payload: Gathering) => Promise<any>
  fetchItems: (gathering_id: string) => Promise<any>
  createItem: (payload: Item) => Promise<any>
  updateItem: (payload: Item) => Promise<any>
  removeItem: (payload: Item) => Promise<any>
  fetchCategories: (gathering_id: string) => Promise<any>
  createCategory: (payload: Category) => Promise<any>
  updateCategory: (payload: Category) => Promise<any>
  removeCategory: (payload: Category) => Promise<any>
  getGatheringAttendees: (payload: string) => Promise<any>
}

export const GatheringContext = createContext<GatheringContextType>({
  gatherings: [],
  items: [],
  activeGathering: null,
  isLoading: false,
  setActive: () => {},
  fetchGatherings:  async () => {},
  createGathering: async () => {},
  joinGathering: async () => ({ ok: false, message: '' }),
  updateGathering: async () => {},
  removeGathering: async () => {},
  fetchItems:  async () => {},
  createItem: async () => {},
  updateItem: async () => {},
  removeItem: async () => {},
  fetchCategories:  async () => {},
  createCategory: async () => {},
  updateCategory: async () => {},
  removeCategory: async () => {},
  getGatheringAttendees: async () => {},
})

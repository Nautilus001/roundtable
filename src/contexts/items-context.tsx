import { createContext } from 'react'
import { Item } from '@/models/item'

interface ItemContextType {
    items: Item[] | null,
    fetchItems: (gathering_id: string) => Promise<any>
    createItem: (payload: Item) => Promise<any>
    updateItem: (payload: Item) => Promise<any>
    removeItem: (payload: Item) => Promise<any>
}

export const ItemContext = createContext<ItemContextType>({
    items: [],
    fetchItems:  async () => {},
    createItem: async () => {},
    updateItem: async () => {},
    removeItem: async () => {},
})
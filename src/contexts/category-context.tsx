import { createContext } from 'react'
import { Category } from '@/models/category'

interface CategoryContextType {
    categories: Category[] | null,
    fetchCategories: (gathering_id: string) => Promise<any>
    createCategory: (payload: Category) => Promise<any>
    updateCategory: (payload: Category) => Promise<any>
    removeCategory: (payload: Category) => Promise<any>
}

export const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    fetchCategories:  async () => {},
    createCategory: async () => {},
    updateCategory: async () => {},
    removeCategory: async () => {},
})
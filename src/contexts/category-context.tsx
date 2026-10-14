import { createContext } from 'react'
import { Category } from '@/models/category'

interface CategoryContextType {
    categories: Category[] | null,
    categoryError: string,
    fetchCategories: (gathering_id: string) => Promise<any>
    createCategory: (payload: Category) => Promise<any>
    updateCategory: (payload: Category) => Promise<any>
    removeCategory: (payload: Category) => Promise<any>
}

export const CategoryContext = createContext<CategoryContextType>({
    categories: [],
    categoryError: "",
    fetchCategories:  async () => {},
    createCategory: async () => {},
    updateCategory: async () => {},
    removeCategory: async () => {},
})
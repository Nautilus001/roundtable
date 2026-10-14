import React, {useState} from 'react'
import {CategoryContext} from '@/contexts/category-context'
import {Category} from '@/models/category'
import { useAuthContext } from '@/hooks/use-auth-context'
import * as categoryService from "@/services/categories"

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {

    const [categories, setCategories] = useState<Category[]> ([])
    const [categoryError, setCategoryError] = useState<string>("") //might have to become Error
    const { profile } = useAuthContext()

    const fetchCategories = async (gathering_id: string ) => {
        const { data, error} = await categoryService.fetchCategories(gathering_id, profile.id)

        if(error || !data) {
            setCategoryError("Error retrieving Categories.")
            console.error("Unexpected error in category-provider>fetchCategories:", error)
            return
        }

        setCategories(data)
    }

    const createCategory = async (payload: Category) => {
        const { data, error } = await categoryService.createCategory(payload)

        if(error || !data) {
            setCategoryError("Error creating Category.")
            console.error("Unexpected error in category-provider>createCategories:", error)
            return
        }

        setCategories(current =>
            current?.map(category => 
                category.id === data.id ? { ...category, data } : category
            )
        )
    }
    //TODO: Perhaps a single method for these two? Upsert?
    const updateCategory = async (payload: Category) => {
        const { data, error } = await categoryService.updateCategory(payload)

        if(error || !data) {
            setCategoryError("Error updating Category.")
            console.error("Unexpected error in category-provider>updateCategories:", error)
            return
        }

        setCategories(current =>
            current?.map(category => 
                category.id === data.id ? { ...category, data } : category
            )
        )
    }

    const removeCategory = async (payload: Category) => {
        const { error } = await categoryService.removeCategory(payload)

        if(error) {
            setCategoryError("Error deleting Category.")
            console.error("Unexpected error in category-provider>removeCategories:", error)
            return
        }

        return {error: null} 
    }

    return (
        <CategoryContext.Provider value = {{
            categories,
            categoryError,
            fetchCategories,
            createCategory,
            updateCategory,
            removeCategory
        }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider


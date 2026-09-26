import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import {CategoryContext} from '@/contexts/category-context'
import {Category} from '@/models/category'

const CategoryProvider = ({ children }: { children: React.ReactNode }) => {

    const [categories, setCategories] = useState<Category[] | null> (null)
    
    const fetchCategories = async () => {
        //TODO
    }
    const createCategory = async () => {
        //TODO
    }
    const updateCategory = async () => {
        //TODO
    }
    const removeCategory = async () => {
        //TODO
    }

    return (
        <CategoryContext.Provider value = {{
            categories,
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


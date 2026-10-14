import { Category } from "@/models/category";
import {CategoryFactory} from "../factories/category-factory";
import { supabase } from "./supabase";

export async function fetchCategories(gathering_id: string, profile_id: string): Promise<{ data: Category[] | null; error: any }> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('gathering_id', gathering_id)
    .eq('profile_id', profile_id)

  if (error || !data) {
    console.error('Error fetching categories:', error.message)
    return { data: null, error }
  }

  return { 
    data: !data ? null : data
      .map(item => CategoryFactory.fromSupabaseItem(item))
      .filter((item): item is Category => item !== null),
    error: null 
  }
}

export async function createCategory(
  payload: Category
) : Promise<{ data: Category | null; error: Error | null}> {
  console.log("SERVICE: ", payload)
  const { data, error } = await supabase
    .from('categories')
    .insert([
      { 
        scale_id: payload.scale_id, 
        name: payload.name, 
        gathering_id: payload.gathering_id, 
        profile_id: payload.profile_id 
      },
    ])
    .select()
    .single()
  
  if (error || !data) {
    console.error('Error adding category:', error?.message)
    return { data: null, error }
  }

  return {
    data: CategoryFactory.fromSupabaseItem(data),
    error: null
  }
}

export async function updateCategory(payload: Category): Promise<{data: Category | null, error: any}> {
  const { id, ...updatedData} = payload
  
  const { data, error } = await supabase
    .from('categories')
    .update(updatedData)
    .eq('id', id)
    .select()
  
  if(error || !data) {
    console.error("Error updating Category: ", error?.message)
    return { data: null, error }
  }

  return {
    data: CategoryFactory.fromSupabaseItem(data),
    error: error
  }
}

export async function removeCategory(payload: Category): Promise<{error: any}> {
  const { error } = await supabase
    .from("categories")
    .delete()
    .eq("id", payload.id)

  if (error) {
    console.error("Error deleting category: ", error.message)
  }

  return {error}
}
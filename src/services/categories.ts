import { supabase } from "./supabase";
import { normalizeArray } from "./util";

export interface Rankable {
  id: string
  name: string
  scale_id?: string
  profile_id: string
  gathering_id: string
}

export async function getRankables(
  gathering_id: string
): Promise<{ data: Rankable[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('rankables')
    .select('id, name, scale_id, profile_id, gathering_id')
    .eq('gathering_id', gathering_id)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching rankables:', error.message)
    return { data: null, error }
  }

  return { data, error: null }
}

export async function addRankable(
  gathering_id: string, scale_id: string, name: string, profile_id: string 
) : Promise<{ data: Rankable | null; error: Error | null}> {
  const { data, error } = await supabase
    .from('rankables')
    .insert([
      { scale_id: scale_id, name: name, gathering_id: gathering_id, profile_id: profile_id },
    ])
    .select()
    .single()
  
  if (error || !data) {
    console.error('Error addihg rankable:', error?.message)
    return { data: null, error }
  }

  return {
    data: {
      id: data.id ?? "",
      name: data.name,
      scale_id: data.scale_id,
      profile_id: data.profile_id,
      gathering_id: data.gathering_id
    },
    error: null
  }
}
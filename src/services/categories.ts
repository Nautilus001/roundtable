import { supabase } from "./supabase";

export interface Rankable {
  id: string
  name: string
  scale_id?: string
}

export async function getRankables(
  gathering_id: string
): Promise<{ data: Rankable[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('rankables')
    .select('id, name')
    .eq('gathering_id', gathering_id)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching rankables:', error.message)
    return { data: null, error }
  }

  return { data, error: null }
}
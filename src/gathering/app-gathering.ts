import { supabase } from '@/services/supabase'
import { createGatheringModule } from './gathering'
import { createSupabaseGatheringStore } from './supabase-gathering-store'

export const appGathering = createGatheringModule(
  createSupabaseGatheringStore(supabase),
)

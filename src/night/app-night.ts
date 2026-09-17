import { supabase } from '@/services/supabase'
import { createNight } from './night'
import { createSupabaseNightStore } from './supabase-night-store'

export const appNight = createNight(createSupabaseNightStore(supabase))

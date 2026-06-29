import {Event} from "@/models/event"
import { supabase } from "./supabase"

export async function getEvents(profile: string): Promise<Event[] | null> {
    
    const { data, error } = await supabase
        .from('roles')
        .select(`
            role, 
            events (
                id,
                created_at,
                name,
                start_time,
                location,
                attire,
                event_code
            )
        `)
        .eq('profile_id', profile);
    
    if (error) {
        console.error('Supabase error fetching events:', error.message);
        return null
    }

    if (!data) return []
    
    return data
        .filter(item=>item.events != null) 
        .map(item=> {
            const event = item.events as any

            return {
                id: event.id,
                created_at: event.created_at,
                name: event.name,
                start_time: event.start_time,
                location: event.location,
                attire: event.attire,
                event_code: event.event_code,
                role: item.role
            }
        })
}

export async function createEvent(payload: Event) {
    const { data, error } = await supabase
        .rpc('create_event_with_owner', { 
            p_name: payload.name,
            p_start_time: payload.start_time,
            p_location: payload.location,
            p_attire: payload.attire,
        })
    if (error || !data) {
        console.error('Error creating event via RPC', error)
        return {data: null, error}
    }
    return {data, error: null}
}

//TODO: Fix Supabase function to stop shoving whole event into id

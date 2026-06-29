import {Event} from "@/models/event"
import { supabase } from "./supabase"

export async function getEvents(profile_id: any) {
    const cleanId = profile_id.trim();
    
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
        .eq('profile_id', cleanId);
    
    if (error || !data) {
        console.error('Error fetching events and roles:', error);
        return [];
    }

    return data.map((record: any) => {
        return {
            ...record.events,
            user_role: record.role_name
        };
    }) as Event[];
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

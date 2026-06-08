import {Event, EventData} from "@/models/events"
import { supabase } from "./supabase"
import {Alert} from "react-native"

export interface EventUpdateType {
    first_name?: string
    last_name?: string
    email?: string
    username?: string
}

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
    }) as EventData[];
}

export async function createEvent(profile_id: any, payload: Event) {
    const cleanId = profile_id.trim();
    const { data, error } = await supabase
        .from('events')
        .insert([{ 
            name: payload.name,
            start_time: payload.start_time,
            location: payload.location,
            attire: payload.attire,
        }])
        .select()
    if (error || !data) {
        console.error('Error creating event', error);
        return [];
    }
}

import {EventRole, Gathering} from "@/models/gathering"
import { supabase } from "./supabase"
import { GatheringFactory } from "@/factories/gathering-factory"

export async function joinEventByCode(eventCode: string) : Promise<{data: Gathering | null, error: any}>{
    const { data, error } = await supabase.rpc('join_event', {
        p_event_code: eventCode
    });
    
    if(error || !data) {
        console.error("Error joining gathering: ", error)
        return {data: null, error}
    }
    
    return { 
        data: GatheringFactory.fromSupabaseItem(data), 
        error 
    }
}

export async function createGathering(payload: Gathering) : Promise<{data: Gathering | null, error: any}>{
    const { data, error } = await supabase //todo: refactor Supabase RPC so that I can just pass it the payload object
        .rpc('create_event_with_owner', { 
            p_name: payload.name,
            p_start_time: payload.start_time,
            p_location: payload.location,
            p_attire: payload.attire,
        })

    if (error || !data) {
        console.error('Error creating gathering via RPC', error)
        return { data: null, error }
    }

    return { 
        data: GatheringFactory.fromSupabaseItem(data), 
        error: error 
    }
}

export async function fetchGatherings(profile_id: string): Promise<{data: Gathering[] | null, error: any}> {
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
                event_code,
                active
            )
        `)
        .eq('profile_id', profile_id)

    if (error || !data) {
        console.error('Error fetching gatherings:', error.message)
        return { data: null, error }
    }
        
    return { 
        data: !data ? null : data
            .filter(item => item.events != null)
            .map(item => GatheringFactory.fromSupabaseItem(item))
            .filter((item): item is Gathering => item !== null),
        error: error
    }
}

export async function updateGathering(payload: Gathering) : Promise<{data: Gathering | null, error: any}>{
    const { data, error } = await supabase
        .from('events')
        .update({ 
            id: payload.id,
            name: payload.name,
            start_time: payload.start_time,
            location: payload.location,
            attire: payload.attire
        })
        .eq('id', payload.id)
        .select()
        .single()

    if(error || !data) {
        console.error('Error adding gathering')
        return {data: null, error}
    }

    return {
        data: GatheringFactory.fromSupabaseItem(data), 
        error: error
    }
}

export async function deleteGathering(payload: Gathering) : Promise<{error: any}>{
    const { error } = await supabase
                .from('events')
                .delete()
                .eq('id', payload.id ?? "")

    if(error) {
        console.error('Error deleting gathering')
        return {error}
    }

    return {error}
}



 
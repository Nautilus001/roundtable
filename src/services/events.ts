import { supabase } from "./supabase"

export interface EventUpdateType {
    first_name?: string
    last_name?: string
    email?: string
    username?: string
}

export async function getEvents(profile_id: any) {
    const cleanId = profile_id.trim();
    
    let { data: roles, error }  = await supabase
        .from('roles')
        .select('*')
        .eq('profile_id', cleanId)
    let events : string[] = []
    roles?.map((role)=> {
        events.push(role.event_id)
    })
    return events
}

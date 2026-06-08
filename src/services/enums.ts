import { supabase } from './supabase'


export async function getAttireTypes() {
    const { data, error } = await supabase.rpc('get_enum_values', { 
      enum_type_name: 'attire'
    });
    return { data, error}
}

export async function getRoleTypes() {
    const { data, error } = await supabase.rpc('get_enum_values', { 
      enum_type_name: 'role'
    });
    return { data, error}
}

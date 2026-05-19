import { supabase } from './supabase'

export async function getAuthSessionData() {
    const { data, error } = await supabase.auth.getClaims()
    return { data, error }
}

export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    return { data, error }
}

export async function signUpWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    return { data, error }
}

export async function signOutUser() {
    const { error } = await supabase.auth.signOut()
    return { error }
}
import React, { useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/auth-context'
import { supabase } from '@/services/supabase'
import { fetchProfile } from '@/services/profiles'
import { getAuthSessionData, signInWithEmail, signUpWithEmail, signOutUser } from '@/services/auth'
import { Alert } from 'react-native'
import { EventContext } from '@/contexts/events-context'
import { useAuthContext } from '@/hooks/use-auth-context'
import { getEvents } from '@/services/events'

export const EventProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { profile } = useAuthContext()

    const fetchEvents = async () => {
        setIsLoading(true)
        try {
            if(!profile) throw new Error("No profile detected")
                
            const data = await getEvents(profile)
        } catch (error: any) {
            console.error("Unexpected error in fetchEvents:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createEvent = async () => {
        setIsLoading(true)
        try {

        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <EventContext.Provider value={{isLoading, fetchEvents, createEvent}}>
            {children}
        </EventContext.Provider>
    )
}
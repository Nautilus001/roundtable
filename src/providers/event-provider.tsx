import React, { useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/auth-context'
import { supabase } from '@/services/supabase'
import { fetchProfile } from '@/services/profiles'
import { getAuthSessionData, signInWithEmail, signUpWithEmail, signOutUser } from '@/services/auth'
import { Alert } from 'react-native'
import { EventContext } from '@/contexts/events-context'

export const EventProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getEvents = async () => {
        setIsLoading(true)
        try {

        } catch {

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
        <EventContext.Provider value={{isLoading, getEvents, createEvent}}>
            {children}
        </EventContext.Provider>
    )
}
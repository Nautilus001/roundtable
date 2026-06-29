import React, { useState } from 'react'
import { EventContext } from '@/contexts/events-context'
import { useAuthContext } from '@/hooks/use-auth-context'
import { getEvents } from '@/services/events'
import { Event } from '@/models/event'

export const EventProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [events, setEvents] = useState<Event[]>([])
    const { profile } = useAuthContext()

    const fetchEvents = async () => {
        setIsLoading(true)
        const eventList = await getEvents(profile)
        if(!events) {
            setEvents(eventList!) 
        } else {
            // setErrorMessage("Failed to load your events. Please try again."); ---- IMPLEMENT ERROR CONTEXT?
        }
        setIsLoading(false)
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
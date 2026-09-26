import React, { useEffect, useState } from 'react'
import { GatheringContext } from '@/contexts/gathering-context'
import { useAuthContext } from '@/hooks/use-auth-context'
import { getGatherings, putGathering, deleteGathering } from '@/services/gathering'
import { appGathering } from '@/gathering/app-gathering'
import { GatheringError } from '@/gathering/gathering'
import { toUiGathering } from '@/gathering/to-ui-gathering'
import { EventRole, Gathering } from '@/models/gathering'
import { fetchEventAttendeesWithRoles } from '@/services/profiles'
import { Profile } from '@/models/profile'
import { Item } from '@/models/item'
import { deleteItem, getItems, postItem, putItem } from '@/services/items'
import {Category} from '@/models/category'

export const GatheringProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [gatherings, setGatherings] = useState<Gathering[]>([])
    const [items, setItems] = useState<Item[]>([])
    const [activeGathering, setActiveGathering] = useState<Gathering | null>(null)
    const [categories, setCategories] = useState<Category | null>(null)
    const { profile } = useAuthContext()

    async function fetchGatherings() {
        setIsLoading(true)
        try { 
            if(profile) {
                const { data, error } = (await getGatherings(profile.id))
                if (error || !data) throw Error()
                if (Array.isArray(data)) setGatherings(data)
            }
        } catch (error: any) {
            console.error("Unexpected error in fetchGatherings:", error)
        } finally {
            setIsLoading(false)
        }
    }

    

    useEffect(() => {
        fetchGatherings()
    }, [])


    const setActive = (gathering_id: string) => {
        const g = gatherings.find(item => item.id === gathering_id) ?? null
        console.log(g)
        setActiveGathering(g)
    }

    const fetchCategories = async () => {
        setIsLoading(true)
        try { 
            if(profile) {
                const { data, error } = (await getGatherings(profile.id)) //TODO: Change this to an RPC supabase function call
                if (error || !data) throw Error()
                if (Array.isArray(data)) setGatherings(data)
            }
        } catch (error: any) {
            console.error("Unexpected error in fetchGatherings:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createGathering = async (payload: Gathering) => {
        if (!profile) throw new Error('Not signed in')
        setIsLoading(true)
        try {
            const result = await appGathering.createGathering(profile.id, {
                name: payload.name,
                startTime: payload.start_time,
                location: typeof payload.location === 'string' ? payload.location : '',
                attire: payload.attire,
            })
            setActiveGathering(toUiGathering(result.gathering, result.role))
        } catch (error: any) {
            console.error("Error on createGathering: ", error)
            throw error
        } finally {
            fetchGatherings()
            setIsLoading(false)
        }
    }

    const joinGathering = async (gatheringCode: string) => {
        if (!profile) {
            return { ok: false as const, message: 'You need to be signed in to join.' }
        }
        try {
            const result = await appGathering.joinGathering(profile.id, gatheringCode)
            setActiveGathering(toUiGathering(result.gathering, result.role))
            await fetchGatherings()
            return { ok: true as const, gatheringId: result.gathering.id }
        } catch (error: any) {
            if (error instanceof GatheringError && error.code === 'not_found') {
                return { ok: false as const, message: error.message }
            }
            console.error('Error on joinGathering: ', error)
            return { ok: false as const, message: 'Something went wrong connecting to the server.' }
        }
    }

    const updateGathering = async (payload: Gathering) => {
        setIsLoading(true)
        try {
            const {data, error} = await putGathering(payload)
            if (error || !data) throw Error()
            if (Array.isArray(data)) {
                setActive(data[0].id ?? "")
            } else {
                setActive(data.id ?? "")
            }
        } catch (error: any) {
            console.error("Error on updateGathering: ", error)
        } finally {
            fetchGatherings()
            setIsLoading(false)
        }
    }

    const removeGathering = async (payload: Gathering) => {
        setIsLoading(true)
        try {
            const {error} = await deleteGathering(payload)
            if (error) throw Error()
            setActive("")
        } catch (error: any) {
            console.error("Error on createGathering: ", error)
        } finally {
            fetchGatherings()
            setIsLoading(false)
        }
    }

    

    const getGatheringAttendees = async (payload: string) => {
        setIsLoading(true)
        try {
            const {data, error} = await fetchEventAttendeesWithRoles(payload)

            if (error || !data) {
                console.error(error);
                return;
            }          
              
            const formattedAttendees = data?.map((row: { profiles: Profile[]; role: EventRole }) => {
                const profile = Array.isArray(row.profiles) 
                    ? row.profiles[0] 
                    : row.profiles;
                    
                return {
                    first_name: profile?.first_name ?? 'Unknown',
                    last_name: profile?.last_name ?? 'Attendee',
                    role: row.role
                }
            }) || []

            return formattedAttendees;

        } catch (error: any) {
            console.error("Error on getGatheringAttendees: ", error)
        } finally {
            setIsLoading(false)
        }
    }

    const createCategory = async () => {
        //TODO
    }

    const updateCategory = async () => {
        //TODO
    }

    const removeCategory = async () => {
        //TODO
    } 

    return (
        <GatheringContext.Provider value={{
            isLoading, 
            gatherings, 
            activeGathering, 
            setActive, 
            fetchGatherings, 
            createGathering, 
            joinGathering,
            updateGathering, 
            removeGathering,
            fetchCategories, 
            createCategory, 
            updateCategory, 
            removeCategory,
            getGatheringAttendees,
        }}>
            {children}
        </GatheringContext.Provider>
    )
}
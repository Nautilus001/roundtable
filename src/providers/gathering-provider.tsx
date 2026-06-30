import React, { useEffect, useState } from 'react'
import { GatheringContext } from '@/contexts/gathering-context'
import { useAuthContext } from '@/hooks/use-auth-context'
import { getGatherings, postGathering, putGathering } from '@/services/gathering'
import { Gathering } from '@/models/gathering'

export const GatheringProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [gatherings, setGatherings] = useState<Gathering[]>([])
    const [activeGathering, setActiveGathering] = useState<Gathering | null>(null)

    const { profile } = useAuthContext()

    async function fetchGatherings() {
        setIsLoading(true)
        try { 
            if(profile) {
                const { data, error } = (await getGatherings(profile.id))
                if (error || !data) throw Error()
                if (data) setGatherings(data)
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
        setActiveGathering(
            gatherings.find(item => item.id === gathering_id) ?? null
        )
    }

    const createGathering = async (payload: Gathering) => {
        setIsLoading(true)
        try {
            const {data, error} = await postGathering(payload)
            if (error || !data) throw Error()
            setActive(data[0].id ?? "")
        } catch (error: any) {
            console.error("Error on createGathering: ", error)
        } finally {
            fetchGatherings()
            setIsLoading(false)
        }
    }

    const updateGathering = async (payload: Gathering) => {
        setIsLoading(true)
        try {
            const {data, error} = await putGathering(payload)
            if (error || !data) throw Error()
            setActive(data[0].id ?? "")
        } catch (error: any) {
            console.error("Error on createGathering: ", error)
        } finally {
            fetchGatherings()
            setIsLoading(false)
        }
    }

    return (
        <GatheringContext.Provider value={{isLoading, gatherings, activeGathering, setActive, fetchGatherings, createGathering, updateGathering}}>
            {children}
        </GatheringContext.Provider>
    )
}
import React, { useEffect, useState } from 'react'
import { GatheringContext } from '@/contexts/gathering-context'
import { useAuthContext } from '@/hooks/use-auth-context'
import { getGatherings } from '@/services/gathering'
import { Gathering } from '@/models/gathering'

export const GatheringProvider = ({ children }: { children: React.ReactNode }) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [gatherings, setGatherings] = useState<Gathering[]>([])
    const { profile } = useAuthContext()

    async function fetchGatherings() {
        setIsLoading(true)
        try { 
            if(profile) {
                const data = (await getGatherings(profile.id))
                if (data) setGatherings(data)
                if (!data) throw Error()
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

    const createGathering = async () => {
        setIsLoading(true)
        try {

        } catch {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <GatheringContext.Provider value={{isLoading, gatherings, fetchGatherings, createGathering}}>
            {children}
        </GatheringContext.Provider>
    )
}
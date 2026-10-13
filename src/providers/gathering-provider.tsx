import {GatheringContext} from "@/contexts/gathering-context"
import {useAuthContext} from "@/hooks/use-auth-context"
import {Gathering, EventRole} from "@/models/gathering"
import {Profile} from "@/models/profile"
import * as gatheringService from "@/services/gathering"
import {fetchEventAttendeesWithRoles} from "@/services/profiles"
import { normalizeArray } from "@/services/util"
import {useState, useEffect} from "react"

export const GatheringProvider = ({ children }: { children: React.ReactNode }) => {

    const [gatheringError, setGatheringError] = useState<string>()
    const [gatherings, setGatherings] = useState<Gathering[]>([])
    const [activeGathering, setActiveGathering] = useState<Gathering | null>(null)

    const { profile } = useAuthContext()

    useEffect(() => {
        if(profile) fetchGatherings()
    }, [profile])

    async function fetchGatherings() {
        const { data, error } = (await gatheringService.fetchGatherings(profile.id))
        
        if(error) {
            setGatheringError("Error retrieving Gatherings.")
            console.error("Unexpected error in gathering-providfer>fetchGatherings:", error)
            return
        }

        setGatherings(normalizeArray(data))
    }

    const createGathering = async (payload: Gathering) => {
        const {data, error} = await gatheringService.createGathering(payload)

        if(error) {
            setGatheringError("Error creating gathering.")
            console.error("Error in gathering-provider>createGathering")
            return
        }

        setActiveGathering(data)
    }

    const updateGathering = async (payload: Gathering) => {
        const {data, error} = await gatheringService.updateGathering(payload)

        if(error) {
            setGatheringError("Error updating Gatherings.")
            console.error("Unexpected error in gathering-providfer>updateGatherings:", error)
            return
        }

        if(data) {
            setActiveGathering(data)

            setGatherings(current =>
                current.map(gathering =>
                    gathering.id === data.id ? { ...gathering, data } : gathering
                )
            )
        }
    }

    const deleteGathering = async (payload: Gathering) => {
        const {error} = await gatheringService.deleteGathering(payload)
        
        if(error) {
            setGatheringError("Error deleting Gathering.")
            console.error("Unexpected error in gathering-providfer>deleteGatherings:", error)
            return
        }

        setActiveGathering(null)
        
    }

    const setActive = (gathering_id: string) => {
        const g = gatherings.find(gathering => 
            gathering.id === gathering_id) ?? null
        setActiveGathering(g)
    }

    const getGatheringAttendees = async (payload: string) => {
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
        }
    }

    const joinGathering = async (gatheringCode: string) => {
        const { data, error } = (await gatheringService.joinEventByCode(gatheringCode))
        
        if(error || !data) {
            setGatheringError("Error joining Gathering.")
            console.error("Unexpected error in gathering-providfer>joinGatherings:", error)
            return
        }

        setActiveGathering(data)
        setGatherings(current =>
            current.map(gathering =>
                gathering.id === data.id ? { ...gathering, data } : gathering
            )
        )
    }

    return (
        <GatheringContext.Provider value={{
            gatherings, 
            activeGathering, 
            gatheringError,
            setActive, 
            fetchGatherings, 
            createGathering, 
            joinGathering,
            updateGathering, 
            deleteGathering,
            getGatheringAttendees,
        }}>
            {children}
        </GatheringContext.Provider>
    )
}
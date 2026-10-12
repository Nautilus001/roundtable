import {GatheringContext} from "@/contexts/gathering-context"
import {useAuthContext} from "@/hooks/use-auth-context"
import {Gathering, EventRole} from "@/models/gathering"
import {Profile} from "@/models/profile"
import {createGathering, updateGathering, deleteGathering, readGatherings} from "@/services/gathering"
import {fetchEventAttendeesWithRoles} from "@/services/profiles"
import { normalizeArray } from "@/services/util"
import {useState, useEffect} from "react"

export const GatheringProvider = ({ children }: { children: React.ReactNode }) => {

    const [gatheringError, setGatheringError] = useState<string>()
    const [gatherings, setGatherings] = useState<Gathering[]>([])
    const [activeGathering, setActiveGathering] = useState<Gathering | null>(null)

    const { profile } = useAuthContext()

    useEffect(() => {
        fetchGatherings()
    }, [])

    async function fetchGatherings() {
        const { data, error } = (await readGatherings(profile.id))
        
        if(error) {
            setGatheringError("Error retrieving Gatherings.")
            console.error("Unexpected error in gathering-providfer>fetchGatherings:", error)
            return
        }

        setGatherings(normalizeArray(data))
    }

    const addGathering = async (payload: Gathering) => {
        if (!profile) throw new Error('Not signed in')
        const {data, error} = await createGathering({
            name: payload.name,
            start_time: payload.start_time,
            location: typeof payload.location === 'string' ? payload.location : '',
            attire: payload.attire,
        })

        if(error) {
            setGatheringError(error.message)
            console.error("Error in gathering-provider>addGathering")
            return
        }

        setActiveGathering(data)
        
    }

    const updateGathering = async (payload: Gathering) => {
        try {
            const {data, error} = await putGathering(payload)
            if (error || !data) throw Error()
            const row = (Array.isArray(data) ? data[0] : data) as Gathering
            const saved = {
                name: row.name,
                start_time: row.start_time,
                location: row.location,
                attire: row.attire,
            }
            setActiveGathering(current =>
                current && current.id === row.id ? { ...current, ...saved } : current
            )
            setGatherings(current =>
                current.map(gathering =>
                    gathering.id === row.id ? { ...gathering, ...saved } : gathering
                )
            )
        } catch (error: any) {
            console.error("Error on updateGathering: ", error)
            throw error
        }
    }

    const removeGathering = async (payload: Gathering) => {
        try {
            const {error} = await deleteGathering(payload)
            if (error) throw Error()
            setActive("")
        } catch (error: any) {
            console.error("Error on createGathering: ", error)
        }
    }

    const setActive = (gathering_id: string) => {
        const g = gatherings.find(gathering => gathering.id === gathering_id) ?? null
        console.log(g)
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
            removeGathering,
            getGatheringAttendees,
        }}>
            {children}
        </GatheringContext.Provider>
    )
}
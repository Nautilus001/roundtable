import { EventContext } from "@/contexts/events-context"
import { useContext } from "react"

export const useEventContext = () => useContext(EventContext)
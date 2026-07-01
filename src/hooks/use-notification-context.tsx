import {NotificationContext} from "@/contexts/notification-context"
import { useContext } from "react"

export const useNotifContext = () => useContext(NotificationContext)
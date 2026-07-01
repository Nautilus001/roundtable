import {ToastConfig} from "@/models/toast"
import {createContext} from "react"

export type NotificationContextType = {
    showToast: (toast: ToastConfig) => void
}

export const NotificationContext = createContext<NotificationContextType>({
    showToast: () => {},
})


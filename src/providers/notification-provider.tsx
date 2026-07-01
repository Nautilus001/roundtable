import {NotificationContext} from "@/contexts/notification-context"
import {ToastConfig} from "@/models/toast"
import {useCallback, useState} from "react"



export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<ToastConfig | null>()

    const showToast = useCallback((t: ToastConfig) => {
        setToast(t)

        setTimeout(() => {
            setToast(null)
        }, t.timeout)
    },[])

    return (
        <NotificationContext.Provider value={{showToast}}>
            {children}
        </NotificationContext.Provider>)
}
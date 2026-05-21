import { createContext } from 'react'
export type EventsContextType = {
  claims?: Record<string, any> | null
  profile?: any | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<any>
  register: (email: string, password: string) => Promise<any>
  signout: () => Promise<any>
  refreshProfile: () => Promise<any>

}
export const AuthContext = createContext<EventsContextType>({
  claims: undefined,
  profile: undefined,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  signout: async () => {},
  refreshProfile: async () => {}
})
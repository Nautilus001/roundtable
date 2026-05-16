import { createContext, useContext } from 'react'
export type AuthContextType = {
  claims?: Record<string, any> | null
  user?: any | null
  profile?: any | null
  email?: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<any>
  register: (email: string, password: string) => Promise<any>
  signout: () => Promise<any>

}
export const AuthContext = createContext<AuthContextType>({
  claims: undefined,
  profile: undefined,
  user: undefined,
  email: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  signout: async () => {},
})

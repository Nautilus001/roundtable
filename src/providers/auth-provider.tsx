import React, { useEffect, useState } from 'react'
import { AuthContext } from '@/contexts/auth-context'
import { supabase } from '@/lib/supabase'
import { Alert } from 'react-native'



export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [claims, setClaims] = useState<Record<string, any> | null | undefined>(null)
    const [user, setUser] = useState<any>()
    const [email, setEmail] = useState("")
    const [isLoading, setLoading] = useState<boolean>(false)
    const [profile, setProfile] = useState<any>()

    async function fetchUserDataAndClaims() {
        setLoading(true)
        
        const [userResponse, claimsResponse] = await Promise.all([
            supabase.auth.getUser(),
            supabase.auth.getClaims()
        ])

        const userData = userResponse.data
        if (userData && userData.user) {
            setUser(userData.user)
            setEmail(userData.user.email ?? "")
        } else {
            setUser(null)
        }

        const claimsData = claimsResponse.data
        if (claimsData && claimsData.claims) {
            setClaims(claimsData.claims)
            const { data } = await supabase.from('profiles').select('*').eq('id', claimsData.claims.sub).single()
            setProfile(data)
        } else {
            setClaims(null)
        }
        setLoading(false)
    }
    

    useEffect(() => {
        fetchUserDataAndClaims()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            fetchUserDataAndClaims()
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    async function register(emailParam: string, passwordParam: string) {
        try {
            setLoading(true)
            const { data: d, error: e } = await supabase.auth.signUp({
                email: emailParam,
                password: passwordParam,
            })
            if (e) throw e
            else {
                const {data: d2, error: e2} = await supabase.auth.signInWithPassword({
                    email: emailParam,
                    password: passwordParam
                })
                if (e2) throw e2
                console.log(d2)
                return {data: d2, error: null}
            }            
        } catch (e: any) {
            throw Error(e.message)
        } finally {
            setLoading(false)
        }
    }

    async function login(emailParam: string, passwordParam: string) {
        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                email: emailParam,
                password: passwordParam,
            })
            if (error) throw error
            return { data, error: null }
        } catch (e: any) {
            throw Error(e.message)
        } finally {
            setLoading(false)
        }
    }

    async function signout() {
        try {
            setLoading(true)
            const { error } = await supabase.auth.signOut()
            if (error) throw error
        } catch (e: any) {
            console.error("Error signing out: ", e.message)
            Alert.alert(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            claims,
            profile,
            isLoading,
            user,
            email,
            login,
            register,
            signout
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}


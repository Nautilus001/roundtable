import { useAuthContext } from '@/hooks/use-auth-context'
import { supabase } from '@/lib/supabase'
import React from 'react'
import { Button } from 'react-native'



export default function SignOutButton() {
  const { signout, user } = useAuthContext()
  return <Button title="Sign out" onPress={() => {
    signout()
    
  }} />
}
import { useAuthContext } from '@/hooks/use-auth-context'
import { Button } from '@/components/ui/button'
import React from 'react'

export default function SignOutButton() {
  const { signout } = useAuthContext()
  return (
    <Button variant="outline" onPress={() => signout()}>
      Sign out
    </Button>
  )
}

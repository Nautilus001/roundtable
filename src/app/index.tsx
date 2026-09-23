import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuthContext } from '@/hooks/use-auth-context'
import LogoFork from '@/components/visual/logo-fork'
import LogoDrink from '@/components/visual/logo-drink'
import LogoFork2 from '@/components/visual/logo-fork-2'
import LogoNegFork from '@/components/visual/logo-fork-negative'
import { Button } from '@/components/ui/button'
import { Screen } from '@/components/ui/screen'
import { Stack } from '@/components/ui/stack'
import { Text } from '@/components/ui/text'
import { TextField } from '@/components/ui/text-field'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isRegister, setIsRegister] = useState(false)
  const [logo, setLogo] = useState(0)
  const { login, register} = useAuthContext()
  const logos = [<LogoDrink />, <LogoFork />, <LogoFork2 />, <LogoNegFork />]

  const router = useRouter()

  const handleRotate = () => {
    setLogo((logo + 1) % logos.length)
  }

  const handleSubmit = async () => {
    setError(null)
    if(isRegister){
      try {
        await register(email, password)
        setIsRegister(false)
        router.replace("/getting-started")
      } catch (error: any) {
        setError(error.message)
        setIsRegister(true)
      }
    } else {
      try {
        await login(email, password)
        router.replace("/account")
      } catch (error: any) {
        setError(error.message)
      }
    }
  }

  function handleSwitch() {
    setIsRegister(!isRegister)
    setError(null)
    setEmail("")
    setPassword("")
  }

  return (
    <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Stack gap="lg" style={{ maxWidth: 500 }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={handleRotate}>
            {logos[logo]}
          </TouchableOpacity>
        </View>

        <TextField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button onPress={handleSubmit}>
          {isRegister ? "Sign Up" : "Login"}
        </Button>
        {error && (
          <Text variant="error">An error has occurred: {error}</Text>
        )}
        <Button variant="ghost" onPress={handleSwitch}>
          {isRegister ? "Been here before? Login" : "New here? Sign Up!"}
        </Button>
      </Stack>
    </Screen>
  )
}

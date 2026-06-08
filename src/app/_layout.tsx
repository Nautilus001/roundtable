import { SplashScreenController } from '@/components/splash-screen-controller'
import { useAuthContext } from '@/hooks/use-auth-context'
import { AuthProvider } from '@/providers/auth-provider'
import { SplashScreen, Stack, useSegments } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

function RootNavigator() {
  const { claims } = useAuthContext()
  
  return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Protected guard={!claims}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!!claims}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="getting-started"/>
        </Stack.Protected>
        <Stack.Screen name="+not-found" />
      </Stack>
  )
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <SplashScreenController/>
          <RootNavigator/>
      <StatusBar style="auto" />
    </AuthProvider>
  )
}

export default RootLayout

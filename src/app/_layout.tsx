import { useAuthContext } from '@/hooks/use-auth-context'
import { useThemeContext } from '@/hooks/use-theme'
import { AuthProvider } from '@/providers/auth-provider'
import { GatheringProvider } from '@/providers/gathering-provider'
import { ThemeProvider } from '@/providers/theme-provider'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync()


function RootNavigator() {
  const { claims } = useAuthContext()
  
  return (
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Protected guard={!claims}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!!claims}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(gathering)/[id]/dashboard" options={{ headerShown: false }} />
          <Stack.Screen name="getting-started"/>
        </Stack.Protected>
      </Stack>
  )
}

function AppShell() {
  const { isInitialized } = useAuthContext()

  useEffect(() => {
    if (isInitialized) {
      SplashScreen.hideAsync()
    }
  }, [isInitialized])

  return <RootNavigator/>
}

function ThemedAppShell() {
  const { theme, isDark } = useThemeContext()

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <AppShell />
      </View>
    </SafeAreaProvider>
  )
}

const RootLayout = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <GatheringProvider>
          <ThemedAppShell />
        </GatheringProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default RootLayout

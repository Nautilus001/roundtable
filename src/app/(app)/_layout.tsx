import React from 'react'
import { Stack } from 'expo-router'

const AppLayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="account"/>
    </Stack>
  )
}

export default AppLayout
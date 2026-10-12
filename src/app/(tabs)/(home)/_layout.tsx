import React from 'react'
import {Stack} from 'expo-router'
 
function DashboardNavigator() {
  return (
      <Stack initialRouteName="home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
  )
}

export default DashboardNavigator

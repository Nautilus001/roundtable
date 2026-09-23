import React from 'react'
import {Stack} from 'expo-router'
 
function DashboardNavigator() {
  return (
      <Stack initialRouteName="dashboard" screenOptions={{headerShown: false}}>
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      </Stack>
  )
}

export default DashboardNavigator

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'
 
function DashboardNavigator() {
  
  return (
      <Stack initialRouteName="dashboard" screenOptions={{headerShown: false}}>
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen 
                name="[id]" 
                options={{ 
                    headerShown: false,
                    title: "Gathering Details" 
                }} 
            />
            <Stack.Screen name="+not-found" />
      </Stack>
  )
}

export default DashboardNavigator

const styles = StyleSheet.create({})
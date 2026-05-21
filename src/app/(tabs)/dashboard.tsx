import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '@/hooks/use-auth-context'
import { getEvents } from '@/services/events'
import { supabase } from '@/services/supabase'

const Dashboard = () => {
  const { profile } = useAuthContext()

  async function handlePress() {
    
    const { roles } =  await getEvents(profile.id)

    if( roles ) console.log(roles)
    
  }

  return (
      <View>
        <Text>Dashboard</Text>
        <TouchableOpacity onPress={handlePress}>
          <Text> Get Events </Text>
        </TouchableOpacity>
      </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})
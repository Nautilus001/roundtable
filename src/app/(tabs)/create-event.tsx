import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {CreateEventForm} from '@/components/events/create-event-form'
import {CreateEventPayload, EventData} from '@/models/events'
import { createEvent } from '@/services/events'
import { useAuthContext } from '@/hooks/use-auth-context'
import { createRoleEntry, RolePayload } from '@/services/roles'
import { SafeAreaView } from 'react-native-safe-area-context'

const CreateEvent = () => {
    const { profile } = useAuthContext();

    const handleSubmit = async (payload: CreateEventPayload) => {
        const { error } = await createEvent(payload)
        if (error) console.error(error.message)
    }

    return (
        <SafeAreaView style={styles.container}>
            <CreateEventForm onSubmit={handleSubmit}/>
        </SafeAreaView>
    )
}

export default CreateEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
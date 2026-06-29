import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {CreateEventForm} from '@/components/events/create-event-form'
import { Event } from '@/models/events'
import { createEvent } from '@/services/events'
import { SafeAreaView } from 'react-native-safe-area-context'

const CreateEvent = () => {

    const handleSubmit = async (payload: Event) => {
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
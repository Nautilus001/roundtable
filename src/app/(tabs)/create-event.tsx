import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {CreateEventForm} from '@/components/events/create-event-form'
import {EventData} from '@/models/events'

const CreateEvent = () => {
    return (
        <View style={styles.container}>
            <Text>CreateEvent</Text>
            <CreateEventForm onSubmit={function (eventData: Omit<EventData, 'id' | 'event_code' | 'role'>): void {
                throw new Error('Function not implemented.')
            } }/>
        </View>
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
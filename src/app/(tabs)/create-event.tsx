import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {CreateEventForm} from '@/components/events/create-event-form'
import {CreateEventPayload, EventData} from '@/models/events'
import { createEvent } from '@/services/events'
import { useAuthContext } from '@/hooks/use-auth-context'
import { createRoleEntry, RolePayload } from '@/services/roles'

const CreateEvent = () => {
    const {profile} = useAuthContext();

    const handleSubmit = async (payload: CreateEventPayload) => {
        const { data } = await createEvent(payload)
        const rolePayload: any = { event_id: data, profile_id: profile?.id, role: "OWNER"}
        await createRoleEntry(rolePayload)
    }

    return (
        <View style={styles.container}>
            <Text>CreateEvent</Text>
            <CreateEventForm onSubmit={handleSubmit}/>
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
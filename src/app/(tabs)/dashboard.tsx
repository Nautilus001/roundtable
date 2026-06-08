import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useAuthContext } from '@/hooks/use-auth-context'
import { getEvents } from '@/services/events'
import { supabase } from '@/services/supabase'
import {EventData} from '@/models/events'
import EventTile from '@/components/events/event-tile'

const Dashboard = () => {
    const { profile } = useAuthContext()
    const [eventsList, setEventsList] = useState<EventData[]>([])

    useEffect(() => {
        if (profile?.id) {
            fetchEvents()
        }
    },[profile.id])

    async function fetchEvents() {
        try {
            const data = await getEvents(profile.id)
            setEventsList(data)
        } catch (error) {
            Alert.alert("Error", "Could not fetch events.")
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            
            {eventsList.length > 0 && (
                <View style={styles.listContainer}>
                {eventsList.map((e) => (
                    <EventTile key={e.id} item={e} />
                ))}
                </View>
            )}
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#111827',
    },
    listContainer: {
        width: '100%',
        gap: 12, // Native gap spacing between tiles
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4f46e5',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
})
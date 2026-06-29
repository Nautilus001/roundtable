import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, useWindowDimensions, ActivityIndicator} from 'react-native'
import React, {useEffect, useState} from 'react'
import { useAuthContext } from '@/hooks/use-auth-context'
import { getEvents } from '@/services/events'
import { Event } from '@/models/event'
import EventTile from '@/components/events/event-tile'
import { SafeAreaView } from 'react-native-safe-area-context'

const Dashboard = () => {
    const { profile } = useAuthContext()
    const [eventsList, setEventsList] = useState< Event[]>([])
    const [isLoading, setIsLoading]  = useState<boolean>(true)

    const { width } = useWindowDimensions()
    const availableWidth = width - 32; 
    const numColumns = Math.max(1, Math.floor(availableWidth / 150));

    useEffect(() => {
        if (profile?.id) {
            fetchEvents()
        }
    },[profile])

    async function fetchEvents() {
        setIsLoading(true)
        try {
            const data = await getEvents(profile.id)
            setEventsList(data)
        } catch (error) {
            Alert.alert("Error", "Could not fetch events.")
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            <TouchableOpacity style={styles.submitButton} onPress={fetchEvents}>
                <Text style={styles.submitButtonText}>Refresh</Text>
            </TouchableOpacity>
            {isLoading ? (
                <ActivityIndicator size="large" color="#4f46e5" />
            ) : eventsList.length > 0 ? (
                <FlatList
                    key={`grid-${numColumns}`} 
                    data={eventsList}
                    numColumns={numColumns}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({item}) => (
                        <View style={{ 
                            width: availableWidth / numColumns, 
                            padding: 6
                        }}>
                            <EventTile item={item} />
                        </View>
                    )}
                    keyExtractor={item => item.id ?? Math.random().toString()}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text style={styles.title}>No events found.</Text>
            )}
        </SafeAreaView>
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
    submitButton: {
        backgroundColor: '#4f46e5',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        margin: 12,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
})
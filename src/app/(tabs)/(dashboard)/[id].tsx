import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, {act, useEffect, useState} from 'react'
import {useLocalSearchParams} from 'expo-router'
import {useGatheringContext} from '@/hooks/use-gathering-context'
import {GatheringForm} from '@/components/gathering/gathering-form'
import {Gathering} from '@/models/gathering'

const GatheringDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { activeGathering, updateGathering, setActive } = useGatheringContext()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(()=>{ 
        if(id && (activeGathering?.id !== id)) {
            setActive(id)
        }
    },[])

    const handleSubmit = async(payload: Gathering) => {
        setIsLoading(true)
        await updateGathering(payload)
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#4f46e5" />
            </View>
        )
    }

    if (!activeGathering) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>No active gathering found.</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <GatheringForm 
                initialData={activeGathering}
                onSubmit={handleSubmit} 
                isEdit={true} 
                isNew={false}
            />
        </View>
    )
}

export default GatheringDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        color: '#6b7280',
        fontSize: 16,
    }
})
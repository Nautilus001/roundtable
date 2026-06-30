import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {CreateGatheringForm} from '@/components/gathering/create-gathering-form'
import { Gathering } from '@/models/gathering'
import { createEvent } from '@/services/gathering'
import { SafeAreaView } from 'react-native-safe-area-context'

const CreateGathering = () => {

    const handleSubmit = async (payload: Gathering) => {
        const { error } = await createEvent(payload)
        if (error) console.error(error.message)
    }

    return (
        <SafeAreaView style={styles.container}>
            <CreateGatheringForm onSubmit={handleSubmit}/>
        </SafeAreaView>
    )
}

export default CreateGathering

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})
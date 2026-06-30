import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {GatheringForm} from '@/components/gathering/gathering-form'
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
            <GatheringForm onSubmit={handleSubmit} isEdit={true}/>
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
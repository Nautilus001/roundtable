import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {GatheringForm} from '@/components/gathering/gathering-form'
import { Gathering } from '@/models/gathering'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGatheringContext } from '@/hooks/use-gathering-context'

const CreateGathering = () => {

    const { createGathering } = useGatheringContext()

    const handleSubmit = async (payload: Gathering) => {
        try {
            await createGathering(payload)
        } catch (error: any) {
            console.error("Womp womp")
        }
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
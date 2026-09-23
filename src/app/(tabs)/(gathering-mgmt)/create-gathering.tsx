import React from 'react'
import {GatheringForm} from '@/components/gathering/gathering-form'
import { Gathering } from '@/models/gathering'
import { useGatheringContext } from '@/hooks/use-gathering-context'
import { Screen } from '@/components/ui/screen'
import { Stack } from '@/components/ui/stack'

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
        <Screen>
            <Stack style={{ flex: 1, maxWidth: 750, alignSelf: 'center' }}>
                <GatheringForm onSubmit={handleSubmit} isEdit={true}/>
            </Stack>
        </Screen>
    )
}

export default CreateGathering

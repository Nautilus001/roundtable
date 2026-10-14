import React, { useEffect } from 'react'
import {GatheringForm} from '@/components/gathering/gathering-form'
import { Gathering } from '@/models/gathering'
import { useGatheringContext } from '@/hooks/use-gathering-context'
import { Screen } from '@/components/ui/screen'
import { Stack } from '@/components/ui/stack'
import { router } from 'expo-router'
import { useAuthContext } from '@/hooks/use-auth-context'

const CreateGathering = () => {
    const { createGathering, activeGathering } = useGatheringContext()
    const { profile } = useAuthContext()

    useEffect(()=> {
        if(activeGathering && profile)
        router.push({
            pathname: '/(gathering)/[id]/dashboard',
            params: { id: activeGathering.id ?? "" }
        })
    }, [activeGathering])

    const handleSubmit = async (payload: Gathering) => {
        await createGathering(payload)
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

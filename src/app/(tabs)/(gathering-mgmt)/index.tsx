import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native'
import { router } from 'expo-router'
import { useGatheringContext } from '@/hooks/use-gathering-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Divider } from '@/components/ui/divider'
import { FieldGroup } from '@/components/ui/field-group'
import { Screen } from '@/components/ui/screen'
import { Stack } from '@/components/ui/stack'
import { Text } from '@/components/ui/text'
import { TextField } from '@/components/ui/text-field'

export default function WelcomeIndex() {
    const [eventCode, setEventCode] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    
    const { joinGathering } = useGatheringContext()

    const handleTextChange = (text: string) => {
        setErrorMsg('')
        const cleaned = text.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
        
        if (cleaned.length <= 4) {
        setEventCode(cleaned)
        } else {
        setEventCode(`${cleaned.slice(0, 4)}-${cleaned.slice(4, 8)}`)
        }
    }

    const handleJoin = async () => {
        setIsLoading(true);
        setErrorMsg('');

        try {
            const result = await joinGathering(eventCode)

            if (!result.ok) {
                setErrorMsg(result.message || 'We couldn’t find that Gathering. Double-check your code.')
                return
            }

            router.push(`/(gathering)/${result.gatheringId}/dashboard`)

        } catch (unexpectedError) {
            console.error('App-level unexpected crash:', unexpectedError);
            setErrorMsg('Unexpected error, please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Screen style={{ justifyContent: 'center' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ width: '100%' }}
            >
                <Card style={{ maxWidth: 400, alignSelf: 'center' }}>
                    <Stack gap="lg">
                        <Stack gap="sm" align="center">
                            <Text variant="title">Gatherings</Text>
                            <Text variant="body" style={{ textAlign: 'center' }}>
                                Enter a code to hop in, or start your own event.
                            </Text>
                        </Stack>

                        <FieldGroup label="Join Event">
                            <TextField
                                placeholder="e.g. ABCD-1234"
                                value={eventCode}
                                onChangeText={handleTextChange}
                                maxLength={9}
                                autoCapitalize="characters"
                                autoCorrect={false}
                            />
                        </FieldGroup>
                        {errorMsg ? <Text variant="error">{errorMsg}</Text> : null}

                        <Button onPress={handleJoin} loading={isLoading}>
                            Join
                        </Button>

                        <Divider label="or" />

                        <Button variant="outline" onPress={() => router.push('/create-gathering')}>
                            Create Event
                        </Button>
                    </Stack>
                </Card>
            </KeyboardAvoidingView>
        </Screen>
    )
}

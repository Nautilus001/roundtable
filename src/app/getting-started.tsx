import React, { useState } from 'react'
import AccountField from '@/components/account/account-field'
import { useAuthContext } from '@/hooks/use-auth-context'
import { router } from 'expo-router'
import { updateProfile } from '@/services/profiles'
import { Button } from '@/components/ui/button'
import { ErrorBanner } from '@/components/ui/error-banner'
import { FieldGroup } from '@/components/ui/field-group'
import { Screen } from '@/components/ui/screen'
import { Stack } from '@/components/ui/stack'
import { Text } from '@/components/ui/text'

const GettingStarted = () => {
    const { profile, refreshProfile } = useAuthContext()
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    async function handleSubmit() {
        if(firstName === "" || lastName === "") {
            setError(true)
        } else {
            const payload = {
                first_name: firstName,
                last_name: lastName
            }
            const { data, error } = await updateProfile(profile.id, payload)
            if(data) {
                await refreshProfile()
                router.replace("/(tabs)/account")
            }
            if (error) throw Error(error.message)
        }
    }

    return (
        <Screen>
            <Stack gap="lg" style={{ flex: 1, justifyContent: 'space-between' }}>
                <Stack gap="sm">
                    <Text variant="title">Let's get to know each other!</Text>
                    <Text variant="body">Before we get started, please tell us your name.</Text>
                </Stack>

                <Stack gap="lg" style={{ flex: 1 }}>
                    <FieldGroup label="First Name">
                        <AccountField 
                            placeholder={'Enter your first name'} 
                            value={firstName} 
                            setValue={setFirstName} 
                            isEdit={true}
                        />
                    </FieldGroup>
                    <FieldGroup label="Last Name">
                        <AccountField 
                            placeholder={'Enter your last name'} 
                            value={lastName} 
                            setValue={setLastName} 
                            isEdit={true}
                        />
                    </FieldGroup>
                    {error && (
                        <ErrorBanner>Please do not leave fields blank.</ErrorBanner>
                    )}
                </Stack>

                <Button onPress={handleSubmit}>Let's Go!</Button>
            </Stack>
        </Screen>
    )
}

export default GettingStarted

import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/hooks/use-auth-context'
import { useThemeContext } from '@/hooks/use-theme'
import AccountField from '@/components/account/account-field'
import SignOutButton from '@/components/auth-buttons/sign-out-button'
import { supabase } from '@/services/supabase'
import { deleteProfile, ProfileUpdateType, updateProfile } from '@/services/profiles'
import { ThemeMode } from '@/contexts/theme-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ErrorBanner } from '@/components/ui/error-banner'
import { FieldGroup } from '@/components/ui/field-group'
import { Screen } from '@/components/ui/screen'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Spacer } from '@/components/ui/spacer'
import { Stack } from '@/components/ui/stack'
import { Text } from '@/components/ui/text'

const APPEARANCE_MODES: ThemeMode[] = ['light', 'dark', 'system']

const AccountView = () => {
    const { profile } = useAuthContext()
    const { mode, setMode } = useThemeContext()
    const [firstName, setFirstName] = useState<string>(profile?.first_name ?? "")
    const [lastName, setLastName] = useState<string>(profile?.last_name ?? "")
    const [username, setUserName] = useState<string>(profile?.username ?? "")
    const [fieldError, setFieldError] = useState<boolean>(false)
    const [requestError, setRequestError] = useState<boolean>(false)
    const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false)

    useEffect(() => {
        if (profile) {
            setFirstName(profile.first_name)
            setLastName(profile.last_name)
            setUserName(profile.username)
        }
        setIsUpdateMode(false)
    }, [profile])

    async function handleUpdate() {
        setFieldError(false)
        setRequestError(false)

        if(isUpdateMode) {
            if(firstName === "" || lastName === "" || username === "") {
                setFieldError(true)
                return
            }
        }

        setIsUpdateMode(!isUpdateMode)

        const payload: ProfileUpdateType = {
            first_name: firstName, 
            last_name: lastName, 
            username: username
        }

        try {
            await updateProfile(profile.id, payload)
        } catch (error: any) {
            setRequestError(true)
        }  
    }

    async function handleDelete() {
        try {
            deleteProfile(profile.id)
            supabase.auth.signOut()
        } catch (error: any) {
            setRequestError(true)
        } 
    }

    return (
        <Screen>
            <Stack gap="md" style={{ flex: 1 }}>
                <Card>
                    <Stack gap="xs">
                        <Text variant="label">Welcome,</Text>
                        <Text variant="title">{profile?.email ?? "Anonymous"}</Text>
                    </Stack>
                </Card>

                <Card>
                    <Stack gap="md">
                        <FieldGroup label="Username">
                            <AccountField 
                                placeholder="Username"
                                value={username}
                                setValue={setUserName}
                                isEdit={isUpdateMode}
                            />
                        </FieldGroup>
                        <FieldGroup label="First Name">
                            <AccountField 
                                placeholder="First Name"
                                value={firstName}
                                setValue={setFirstName}
                                isEdit={isUpdateMode}
                            />
                        </FieldGroup>
                        <FieldGroup label="Last Name">
                            <AccountField 
                                placeholder="Last Name"
                                value={lastName}
                                setValue={setLastName}
                                isEdit={isUpdateMode}
                            />
                        </FieldGroup>
                    </Stack>
                </Card>

                {fieldError && (
                    <ErrorBanner>Please do not leave fields blank.</ErrorBanner>
                )}
                {requestError && (
                    <ErrorBanner>Error handling request. Try again soon.</ErrorBanner>
                )}

                <FieldGroup label="Appearance">
                    <SegmentedControl
                        options={APPEARANCE_MODES}
                        value={mode}
                        onChange={setMode}
                    />
                </FieldGroup>
                
                <Spacer />

                <Stack gap="md">
                    <Button onPress={handleUpdate}>
                        {isUpdateMode ? "Update :)" : "Make Changes"}
                    </Button>
                    {isUpdateMode && (
                        <Button variant="danger" onPress={handleDelete}>
                            Delete Account
                        </Button>
                    )}
                    <SignOutButton />
                </Stack>
            </Stack>
        </Screen>
    )
}

export default AccountView

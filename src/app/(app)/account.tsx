import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '@/hooks/use-auth-context'
import AccountField from '@/components/account/account-field'
import SignOutButton from '@/components/auth-buttons/sign-out-button'

const AccountView = () => {
    const { profile, email } = useAuthContext()
    const [firstName, setFirstName] = useState<string>(profile?.first_name ?? "")
    const [lastName, setLastName] = useState<string>(profile?.last_name ?? "")
    const [username, setUserName] = useState<string>(profile?.username ?? "")

    useEffect(() => {
        if (profile) {
            setFirstName(profile.first_name ?? "")
            setLastName(profile.last_name ?? "")
            setUserName(profile.username ?? "")
        }
    }, [profile])

    async function handleUpdate() {
        //do nothing yet.
    }

    return (
        <View>
            <Text>Welcome, {profile?.username ?? email ?? "Anonymous"} </Text>
            <AccountField 
            placeholder="Username"
            value={username}
            setValue={setUserName}
            />
            <AccountField 
            placeholder="First Name"
            value={firstName}
            setValue={setFirstName}
            />
            <AccountField 
            placeholder="Last Name"
            value={lastName}
            setValue={setLastName}
            />
            <TouchableOpacity onPress={handleUpdate}>
                <Text>Update my profile :)</Text>
            </TouchableOpacity>
            <SignOutButton/>
        </View>
    )
}

export default AccountView

const styles = StyleSheet.create({

})
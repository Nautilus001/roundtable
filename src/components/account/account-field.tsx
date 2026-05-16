import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '@/hooks/use-auth-context'

interface AccountFieldProps {
    placeholder: string,
    value: string
    setValue: (text: string) => void
}

const AccountField = ({placeholder, value, setValue}: AccountFieldProps ) => {
    return (
        <View>
            {value ? 
                <Text>Welcome: {value} </Text>
                :
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={setValue}
                    autoCapitalize="none"
                    />
            }
        </View>
    )
}

export default AccountField

const styles = StyleSheet.create({
    input : {
        fontSize: 12,
        color: 'blue',
    }
})
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useAuthContext } from '@/hooks/use-auth-context'

interface AccountFieldProps {
    placeholder: string,
    value: string
    setValue: (text: string) => void
    isEdit: boolean
}

const AccountField = ({placeholder, value, setValue, isEdit}: AccountFieldProps ) => {
    if (isEdit) {
        return (
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={setValue}
                autoCapitalize="none"
            />
        )
    } else {
        return (
            <View style={styles.textContainer}>
                <Text style={styles.baseText}>{value || placeholder}</Text>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    baseText: {
        fontSize: 16,
        color: '#1f2937', 
        fontFamily: 'System', 
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db', 
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        minHeight: 44,
    },
    textContainer: {
        paddingHorizontal: 12, 
        paddingVertical: 10,   
        minHeight: 44,         
        justifyContent: 'center',
    }
})

export default AccountField
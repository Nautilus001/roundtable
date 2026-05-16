import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const NotFound = () => {
    const router = useRouter()
    return (
        <View>
            <Text>NotFound</Text>
            <TouchableOpacity onPress={() => router.replace("/")}>
                <Text> GO TO LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("/account")}>
                <Text> GO TO home</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NotFound


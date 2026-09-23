import { FlatList, View, TouchableOpacity, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useAuthContext } from '@/hooks/use-auth-context'
import { useThemeContext } from '@/hooks/use-theme'
import GatheringTile from '@/components/gathering/gathering-tile'
import { useGatheringContext } from '@/hooks/use-gathering-context'
import {router} from 'expo-router'
import { Button } from '@/components/ui/button'
import { Screen } from '@/components/ui/screen'
import { Stack } from '@/components/ui/stack'
import { Text } from '@/components/ui/text'

const Dashboard = () => {
    const { profile } = useAuthContext()
    const { theme } = useThemeContext()
    const { gatherings, fetchGatherings, setActive } = useGatheringContext()
    const [isLoading, setIsLoading]  = useState<boolean>(true)

    const { width } = useWindowDimensions()
    const availableWidth = width - theme.spacing.xl 
    const numColumns = Math.max(1, Math.floor(availableWidth / 150))

    const loadData = async () => {
        if(profile?.id) {
            setIsLoading(true)
            await fetchGatherings()
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    },[profile])

    return (
        <Screen style={{ alignItems: 'center' }}>
            <Stack gap="md" align="center">
                <Text variant="title">Dashboard</Text>
                <Button onPress={() => loadData()}>Refresh</Button>
            </Stack>
            {(isLoading) ? (
                <ActivityIndicator size="large" color={theme.colors.action} />
            ) : (gatherings && gatherings.length > 0) ? (
                <FlatList
                    key={`grid-${numColumns}`} 
                    data={gatherings}
                    numColumns={numColumns}
                    contentContainerStyle={{
                        width: '100%',
                        gap: theme.spacing.md,
                        alignItems: 'center',
                    }}
                    renderItem={({item}) => (
                        <TouchableOpacity onPress={() => {
                            setActive(item.id ?? "")
                            console.log(item)
                            router.push({
                                pathname: '/(gathering)/[id]/dashboard',
                                params: { id: item.id ?? "" }
                            })
                        }}>
                            <View style={{ 
                                width: availableWidth / numColumns, 
                                padding: theme.spacing.xs
                            }}>
                                <GatheringTile item={item} />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id ?? Math.random().toString()}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <Text variant="title">No events found.</Text>
            )}
        </Screen>
    )
}

export default Dashboard

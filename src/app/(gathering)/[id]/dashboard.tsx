import { ActivityIndicator, ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { useGatheringContext } from '@/hooks/use-gathering-context'
import { useThemeContext } from '@/hooks/use-theme'
import { GatheringForm } from '@/components/gathering/gathering-form'
import { Gathering } from '@/models/gathering'
import { Item } from '@/models/item'
import CountdownWidget from '@/components/gathering/countdown-widget'
import AttendeeTile from '@/components/gathering/attendee-tile'
import ItemTile from '@/components/item/item-tile'
import { getItems } from '@/services/items'
import { ItemModal } from '@/components/item/item-modal'
import { Button } from '@/components/ui/button'
import { Screen } from '@/components/ui/screen'
import { Stack } from '@/components/ui/stack'
import { Text } from '@/components/ui/text'
import { Spacer } from '@/components/ui/spacer'

interface Attendee {
    first_name: string
    last_name: string
    role: string
}

const GatheringDetails = () => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { activeGathering, updateGathering, setActive, getGatheringAttendees } = useGatheringContext()
    const { theme } = useThemeContext()
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [attendees, setAttendees] = useState<Attendee[]>([])
    const [items, setItems] = useState<Item[]>([])
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    
    const isHost = activeGathering?.role === "OWNER"

    useEffect(() => { 
        if (id && (activeGathering?.id !== id)) {
            setActive(id)
        }
    }, [id])

    useEffect(() => {
        const fetchGatheringData = async () => {
            if (id) {
                setIsLoading(true)
                
                const [attendeesData, itemsResponse] = await Promise.all([
                    getGatheringAttendees(id),
                    getItems(id)
                ])

                if (attendeesData) {
                    setAttendees(attendeesData)
                }

                if (itemsResponse.data) {
                    const fetchedItems = Array.isArray(itemsResponse.data) 
                        ? itemsResponse.data 
                        : [itemsResponse.data]
                    setItems(fetchedItems)
                }
                
                setIsLoading(false)
            }
        }
        fetchGatheringData()
    }, [id, activeGathering])

    const handleSubmit = async (payload: Gathering) => {
        setIsLoading(true)
        await updateGathering(payload)
        setIsLoading(false)
    }

    const handleItemAdded = (newItem: Item) => {
        setItems(prev => [...prev, newItem])
    }

    const handleItemUpdated = (updatedItem: Item) => {
        setItems(prevItems => 
            prevItems.map(item => item.id === updatedItem.id ? updatedItem : item)
        )
    }

    const handleItemRemoved = (removedItemId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== removedItemId))
    }

    if (isLoading) {
        return (
            <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={theme.colors.action} />
            </Screen>
        )
    }

    if (!activeGathering) {
        return (
            <Screen style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text variant="body">No active gathering found.</Text>
            </Screen>
        )
    }

    return (
        <Screen style={{ maxWidth: 1000, alignSelf: 'center' }}>
            <Stack direction="row" align="center" justify="space-between" gap="sm">
                <Button
                    variant={"outline"}
                    onPress={() => router.replace("/(tabs)/dashboard")}
                >
                    BACK
                </Button>
                <Text variant="title" style={{ flex: 1, textAlign: 'center', fontSize: 18 }}>
                    {activeGathering.name}
                </Text>
                <View style={{ minWidth: 88 }}>
                    {isHost && !isEdit && (
                        <Button onPress={() => setIsEdit(prev => !prev)}>
                            Edit
                        </Button>
                    )}
                </View>
            </Stack>
            <Spacer size="md" />
            <ScrollView 
                style={{ width: '100%', flex: 1 }} 
                contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
                showsVerticalScrollIndicator={false}
            >
                <Stack gap="md">
                    <CountdownWidget time={activeGathering.start_time} />
                    
                    <GatheringForm 
                        initialData={activeGathering}
                        onSubmit={handleSubmit} 
                        isEdit={isEdit}
                        isNew={false}
                    />

                    <Text variant="title" style={{ fontSize: 18 }}>Attendees</Text>
                    {attendees && attendees.length > 0 ? (
                        attendees.map((item, index) => (
                            <AttendeeTile 
                                key={`attendee-${index}`}
                                name={`${item.first_name} ${item.last_name}`} 
                                role={item.role} 
                            />
                        ))
                    ) : (
                        <Text variant="label">No attendees registered yet.</Text>
                    )}

                    <Stack direction="row" align="center" justify="space-between">
                        <Text variant="title" style={{ fontSize: 18 }}>Items</Text>
                        {isHost && (
                            <Button onPress={() => setIsAddModalOpen(true)}>
                                + Add Item
                            </Button>
                        )}
                    </Stack>
                    {items && items.length > 0 ? (
                        items.map((item, index) => (
                            <ItemTile 
                                key={`item-${item.id || index}`}
                                item={item} 
                                onItemUpdated={handleItemUpdated}
                                onItemRemoved={() => handleItemRemoved(item.id ?? "")}
                                canEdit={isHost}
                            />
                        ))
                    ) : (
                        <Text variant="label">No items added yet.</Text>
                    )}
                </Stack>
            </ScrollView>
            {activeGathering?.id && (
                <ItemModal 
                    visible={isAddModalOpen} 
                    gatheringId={activeGathering.id}
                    onClose={() => setIsAddModalOpen(false)}
                    onSave={handleItemAdded}
                />
            )}
        </Screen>
    )
}

export default GatheringDetails

import { Attire, Gathering } from '@/models/gathering'
import { getAttireTypes } from '@/services/enums'
import React, { useEffect, useMemo, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { DateForm } from '../utility/date-form'
import { useGatheringContext } from '@/hooks/use-gathering-context'
import { useThemeContext } from '@/hooks/use-theme'
import { router } from 'expo-router'
import { Theme } from '@/constants/theme'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field-group'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { Text } from '@/components/ui/text'
import { TextField } from '@/components/ui/text-field'
import { Stack } from '@/components/ui/stack'

interface GatheringFormProps {
    initialData?: Gathering
    onSubmit: (payload: Gathering) => Promise<void>
    isEdit: boolean
    isNew?: boolean
}

export const GatheringForm: React.FC<GatheringFormProps> = ({ onSubmit, isEdit, initialData, isNew = true }) => {
    const [name, setName] = useState(initialData?.name ?? "")
    const [locationName, setLocationName] = useState(initialData?.location ?? "")
    const [date, setDate] = useState(initialData?.start_time ?? new Date())
    const [attire, setAttire] = useState<Attire>(initialData?.attire ?? 'CASUAL')
    const [attireOptions, setAttireOptions] = useState<Attire[]>([])
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const { theme } = useThemeContext()
    const styles = useMemo(() => createStyles(theme), [theme])

    const { activeGathering, removeGathering } = useGatheringContext()

    useEffect(() => {
        async function fetchAttireOptions() {
            const { data, error } = await getAttireTypes()
            if (data) {
                setAttireOptions(data.map((item: { value: string }) => item.value as Attire))
            } else if (error) {
                console.error('Error fetching attire options:', error)
            }
        }
        fetchAttireOptions()
    }, [])

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            await onSubmit({
                id: activeGathering?.id ?? "",
                name: name.trim(),
                start_time: date,
                location: locationName.trim(),
                attire: attire
            })
            if (isNew) {
                router.replace("/dashboard")
            }
        } catch (error) {
            console.error("Error submitting the gathering:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        setIsSubmitting(true)
        try {
            if (activeGathering) await removeGathering(activeGathering)
            router.replace("/dashboard")
        } catch (error) {
            console.error("Error deleting the gathering:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    const formattedDate = date ? new Date(date).toLocaleDateString(undefined, { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    }) : "No date set"

    if (isEdit) {
        return (
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Stack gap="lg">
                    <FieldGroup label="Gathering Name">
                        <TextField
                            placeholder="Gala Dinner"
                            value={name}
                            onChangeText={setName}
                        />
                    </FieldGroup>

                    <FieldGroup label="Location / Venue">
                        <TextField
                            placeholder="e.g., Metropolitan Hall"
                            value={locationName}
                            onChangeText={setLocationName}
                        />
                    </FieldGroup>

                    <DateForm date={date} onChange={setDate} />

                    <FieldGroup label="Attire Requirement">
                        {attireOptions.length > 0 && (
                            <SegmentedControl
                                options={attireOptions}
                                value={attire}
                                onChange={setAttire}
                            />
                        )}
                    </FieldGroup>

                    <Button onPress={handleSubmit} loading={isSubmitting}>
                        {isNew ? "Create" : "Update"} Gathering
                    </Button>

                    {!isNew && (
                        <Button variant="danger" onPress={handleDelete} loading={isSubmitting}>
                            Delete Gathering
                        </Button>
                    )}
                </Stack>
            </ScrollView>
        )
    }

    return (
        <ScrollView 
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            <Stack gap="lg">
                <FieldGroup label="Gathering Name">
                    <TextField value={name || "Unnamed Gathering"} readOnly />
                </FieldGroup>

                <FieldGroup label="Location / Venue">
                    <TextField value={locationName || "No venue specified"} readOnly />
                </FieldGroup>

                <FieldGroup label="Date & Time">
                    <TextField value={formattedDate} readOnly />
                </FieldGroup>

                <FieldGroup label="Attire Requirement">
                    <Text variant="body">{attire}</Text>
                </FieldGroup>
            </Stack>
        </ScrollView>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    scrollView: {
        flex: 1,
        width: '100%',
        height: '100%',
        maxWidth: 750
    },
    scrollContainer: {
        paddingHorizontal: theme.spacing.xs,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.xl,
        width: '100%',
    },
})

import {Attire, Gathering} from '@/models/gathering'
import {getAttireTypes} from '@/services/enums'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator, Button} from 'react-native'
import DatePicker from '../utility/date-picker'
import { DateForm } from '../utility/date-form'
import { useGatheringContext } from '@/hooks/use-gathering-context'
import { router } from 'expo-router'

interface GatheringFormProps {
    initialData? : Gathering
    onSubmit: (eventData: Gathering) => Promise<void>
    isEdit: boolean
    isNew?: boolean
}

export const GatheringForm: React.FC<GatheringFormProps> = ({ onSubmit, isEdit, initialData, isNew=true }) => {
    const [name, setName] = useState(initialData?.name ?? "")
    const [locationName, setLocationName] = useState(initialData?.location ?? "")
    const [date, setDate] = useState(initialData?.start_time ?? new Date())
    const [attire, setAttire] = useState<Attire>(initialData?.attire ?? 'CASUAL')
    const [attireOptions, setAttireOptions] = useState<Attire[]>([])
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const {activeGathering, setActive, removeGathering} = useGatheringContext()

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
        } finally {
            setActive("")
            setIsSubmitting(false)
            router.push("/dashboard")
        }
    }

    const handleDelete = async () => {

        setIsSubmitting(true)

        try {
            if(activeGathering) await removeGathering(activeGathering)
        } catch (error: any) {
            console.error("Error deleting the gathering")
        } finally {
            setActive("")
            setIsSubmitting(false)
            router.push("/dashboard")
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.formTitle}>Create New Gathering</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Gathering Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Gala Dinner"
                    placeholderTextColor="#9ca3af"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Location / Venue</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Metropolitan Hall"
                    placeholderTextColor="#9ca3af"
                    value={locationName}
                    onChangeText={setLocationName}
                />
            </View>

            <View>
                <DateForm date={date} onChange={setDate} />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Attire Requirement</Text>
                <View style={styles.segmentedControl}>
                {attireOptions.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.segmentButton,
                            attire === option && styles.segmentButtonActive
                        ]}
                        onPress={() => setAttire(option)}
                    >
                        <Text style={[
                            styles.segmentText,
                            attire === option && styles.segmentTextActive
                        ]}>
                            {option}
                        </Text>
                    </TouchableOpacity>
                ))}
                </View>
            </View>

            <TouchableOpacity 
                style={[styles.submitButton]} 
                onPress={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? <ActivityIndicator size="large" color="#4f46e5" /> :
                    <Text style={styles.submitButtonText}>
                        {isNew ? "Create" : "Update"} Gathering
                    </Text>
                }
            </TouchableOpacity>

            {!isNew &&
                <TouchableOpacity 
                    style={[styles.submitButton]} 
                    onPress={handleDelete}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <ActivityIndicator size="large" color="#4f46e5" /> :
                        <Text style={styles.submitButtonText}>
                            Delete Gathering
                        </Text>
                    }
                </TouchableOpacity>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 24,
        backgroundColor: '#ffffff',
    },
    formTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: '#111827',
        backgroundColor: '#f9fafb',
    },
    dateInput: {
        flex: 1, 
        flexDirection: "row",
        paddingVertical: 12
    },
    segmentedControl: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    segmentButton: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#d1d5db',
        backgroundColor: '#ffffff',
    },
    segmentButtonActive: {
        backgroundColor: '#4f46e5',
        borderColor: '#4f46e5',
    },
    segmentText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#4b5563',
    },
    segmentTextActive: {
        color: '#ffffff',
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#4f46e5',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 12,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
})
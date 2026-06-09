import {Attire, CreateEventPayload, EventData} from '@/models/events';
import {getAttireTypes} from '@/services/enums';
import React, { useEffect, useState } from 'react';
import { 
    StyleSheet, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    ScrollView, 
    Alert 
} from 'react-native';


interface CreateEventFormProps {
    onSubmit: (eventData: CreateEventPayload) => void;
    isSubmitting?: boolean;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSubmit, isSubmitting = false }) => {
    const [name, setName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [locationName, setLocationName] = useState('');
    const [attire, setAttire] = useState<Attire>('CASUAL');
    const [attireOptions, setAttireOptions] = useState<Attire[]>([])

    useEffect(() => {
        async function fetchAttireOptions() {
            const { data, error } = await getAttireTypes()

            if (data) {
                setAttireOptions(data.map((item: { value: string }) => item.value as Attire));
            } else if (error) {
                console.error('Error fetching attire options:', error);
            }
        }

        fetchAttireOptions();
    }, []);

    const handleCreate = () => {
        if (!name.trim() || !startTime.trim() || !locationName.trim()) {
            Alert.alert('Missing Fields', 'Please fill out all fields before submitting.');
            return;
        }

        const parsedDate = new Date(startTime);
            if (isNaN(parsedDate.getTime())) {
            Alert.alert('Invalid Date', 'Please enter a valid date format (YYYY-MM-DD HH:MM).');
            return;
        }

        onSubmit({
            name: name.trim(),
            start_time: parsedDate,
            location: { name: locationName.trim() },
            attire: attire
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.formTitle}>Create New Event</Text>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Event Name</Text>
                <TextInput
                style={styles.input}
                placeholder="e.g., Gala Dinner"
                placeholderTextColor="#9ca3af"
                value={name}
                onChangeText={setName}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Start Date & Time</Text>
                <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD HH:MM (e.g., 2026-05-21 19:30)"
                placeholderTextColor="#9ca3af"
                value={startTime}
                onChangeText={setStartTime}
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
                style={[styles.submitButton, isSubmitting && styles.disabledButton]} 
                onPress={handleCreate}
                disabled={isSubmitting}
            >
                <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Creating...' : 'Create Event'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

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
    disabledButton: {
        backgroundColor: '#9ca3af',
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
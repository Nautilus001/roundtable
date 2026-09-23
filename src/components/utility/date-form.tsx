import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native'
import DatePicker from '@/components/utility/date-picker'
import { useThemeContext } from '@/hooks/use-theme'
import { Theme } from '@/constants/theme'

interface DateFormProps {
    date: Date
    onChange: (newDate: Date) => void
    label?: string
}

export const DateForm: React.FC<DateFormProps> = ({ date, onChange, label = "Date & Time" }) => {
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false)
    const [showTimePicker, setShowTimePicker] = useState<boolean>(false)
    const { theme } = useThemeContext()
    const styles = useMemo(() => createStyles(theme), [theme])

    const parsedDate = date ? new Date(date) : null;

    if (!parsedDate || isNaN(parsedDate.getTime())) return '';

    const onDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false)
        }
        if (selectedDate) {
            const newDate = new Date(parsedDate)
            newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
            onChange(newDate)
        }
    }

    const onTimeChange = (event: any, selectedTime?: Date) => {
        if (Platform.OS === 'android') {
            setShowTimePicker(false)
        }
        if (selectedTime) {
            const newDate = new Date(parsedDate)
            newDate.setHours(selectedTime.getHours(), selectedTime.getMinutes())
            onChange(newDate)
        }
    }

    return (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>

            {Platform.OS === 'ios' ? (
                <View style={styles.iosPickerContainer}>
                    <DatePicker value={parsedDate} mode="date" onChange={onDateChange} />
                    <DatePicker value={parsedDate} mode="time" onChange={onTimeChange} />
                </View>
            ) : Platform.OS === 'android' ? (
                <View style={styles.androidPickerContainer}>
                    <TouchableOpacity style={styles.pickerButton} onPress={() => setShowDatePicker(true)}>
                        <Text style={styles.pickerButtonText}>
                            {parsedDate.toLocaleDateString(undefined, { dateStyle: 'medium' })}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.pickerButton} onPress={() => setShowTimePicker(true)}>
                        <Text style={styles.pickerButtonText}>
                            {parsedDate.toLocaleTimeString(undefined, { timeStyle: 'short' })}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && <DatePicker value={parsedDate} mode="date" onChange={onDateChange} />}
                    {showTimePicker && <DatePicker value={parsedDate} mode="time" onChange={onTimeChange} />}
                </View>
            ) : (
                <View style={styles.webPickerContainer}>
                    <DatePicker value={parsedDate} mode="date" onChange={onDateChange} />
                    <DatePicker value={parsedDate} mode="time" onChange={onTimeChange} />
                </View>
            )}
        </View>
    )
}

const createStyles = (theme: Theme) => StyleSheet.create({
    inputGroup: {
        marginBottom: theme.spacing.lg,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
    },
    iosPickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        paddingVertical: theme.spacing.xs,
    },
    androidPickerContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    webPickerContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    pickerButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
    },
    pickerButtonText: {
        fontSize: 16,
        color: theme.colors.textPrimary,
        fontWeight: '500',
    },
})

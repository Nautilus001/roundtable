import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface PickerProps {
    value: Date
    mode: 'date' | 'time'
    onChange: (event: any, date?: Date) => void
}

const DatePicker = ({value, mode, onChange}: PickerProps) => {
    return (
        <DateTimePicker value={value} mode={mode} display="default" onChange={onChange} />  
    )
}

export default DatePicker

const styles = StyleSheet.create({})
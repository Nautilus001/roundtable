import { createElement } from 'react'

interface PickerProps {
    value: Date | string
    mode: 'date' | 'time'
    onChange: (event: any, date?: Date) => void
}

export default function DatePicker({ value, mode, onChange }: PickerProps) {

    const dateObject = typeof value === 'string' ? new Date(value) : value

    const getFormattedValue = () => {
        if (!dateObject || isNaN(dateObject.getTime())) return ''
        
        if (mode === 'date') {
            const year = dateObject.getFullYear()
            const month = String(dateObject.getMonth() + 1).padStart(2, '0')
            const day = String(dateObject.getDate()).padStart(2, '0')
            return `${year}-${month}-${day}`
        } else {
            const hours = String(dateObject.getHours()).padStart(2, '0')
            const minutes = String(dateObject.getMinutes()).padStart(2, '0')
            return `${hours}:${minutes}`
        }
    }

    const handleWebChange = (event: any) => {
        const val = event.target.value
        if (!val) return 
        
        const updatedDate = new Date(dateObject || Date.now())

        if (mode === 'date') {
            const [year, month, day] = val.split('-').map(Number)
            updatedDate.setFullYear(year, month - 1, day)
        } else {
            const [hours, minutes] = val.split(':').map(Number)
            updatedDate.setHours(hours, minutes)
        }
        
        onChange(event, updatedDate)
    }

    return createElement('input', {
        type: mode,
        value: getFormattedValue(),
        onChange: handleWebChange,
        onClick: (e: any) => {
            if (typeof e.target.showPicker === 'function') {
                e.target.showPicker()
            }
        },
        style: {
        flex: 1,
        width: '100%',
        height: 45,
        padding: '10px 14px',
        fontSize: '16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        backgroundColor: '#f9fafb',
        color: '#111827',
        fontFamily: 'system-ui, sans-serif',
        boxSizing: 'border-box',
        cursor: 'pointer',
        },
    })
}
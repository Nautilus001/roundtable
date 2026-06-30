import { createElement } from 'react';

interface PickerProps {
    value: Date;
    mode: 'date' | 'time';
    onChange: (event: any, date?: Date) => void;
}

export default function DatePicker({ value, mode, onChange }: PickerProps) {

    const getFormattedValue = () => {
        if (!value || isNaN(value.getTime())) return '';
        
        if (mode === 'date') {
            const year = value.getFullYear();
            const month = String(value.getMonth() + 1).padStart(2, '0');
            const day = String(value.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } else {
            const hours = String(value.getHours()).padStart(2, '0');
            const minutes = String(value.getMinutes()).padStart(2, '0');
            return `${hours}:${minutes}`;
        }
    };

    const handleWebChange = (event: any) => {
        const val = event.target.value;
        if (!val) return; 
        
        const updatedDate = new Date(value);

        if (mode === 'date') {
            const [year, month, day] = val.split('-').map(Number);
            updatedDate.setFullYear(year, month - 1, day);
        } else {
            const [hours, minutes] = val.split(':').map(Number);
            updatedDate.setHours(hours, minutes);
        }
        
        onChange(event, updatedDate);
    };

    return createElement('input', {
        type: mode,
        value: getFormattedValue(),
        onChange: handleWebChange,
        onClick: (e: any) => {
            if (typeof e.target.showPicker === 'function') {
                e.target.showPicker();
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
    });
}
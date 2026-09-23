import { TextField } from '@/components/ui/text-field'

interface AccountFieldProps {
    placeholder: string,
    value: string
    setValue: (text: string) => void
    isEdit: boolean
}

const AccountField = ({placeholder, value, setValue, isEdit}: AccountFieldProps ) => {
    return (
        <TextField
            placeholder={placeholder}
            value={value}
            onChangeText={setValue}
            readOnly={!isEdit}
            autoCapitalize="none"
        />
    )
}

export default AccountField

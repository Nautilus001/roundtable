import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import { Text } from '@/components/ui/text'

interface TextFieldProps extends Omit<TextInputProps, 'onChangeText'> {
  value: string
  onChangeText?: (text: string) => void
  readOnly?: boolean
}

export const TextField = ({
  value,
  onChangeText,
  readOnly = false,
  placeholder,
  style,
  ...rest
}: TextFieldProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  if (readOnly) {
    return (
      <View style={styles.readOnly}>
        <Text>{value || placeholder}</Text>
      </View>
    )
  }

  return (
    <TextInput
      style={[styles.input, style]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.colors.textSecondary}
      {...rest}
    />
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    color: theme.colors.textPrimary,
    fontSize: 16,
    minHeight: 44,
    width: '100%',
  },
  readOnly: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    minHeight: 44,
    justifyContent: 'center',
  },
})

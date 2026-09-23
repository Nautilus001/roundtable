import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text'

interface FieldGroupProps {
  label: string
  children: React.ReactNode
}

export const FieldGroup = ({ label, children }: FieldGroupProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={styles.group}>
      <Text variant="label">{label}</Text>
      {children}
    </View>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  group: {
    width: '100%',
    gap: theme.spacing.xs,
  },
})

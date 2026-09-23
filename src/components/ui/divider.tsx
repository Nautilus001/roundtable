import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text'

interface DividerProps {
  label?: string
}

export const Divider = ({ label }: DividerProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  if (!label) {
    return <View style={styles.line} />
  }

  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text variant="label" style={styles.label}>{label}</Text>
      <View style={styles.line} />
    </View>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: theme.spacing.md,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  label: {
    fontWeight: '500',
  },
})

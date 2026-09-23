import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface SegmentedControlProps<T extends string> {
  options: T[]
  value: T
  onChange: (value: T) => void
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={styles.row}>
      {options.map((option) => {
        const isActive = option === value
        return (
          <TouchableOpacity
            key={option}
            style={[styles.segment, isActive && styles.segmentActive]}
            onPress={() => onChange(option)}
            activeOpacity={0.8}
          >
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {option}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    width: '100%',
  },
  segment: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    flexGrow: 1,
  },
  segmentActive: {
    backgroundColor: theme.colors.action,
    borderColor: theme.colors.action,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
  },
  labelActive: {
    color: theme.colors.onAction,
  },
})

import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

type Spacing = keyof Theme['spacing']

interface SpacerProps {
  size?: Spacing
}

export const Spacer = ({ size = 'lg' }: SpacerProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme, size), [theme, size])

  return <View style={styles.spacer} />
}

const createStyles = (theme: Theme, size: Spacing) => StyleSheet.create({
  spacer: {
    height: theme.spacing[size],
  },
})

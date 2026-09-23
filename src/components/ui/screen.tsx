import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ScreenProps extends ViewProps {
  children: React.ReactNode
  padded?: boolean
}

export const Screen = ({ children, padded = true, style, ...rest }: ScreenProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <SafeAreaView style={[styles.screen, padded && styles.padded, style]} {...rest}>
      {children}
    </SafeAreaView>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  padded: {
    padding: theme.spacing.md,
  },
})

import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text'

interface ErrorBannerProps {
  children: React.ReactNode
}

export const ErrorBanner = ({ children }: ErrorBannerProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={styles.banner}>
      <Text variant="error" style={styles.message}>{children}</Text>
    </View>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  banner: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.danger,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  message: {
    textAlign: 'center',
  },
})

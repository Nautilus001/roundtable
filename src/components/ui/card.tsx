import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

interface CardProps extends ViewProps {
  children: React.ReactNode
}

export const Card = ({ children, style, ...rest }: CardProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: theme.radius.sm,
    elevation: 2,
  },
})

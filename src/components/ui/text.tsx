import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native'

type TextVariant = 'title' | 'body' | 'label' | 'error'

interface TextProps extends RNTextProps {
  variant?: TextVariant
  children: React.ReactNode
}

export const Text = ({ variant = 'body', style, children, ...rest }: TextProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <RNText style={[styles[variant], style]} {...rest}>
      {children}
    </RNText>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  body: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  error: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.danger,
  },
})

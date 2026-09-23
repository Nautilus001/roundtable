import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ButtonVariant = 'action' | 'danger' | 'outline' | 'ghost'

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode
  variant?: ButtonVariant
  loading?: boolean
}

export const Button = ({
  children,
  variant = 'action',
  loading = false,
  disabled,
  style,
  ...rest
}: ButtonProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])
  const isDisabled = disabled || loading
  const spinnerColor = variant === 'danger' ? theme.colors.onDanger
    : variant === 'action' ? theme.colors.onAction
    : theme.colors.action

  const labelStyle = variant === 'danger' ? styles.dangerLabel
    : variant === 'outline' ? styles.outlineLabel
    : variant === 'ghost' ? styles.ghostLabel
    : styles.actionLabel

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], isDisabled && styles.disabled, style]}
      disabled={isDisabled}
      activeOpacity={0.8}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={spinnerColor} />
      ) : (
        <Text style={[styles.label, labelStyle]}>{children}</Text>
      )}
    </TouchableOpacity>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  action: {
    backgroundColor: theme.colors.action,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  outline: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    minHeight: 36,
  },
  disabled: {
    opacity: 0.7,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionLabel: {
    color: theme.colors.onAction,
  },
  dangerLabel: {
    color: theme.colors.onDanger,
  },
  outlineLabel: {
    color: theme.colors.textSecondary,
  },
  ghostLabel: {
    color: theme.colors.action,
    fontWeight: '600',
  },
})

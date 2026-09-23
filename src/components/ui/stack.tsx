import { Theme } from '@/constants/theme'
import { useThemeContext } from '@/hooks/use-theme'
import React, { useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

type Spacing = keyof Theme['spacing']

interface StackProps extends ViewProps {
  children: React.ReactNode
  direction?: 'column' | 'row'
  gap?: Spacing
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch'
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
}

export const Stack = ({
  children,
  direction = 'column',
  gap = 'md',
  align,
  justify,
  style,
  ...rest
}: StackProps) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  return (
    <View
      style={[
        styles.stack,
        {
          flexDirection: direction,
          gap: theme.spacing[gap],
          alignItems: align,
          justifyContent: justify,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  stack: {
    width: '100%',
  },
})

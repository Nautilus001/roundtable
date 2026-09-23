import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useThemeContext } from '@/hooks/use-theme'
import { Theme } from '@/constants/theme'

interface AttendeeTileProps {
  name: string
  role: string
}

export const AttendeeTile: React.FC<AttendeeTileProps> = ({ name, role }) => {
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])
  
  const getBadgeColors = (roleType: string) => {
    switch (roleType) {
      case 'OWNER':
        return { bg: theme.colors.primary, text: theme.colors.action } 
      case 'JUDGE':
        return { bg: theme.colors.secondary, text: theme.colors.accent } 
      case 'VOTER':
        return { bg: theme.colors.background, text: theme.colors.textSecondary }
      default:
        return { bg: theme.colors.background, text: theme.colors.textSecondary } 
    }
  }

  const badgeStyle = getBadgeColors(role)

  return (
    <View style={styles.attendeeRow}>
      <Text style={styles.detailItem}>
        {name}
      </Text>
      <View style={[styles.roleBadge, { backgroundColor: badgeStyle.bg }]}>
        <Text style={[styles.roleBadgeText, { color: badgeStyle.text }]}>
          {role}
        </Text>
      </View>
    </View>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  attendeeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    width: '100%',
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 1,
    elevation: 1,
  },
  detailItem: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  roleBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
})

export default AttendeeTile

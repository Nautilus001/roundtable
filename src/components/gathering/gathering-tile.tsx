import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { Gathering } from '@/models/gathering'
import { useThemeContext } from '@/hooks/use-theme'
import { Theme } from '@/constants/theme'

interface GatheringTileProps {
    item: Gathering
}

export const GatheringTile: React.FC<GatheringTileProps> = ({item}) => {  
    const { theme } = useThemeContext()
    const styles = useMemo(() => createStyles(theme), [theme])

    const formattedDate = new Date(item.start_time).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    })

    return (
        <View style={styles.eventTile}>
            <View style={styles.eventHeader}>
            <Text style={styles.eventName}>{item.name}</Text>
            <Text style={styles.eventRole}>{item.role}</Text>
            </View>

            <Text style={styles.eventDate}>{formattedDate}</Text>

            <View style={styles.eventDetails}>
            <Text style={styles.detailItem}>
                <Text style={styles.detailLabel}>Attire: </Text>
                {item.attire}
            </Text>
            <Text style={styles.detailItem}>
                <Text style={styles.detailLabel}>Code: </Text>
                <Text style={styles.eventCode}>{item.event_code}</Text>
            </Text>
            </View>
        </View>
    )
}

export default GatheringTile

const createStyles = (theme: Theme) => StyleSheet.create({
  eventTile: {
    padding: theme.spacing.md,
    maxWidth: 384,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  eventRole: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: theme.colors.textSecondary,
  },
  eventDate: {
    marginBottom: theme.spacing.md,
    fontSize: 14,
    color: theme.colors.action,
    fontWeight: '500',
  },
  eventDetails: {
    flexDirection: 'column',
    gap: theme.spacing.xs,
  },
  detailItem: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  detailLabel: {
    color: theme.colors.textSecondary,
  },
  eventCode: {
    fontFamily: 'Platform-specific-monospace',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: theme.radius.sm,
  },
})

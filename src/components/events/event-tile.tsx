import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Event } from '@/models/event'

interface EventTileProps {
    item: Event
}

export const EventTile: React.FC<EventTileProps> = ({item}) => {  

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
    );
}

export default EventTile

const styles = StyleSheet.create({
  eventTile: {
    padding: 16,
    maxWidth: 384,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  eventRole: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#6b7280',
  },
  eventDate: {
    marginBottom: 16,
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: '500',
  },
  eventDetails: {
    flexDirection: 'column',
    gap: 6,
  },
  detailItem: {
    fontSize: 14,
    color: '#4b5563',
  },
  detailLabel: {
    color: '#9ca3af',
  },
  eventCode: {
    fontFamily: 'Platform-specific-monospace',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
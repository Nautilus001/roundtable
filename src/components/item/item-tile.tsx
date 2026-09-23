import React, { useMemo, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Item } from '@/models/item'
import { useGatheringContext } from '@/hooks/use-gathering-context'
import { useThemeContext } from '@/hooks/use-theme'
import { ItemModal } from '@/components/item/item-modal'
import { Theme } from '@/constants/theme'

interface ItemTileProps {
  item: Item;
  canEdit: boolean;
  onItemUpdated?: (updatedItem: Item) => void; 
  onItemRemoved?: (removedItem: Item) => void; 
}

export const ItemTile: React.FC<ItemTileProps> = ({ item, onItemUpdated, onItemRemoved, canEdit = true }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])
  
  const { removeItem } = useGatheringContext();

  const formattedDate = new Date(item.created_at || Date.now()).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleRemove = async () => {
    console.log("execute remove")
    setIsDeleting(true);
    try {
      await removeItem(item);
      if (onItemRemoved) {
        onItemRemoved(item);
      }
    } catch (error: any) {
      console.error("Error removing item: ", error.message);
      Alert.alert('Error', error.message || 'Failed to remove item.');
      setIsDeleting(false);
    }
  };

  const handleEditSaved = (updatedItem: Item) => {
    if (onItemUpdated) onItemUpdated(updatedItem);
  }

  return (
    <>
      <View style={styles.tile}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.actionsContainer}>
            {isDeleting ? (
              <ActivityIndicator size="small" color={theme.colors.danger} />
            ) : (
              canEdit && (
                <>
                  <TouchableOpacity onPress={() => setIsEditModalVisible(true)}>
                    <Text style={styles.editAction}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleRemove}>
                    <Text style={styles.removeAction}>Remove</Text>
                  </TouchableOpacity>
                </>
              )
            )}
          </View>
        </View>

        <Text style={styles.date}>Added: {formattedDate}</Text>
      </View>

      <ItemModal
        visible={isEditModalVisible}
        gatheringId={item.gathering_id as string}
        item={item}
        onClose={() => setIsEditModalVisible(false)}
        onSave={handleEditSaved}
      />
    </>
  );
}

export default ItemTile;

const createStyles = (theme: Theme) => StyleSheet.create({
  tile: {
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: theme.spacing.md, 
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  editAction: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.action,
  },
  removeAction: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.danger,
  },
  date: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    fontWeight: '500',
    marginTop: theme.spacing.sm,
  },
});

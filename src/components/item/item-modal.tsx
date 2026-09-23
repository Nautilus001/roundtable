import React, { useEffect, useMemo, useState } from 'react'
import { Modal, StyleSheet, View, ActivityIndicator, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { postItem, putItem } from '@/services/items'
import { getRankables, Rankable } from '@/services/categories'
import { Item } from '@/models/item'
import { useThemeContext } from '@/hooks/use-theme'
import { Theme } from '@/constants/theme'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field-group'
import { Stack } from '@/components/ui/stack'
import { Text } from '@/components/ui/text'
import { TextField } from '@/components/ui/text-field'

interface ItemModalProps {
  visible: boolean
  gatheringId: string
  item?: Item
  onClose: () => void
  onSave: (savedItem: Item) => void
}

export const ItemModal: React.FC<ItemModalProps> = ({ visible, gatheringId, onClose, item, onSave }) => {
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState<Rankable[]>([])
  const [isFetchingCategories, setIsFetchingCategories] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const { theme } = useThemeContext()
  const styles = useMemo(() => createStyles(theme), [theme])

  const isEditMode = !!item;

  useEffect(() => {
    if (visible) {
      setName(item?.name || '')
      setCategoryId(item?.category_id || '')

      const loadCategories = async () => {
        setIsFetchingCategories(true)
        const { data, error } = await getRankables(gatheringId)
        setIsFetchingCategories(false)

        if (error || !data) {
          setErrorMsg('Failed to load categories.')
          return
        }

        setCategories(data)
        if (data.length > 0 && !item?.category_id) {
          setCategoryId(data[0].id)
        }
      }

      loadCategories()
    } else {
      setName('')
      setCategoryId('')
      setErrorMsg(null)
    }
  }, [visible, item])

  const handleSubmit = async () => {
    if (!name.trim()) {
      setErrorMsg('Please enter an item name.')
      return
    }

    if (!categoryId) {
      setErrorMsg('Please select a category.')
      return
    }

    setIsLoading(true)
    setErrorMsg(null)

    if (isEditMode && item) {
      const payload: Item = {
        ...item,
        name: name.trim(),
        category_id: categoryId,
      }
      const { data, error } = await putItem(payload)
      setIsLoading(false)

      if (error || !data) {
        setErrorMsg(error?.message || 'Failed to update item.')
        return
      }
      onSave(data as Item)
    } else {
      const payload: Partial<Item> = {
        name: name.trim(),
        category_id: categoryId,
        gathering_id: gatheringId,
      }
      const { data, error } = await postItem(payload as Item)
      setIsLoading(false)

      if (error || !data) {
        setErrorMsg(error?.message || 'Failed to add item.')
        return
      }
      onSave(data as Item)
    }
    
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Stack gap="md">
            <Text variant="title">{isEditMode ? 'Edit Item' : 'Add New Item'}</Text>

            {errorMsg && <Text variant="error">{errorMsg}</Text>}

            <FieldGroup label="Item Name">
              <TextField
                value={name}
                onChangeText={setName}
                placeholder="e.g. Ribeye Steak"
              />
            </FieldGroup>

            {isFetchingCategories ? (
              <ActivityIndicator color={theme.colors.action} size="small" />
            ) : categories && categories.length > 0 ? (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={categoryId}
                  onValueChange={(itemValue) => setCategoryId(itemValue)}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                >
                  {categories.map((cat) => (
                    <Picker.Item key={cat.id} label={cat.name} value={cat.id} color={theme.colors.textPrimary} />
                  ))}
                </Picker>
              </View>
            ) : null}

            <Stack direction="row" gap="md" justify="flex-end">
              <Button variant="ghost" onPress={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                onPress={handleSubmit}
                loading={isLoading}
                disabled={isFetchingCategories}
              >
                {isEditMode ? 'Save Changes' : 'Add Item'}
              </Button>
            </Stack>
          </Stack>
        </View>
      </View>
    </Modal>
  )
}

const createStyles = (theme: Theme) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  modalContent: {
    width: '100%',
    maxWidth: 384,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    elevation: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.background,
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden',
  },
  picker: {
    width: '100%',
    height: Platform.OS === 'ios' ? 90 : 50,
    color: theme.colors.textPrimary,
  },
  pickerItem: {
    height: 90,
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
})

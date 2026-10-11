import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getRankables, Rankable } from '@/services/categories'
import { useGatheringContext } from '@/hooks/use-gathering-context'

const CategoryCRUD = () => {
  const [category, setCategory] = useState<Rankable | null>()
  const { activeGathering } = useGatheringContext()
  
  useEffect (() => {
    updateCats()
  }, [])

  const updateCats = async () => {
    const {data} = await getRankables(activeGathering?.id ?? "")
    if (data) setCategory(data[0])
  }

  if(category) {
    return (
      <View>
        <Text>CategoryCRUD</Text>
        <Text>ID: {category.id}</Text>
        <Text>Name: {category.name}</Text>
        <Text>scale_id: {category.scale_id}</Text>
        <Text>profile_id: {category.profile_id}</Text>
        <Text>gathering_id: {category.gathering_id}</Text>
      </View>
    )
  } else {
    return ("No category found")
  }
}

export default CategoryCRUD

const styles = StyleSheet.create({})
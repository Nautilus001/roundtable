import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { CategoryContext } from '@/contexts/category-context';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useGatheringContext } from '@/hooks/use-gathering-context';
import { Category } from '@/models/category';
import { useCategoryContext } from '@/hooks/use-category-context';

export default function TestCategoryScreen() {
    const {
        categories,
        categoryError,
        fetchCategories,
        createCategory,
        removeCategory
    } = useCategoryContext();

    const { profile } = useAuthContext()

    const { activeGathering } = useGatheringContext()

    const [gatheringIdInput, setGatheringIdInput] = useState('');
    const [categoryNameInput, setCategoryNameInput] = useState('');

    const handleFetch = () => {
        if (!gatheringIdInput) return;
        fetchCategories(gatheringIdInput);
    };

    const handleCreate = () => {
        if (!gatheringIdInput || !profile || !activeGathering) 
            return;
        createCategory({
            name: categoryNameInput || 'Test Category',
            gathering_id: activeGathering.id,
            profile_id: profile.id,
            scale_id: "083b0242-1bc8-441a-b88e-752652b6e030"
        } as Category);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Category Context Test</Text>

            {categoryError ? <Text style={styles.error}>{categoryError}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Enter gathering_id"
                value={gatheringIdInput}
                onChangeText={setGatheringIdInput}
            />
            <Button title="Fetch Categories" onPress={handleFetch} />

            <TextInput
                style={[styles.input, { marginTop: 15 }]}
                placeholder="New Category Name"
                value={categoryNameInput}
                onChangeText={setCategoryNameInput}
            />
            <Button title="Create Category" onPress={handleCreate} />

            <Text style={styles.subtitle}>Categories Loaded ({categories?.length ?? 0}):</Text>
            
            <FlatList
                data={categories}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.rowText}>{item.name}</Text>
                        <Button 
                            title="Delete" 
                            color="red" 
                            onPress={() => removeCategory(item)} 
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 60 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
    subtitle: { fontSize: 16, fontWeight: '600', marginTop: 25, marginBottom: 10 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6 },
    error: { color: 'red', marginBottom: 10, fontWeight: '500' },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
    rowText: { fontSize: 16 }
});
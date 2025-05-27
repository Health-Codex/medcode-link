import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Trash2 } from 'lucide-react-native';
import { mockCodes } from '@/mocks/codes';
import { useFavoriteStore } from '@/store/favoriteStore';
import CodeItem from '@/components/CodeItem';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';

export default function FavoritesScreen() {
  const { favorites, clearFavorites } = useFavoriteStore();
  const [refreshing, setRefreshing] = useState(false);
  
  // Get favorite codes
  const favoriteCodes = mockCodes.filter(code => favorites?.includes(code.id));
  
  const handleClearAll = () => {
    if (clearFavorites) {
      clearFavorites();
    }
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Heart size={24} color={Colors.error} fill={Colors.error} />
          <Text style={styles.title}>Favorites</Text>
        </View>
        
        {favoriteCodes.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClearAll}
          >
            <Trash2 size={18} color={Colors.error} />
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <FlatList
        data={favoriteCodes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CodeItem code={item} />}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <EmptyState 
            title="No favorites yet"
            message="Tap the heart icon on any code to add it to your favorites"
          />
        }
        ListHeaderComponent={
          favoriteCodes.length > 0 ? (
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsText}>
                {favoriteCodes.length} {favoriteCodes.length === 1 ? 'favorite' : 'favorites'}
              </Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.errorLight,
  },
  clearButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.error,
    marginLeft: 4,
  },
  listContent: {
    padding: 16,
    flexGrow: 1,
  },
  resultsHeader: {
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
});
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Clock, X } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface RecentSearchesProps {
  searches: string[];
  onSearchSelect: (search: string) => void;
  onClearAll: () => void;
}

export default function RecentSearches({ 
  searches, 
  onSearchSelect, 
  onClearAll 
}: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        <TouchableOpacity onPress={onClearAll} style={styles.clearButton}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.searchesContainer}
      >
        {searches.map((search, index) => (
          <TouchableOpacity
            key={index}
            style={styles.searchChip}
            onPress={() => onSearchSelect(search)}
          >
            <Clock size={14} color={Colors.textMuted} />
            <Text style={styles.searchText}>{search}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  clearButton: {
    padding: 4,
  },
  clearText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '500',
  },
  searchesContainer: {
    paddingVertical: 4,
  },
  searchChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchText: {
    fontSize: 14,
    color: Colors.textLight,
    marginLeft: 6,
  },
});
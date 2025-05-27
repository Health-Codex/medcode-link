import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { CodeType } from '@/types';
import Colors from '@/constants/colors';

interface FilterChipsProps {
  selectedFilter: CodeType | 'All';
  onFilterChange: (filter: CodeType | 'All') => void;
}

const filters: (CodeType | 'All')[] = ['All', 'CPT', 'ICD-10'];

export default function FilterChips({ selectedFilter, onFilterChange }: FilterChipsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.chip,
            selectedFilter === filter && styles.selectedChip
          ]}
          onPress={() => onFilterChange(filter)}
        >
          <Text style={[
            styles.chipText,
            selectedFilter === filter && styles.selectedChipText
          ]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textLight,
  },
  selectedChipText: {
    color: Colors.background,
    fontWeight: '600',
  },
});
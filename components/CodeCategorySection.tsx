import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { MedicalCode } from '@/types';
import CodeItem from './CodeItem';
import Colors from '@/constants/colors';

interface CodeCategorySectionProps {
  title: string;
  codes: MedicalCode[];
  onViewAll: () => void;
  maxItems?: number;
}

export default function CodeCategorySection({ 
  title, 
  codes, 
  onViewAll, 
  maxItems = 3 
}: CodeCategorySectionProps) {
  const displayCodes = codes.slice(0, maxItems);
  const hasMore = codes.length > maxItems;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {hasMore && (
          <TouchableOpacity style={styles.viewAllButton} onPress={onViewAll}>
            <Text style={styles.viewAllText}>View All</Text>
            <ChevronRight size={16} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.codesContainer}>
        {displayCodes.map((code) => (
          <CodeItem key={code.id} code={code} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    marginRight: 4,
  },
  codesContainer: {
    gap: 0,
  },
});
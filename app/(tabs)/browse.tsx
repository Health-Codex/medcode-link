import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { mockCodes } from '@/mocks/codes';
import { MedicalCode } from '@/types';
import { useSearchStore } from '@/store/searchStore';
import CategoryFilter from '@/components/CategoryFilter';
import CodeCategorySection from '@/components/CodeCategorySection';
import Colors from '@/constants/colors';

// Define categories for grouping codes
const categories = [
  'All',
  'E&M',
  'Surgery',
  'Radiology',
  'Laboratory',
  'Anesthesia',
  'Physical Therapy',
  'Mental Health',
  'Preventive',
  'Emergency',
  'Cardiovascular',
  'Respiratory',
  'Musculoskeletal',
  'Digestive',
  'Genitourinary',
  'Endocrine',
  'Neurological',
  'Dermatology',
  'Infectious Disease',
  'Oncology',
  'Other'
];

// Function to categorize codes
const categorizeCode = (code: MedicalCode): string => {
  // CPT code categorization
  if (code.type === 'CPT') {
    if (code.code.startsWith('992') || code.code.startsWith('993')) {
      return 'E&M';
    } else if (code.code.startsWith('994') || code.code.startsWith('993')) {
      return 'Preventive';
    } else if (code.code.startsWith('1') || code.code.startsWith('2') || 
               code.code.startsWith('3') || code.code.startsWith('4') || 
               code.code.startsWith('5') || code.code.startsWith('6')) {
      return 'Surgery';
    } else if (code.code.startsWith('7')) {
      return 'Radiology';
    } else if (code.code.startsWith('8')) {
      return 'Laboratory';
    } else if (code.code.startsWith('00')) {
      return 'Anesthesia';
    } else if (code.code.startsWith('97')) {
      return 'Physical Therapy';
    } else if (code.code.startsWith('908') || code.code.startsWith('907')) {
      return 'Mental Health';
    } else if (code.code.startsWith('992') && (code.code.includes('81') || code.code.includes('85'))) {
      return 'Emergency';
    }
  }
  
  // ICD-10 code categorization
  if (code.type === 'ICD-10') {
    if (code.code.startsWith('I')) {
      return 'Cardiovascular';
    } else if (code.code.startsWith('J')) {
      return 'Respiratory';
    } else if (code.code.startsWith('M')) {
      return 'Musculoskeletal';
    } else if (code.code.startsWith('F')) {
      return 'Mental Health';
    } else if (code.code.startsWith('K')) {
      return 'Digestive';
    } else if (code.code.startsWith('N')) {
      return 'Genitourinary';
    } else if (code.code.startsWith('E')) {
      return 'Endocrine';
    } else if (code.code.startsWith('G')) {
      return 'Neurological';
    } else if (code.code.startsWith('L')) {
      return 'Dermatology';
    } else if (code.code.startsWith('A') || code.code.startsWith('B')) {
      return 'Infectious Disease';
    } else if (code.code.startsWith('C') || code.code.startsWith('D')) {
      return 'Oncology';
    }
  }
  
  return 'Other';
};

export default function BrowseScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categorizedCodes, setCategorizedCodes] = useState<Record<string, MedicalCode[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const { setSearchQuery, setFilterType } = useSearchStore();
  
  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    
    // Categorize all codes
    const groupedCodes: Record<string, MedicalCode[]> = {};
    
    // Initialize categories
    categories.forEach(category => {
      if (category !== 'All') {
        groupedCodes[category] = [];
      }
    });
    
    // Group codes by category
    mockCodes.forEach(code => {
      const category = categorizeCode(code);
      if (groupedCodes[category]) {
        groupedCodes[category].push(code);
      } else {
        groupedCodes[category] = [code];
      }
    });
    
    setCategorizedCodes(groupedCodes);
    
    // Simulate network delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleViewAll = (category: string) => {
    // Set search store to filter by this category
    setSearchQuery('');
    
    // For now, we'll just filter by code type as a simple example
    // In a real app, you'd have more sophisticated filtering
    if (category === 'E&M' || category === 'Surgery' || 
        category === 'Radiology' || category === 'Laboratory' ||
        category === 'Anesthesia' || category === 'Physical Therapy' ||
        category === 'Preventive' || category === 'Emergency') {
      setFilterType('CPT');
    } else if (category === 'Cardiovascular' || category === 'Respiratory' || 
               category === 'Musculoskeletal' || category === 'Mental Health' ||
               category === 'Digestive' || category === 'Genitourinary' ||
               category === 'Endocrine' || category === 'Neurological' ||
               category === 'Dermatology' || category === 'Infectious Disease' ||
               category === 'Oncology') {
      setFilterType('ICD-10');
    } else {
      setFilterType('All');
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Browse Codes' }} />
      
      <View style={styles.filterContainer}>
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {selectedCategory === 'All' ? (
            // Show all categories with codes
            Object.keys(categorizedCodes)
              .filter(category => categorizedCodes[category].length > 0)
              .sort((a, b) => categorizedCodes[b].length - categorizedCodes[a].length)
              .map((category) => (
                <CodeCategorySection 
                  key={category}
                  title={`${category} (${categorizedCodes[category].length})`}
                  codes={categorizedCodes[category]}
                  onViewAll={() => handleViewAll(category)}
                />
              ))
          ) : (
            // Show selected category
            categorizedCodes[selectedCategory] && categorizedCodes[selectedCategory].length > 0 ? (
              <View>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>{selectedCategory} Codes</Text>
                  <Text style={styles.categoryCount}>
                    {categorizedCodes[selectedCategory].length} codes
                  </Text>
                </View>
                {categorizedCodes[selectedCategory].map((code) => (
                  <View key={code.id} style={styles.codeItem}>
                    <View style={styles.codeHeader}>
                      <Text style={styles.codeText}>{code.code}</Text>
                      <View style={[
                        styles.codeTypeTag,
                        code.type === 'CPT' ? styles.cptTag : styles.icdTag
                      ]}>
                        <Text style={styles.codeTypeText}>{code.type}</Text>
                      </View>
                    </View>
                    <Text style={styles.description} numberOfLines={2}>
                      {code.description}
                    </Text>
                    <View style={styles.coverageContainer}>
                      <Text style={[
                        styles.coverageStatus,
                        code.coverage.status === 'Covered' && styles.coveredText,
                        code.coverage.status === 'Not Covered' && styles.notCoveredText,
                        code.coverage.status === 'Conditional' && styles.conditionalText,
                      ]}>
                        {code.coverage.status}
                      </Text>
                      <Text style={styles.insuranceText}>
                        {code.coverage.insurance === 'Both' 
                          ? 'Medicare & Medicaid' 
                          : code.coverage.insurance}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No codes found in this category</Text>
              </View>
            )
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  filterContainer: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 12,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  categoryHeader: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  categoryCount: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  codeItem: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  codeTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cptTag: {
    backgroundColor: Colors.primaryLight,
  },
  icdTag: {
    backgroundColor: Colors.secondaryLight,
  },
  codeTypeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 12,
    lineHeight: 22,
  },
  coverageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coverageStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  coveredText: {
    color: Colors.success,
  },
  notCoveredText: {
    color: Colors.error,
  },
  conditionalText: {
    color: Colors.warning,
  },
  insuranceText: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
});
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  FlatList, 
  Text, 
  ActivityIndicator, 
  TouchableOpacity,
  RefreshControl,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSearchStore } from '@/store/searchStore';
import { useAuthStore } from '@/store/authStore';
import SearchBar from '@/components/SearchBar';
import FilterChips from '@/components/FilterChips';
import CodeItem from '@/components/CodeItem';
import RecentSearches from '@/components/RecentSearches';
import SearchSuggestions from '@/components/SearchSuggestions';
import EmptyState from '@/components/EmptyState';
import QuickActions from '@/components/QuickActions';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';

const popularSearches = [
  '99213', '99214', 'diabetes', 'hypertension', 'chest pain', 
  'physical therapy', 'colonoscopy', 'mammogram', 'depression'
];

export default function SearchScreen() {
  const searchStore = useSearchStore();
  const { user } = useAuthStore();
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Safely destructure from store with fallbacks
  const {
    searchQuery = '',
    setSearchQuery,
    filterType = 'All',
    setFilterType,
    recentSearches = [],
    addRecentSearch,
    clearRecentSearches,
    getFilteredCodes,
    isLoading = false,
    setIsLoading
  } = searchStore || {};

  // Get filtered codes with error handling
  const filteredCodes = React.useMemo(() => {
    try {
      return getFilteredCodes ? getFilteredCodes() : [];
    } catch (error) {
      console.error('Error getting filtered codes:', error);
      return [];
    }
  }, [getFilteredCodes, searchQuery, filterType]);

  const handleSearch = (text: string) => {
    if (setSearchQuery) {
      setSearchQuery(text);
      setShowSuggestions(text.length === 0);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery && searchQuery.trim() && addRecentSearch) {
      // Provide haptic feedback on iOS/Android
      if (Platform.OS !== 'web') {
        Haptics.selectionAsync();
      }
      
      addRecentSearch(searchQuery.trim());
      setShowSuggestions(false);
      // Simulate loading state for better UX
      if (setIsLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }
  };

  const handleRecentSearchSelect = (search: string) => {
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    
    if (setSearchQuery) {
      setSearchQuery(search);
      setShowSuggestions(false);
      // Simulate loading state for better UX
      if (setIsLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.selectionAsync();
    }
    
    if (setSearchQuery && addRecentSearch) {
      setSearchQuery(suggestion);
      setShowSuggestions(false);
      addRecentSearch(suggestion);
      // Simulate loading state for better UX
      if (setIsLoading) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    }
  };

  const handleClearSearch = () => {
    setShowSuggestions(true);
  };
  
  const handleRefresh = () => {
    setRefreshing(true);
    
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={handleSearchSubmit}
          onClear={handleClearSearch}
          placeholder="Search by code or description..."
        />
        
        <FilterChips 
          selectedFilter={filterType}
          onFilterChange={setFilterType}
        />
        
        {showSuggestions && (
          <SearchSuggestions
            suggestions={popularSearches}
            onSuggestionPress={handleSuggestionPress}
            title="Popular Searches"
          />
        )}
        
        <RecentSearches 
          searches={recentSearches}
          onSearchSelect={handleRecentSearchSelect}
          onClearAll={clearRecentSearches}
        />
      </View>

      {searchQuery.length === 0 && !isLoading && (
        <View style={styles.homeContent}>
          {user && (
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>
                Welcome back, {user.name.split(' ')[0]}
              </Text>
              <Text style={styles.welcomeSubtext}>
                Find the medical codes you need quickly
              </Text>
            </View>
          )}
          <QuickActions />
        </View>
      )}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Searching codes...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredCodes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CodeItem code={item} />}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={
            searchQuery.length > 0 ? (
              <EmptyState 
                title="No codes found"
                message={`No results for "${searchQuery}". Try adjusting your search or filters.`}
              />
            ) : null
          }
          ListHeaderComponent={
            filteredCodes.length > 0 ? (
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsText}>
                  {filteredCodes.length} {filteredCodes.length === 1 ? 'result' : 'results'}
                </Text>
                <Text style={styles.searchQuery}>for "{searchQuery}"</Text>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  homeContent: {
    padding: 16,
  },
  welcomeContainer: {
    marginBottom: 20,
    backgroundColor: Colors.background,
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 14,
    color: Colors.textLight,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
    flexGrow: 1,
  },
  resultsHeader: {
    marginBottom: 12,
    paddingTop: 12,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  searchQuery: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 2,
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
});
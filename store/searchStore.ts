import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CodeType, CoverageStatus, InsuranceType, MedicalCode } from '@/types';
import { mockCodes } from '@/mocks/codes';

interface SearchState {
  searchQuery: string;
  recentSearches: string[];
  filterType: CodeType | 'All';
  filterCoverage: CoverageStatus | 'All';
  filterInsurance: InsuranceType | 'All';
  isLoading: boolean;
  
  setSearchQuery: (query: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  setFilterType: (type: CodeType | 'All') => void;
  setFilterCoverage: (coverage: CoverageStatus | 'All') => void;
  setFilterInsurance: (insurance: InsuranceType | 'All') => void;
  resetFilters: () => void;
  setIsLoading: (loading: boolean) => void;
  getFilteredCodes: () => MedicalCode[];
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      searchQuery: '',
      recentSearches: [],
      filterType: 'All',
      filterCoverage: 'All',
      filterInsurance: 'All',
      isLoading: false,
      
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      addRecentSearch: (query) => {
        if (!query.trim()) return;
        
        set((state) => {
          // Remove duplicate if exists
          const filteredSearches = state.recentSearches.filter(
            (search) => search.toLowerCase() !== query.toLowerCase()
          );
          
          // Add to beginning of array and limit to 10 items
          return {
            recentSearches: [query, ...filteredSearches].slice(0, 10)
          };
        });
      },
      
      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
      
      setFilterType: (type) => {
        set({ filterType: type });
      },
      
      setFilterCoverage: (coverage) => {
        set({ filterCoverage: coverage });
      },
      
      setFilterInsurance: (insurance) => {
        set({ filterInsurance: insurance });
      },
      
      resetFilters: () => {
        set({
          filterType: 'All',
          filterCoverage: 'All',
          filterInsurance: 'All'
        });
      },
      
      setIsLoading: (loading) => {
        set({ isLoading: loading });
      },
      
      getFilteredCodes: () => {
        const state = get();
        const query = state.searchQuery.toLowerCase().trim();
        
        try {
          return mockCodes.filter((code) => {
            // Filter by search query
            if (query && 
                !code.code.toLowerCase().includes(query) && 
                !code.description.toLowerCase().includes(query)) {
              return false;
            }
            
            // Filter by code type
            if (state.filterType !== 'All' && code.type !== state.filterType) {
              return false;
            }
            
            // Filter by coverage status
            if (state.filterCoverage !== 'All' && code.coverage.status !== state.filterCoverage) {
              return false;
            }
            
            // Filter by insurance type
            if (state.filterInsurance !== 'All' && code.coverage.insurance !== state.filterInsurance) {
              return false;
            }
            
            return true;
          });
        } catch (error) {
          console.error('Error filtering codes:', error);
          return [];
        }
      }
    }),
    {
      name: 'search-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        recentSearches: state.recentSearches,
        // Don't persist active search query and filters
      })
    }
  )
);
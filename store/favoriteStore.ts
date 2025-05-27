import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoriteState {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (id) => {
        set((state) => {
          if (!state.favorites.includes(id)) {
            return {
              favorites: [...state.favorites, id]
            };
          }
          return state;
        });
      },
      
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((favId) => favId !== id)
        }));
      },
      
      toggleFavorite: (id) => {
        const state = get();
        if (state.favorites.includes(id)) {
          state.removeFavorite(id);
        } else {
          state.addFavorite(id);
        }
      },
      
      isFavorite: (id) => {
        return get().favorites.includes(id);
      },
      
      clearFavorites: () => {
        set({ favorites: [] });
      }
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
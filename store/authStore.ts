import { create } from 'zustand';
import { User, ProfileUpdateData } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: ProfileUpdateData) => void;
}

// Mock users for demo
const mockUsers = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@medcodes.com',
    password: 'admin123',
    role: 'admin' as const,
    organization: 'MedCodes Inc.',
    specialty: 'Medical Coding',
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123',
    role: 'user' as const,
    organization: 'General Hospital',
    specialty: 'Cardiology',
  },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const user = mockUsers.find(
            u => u.email === email && u.password === password
          );
          
          if (user) {
            const { password, ...userWithoutPassword } = user;
            set({
              user: userWithoutPassword,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            set({
              error: 'Invalid email or password',
              isLoading: false,
            });
          }
        } catch (error) {
          set({
            error: 'An error occurred during login',
            isLoading: false,
          });
        }
      },
      
      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Check if user already exists
          const existingUser = mockUsers.find(u => u.email === email);
          
          if (existingUser) {
            set({
              error: 'User with this email already exists',
              isLoading: false,
            });
            return;
          }
          
          // Create new user (in a real app, this would be an API call)
          const newUser = {
            id: String(mockUsers.length + 1),
            name,
            email,
            role: 'user' as const,
          };
          
          set({
            user: newUser,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: 'An error occurred during signup',
            isLoading: false,
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
      
      updateProfile: (data) => {
        const { user } = get();
        
        if (user) {
          set({
            user: {
              ...user,
              ...data,
            },
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
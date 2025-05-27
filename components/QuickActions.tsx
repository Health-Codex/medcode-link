import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Search, Heart, TrendingUp, BookOpen, Activity, FileText } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSearchStore } from '@/store/searchStore';
import Colors from '@/constants/colors';

const quickActions = [
  {
    id: 'popular',
    title: 'Popular Codes',
    subtitle: 'Most searched',
    icon: TrendingUp,
    color: Colors.primary,
    searchQuery: '',
    filterType: 'All' as const,
    route: '/(tabs)/browse',
  },
  {
    id: 'cpt',
    title: 'CPT Codes',
    subtitle: 'Procedures & services',
    icon: FileText,
    color: Colors.secondary,
    searchQuery: '',
    filterType: 'CPT' as const,
  },
  {
    id: 'icd',
    title: 'ICD-10 Codes',
    subtitle: 'Diagnoses & conditions',
    icon: BookOpen,
    color: Colors.accent,
    searchQuery: '',
    filterType: 'ICD-10' as const,
  },
  {
    id: 'favorites',
    title: 'My Favorites',
    subtitle: 'Saved codes',
    icon: Heart,
    color: Colors.error,
    searchQuery: '',
    filterType: 'All' as const,
    route: '/(tabs)/favorites',
  },
];

export default function QuickActions() {
  const router = useRouter();
  const { setSearchQuery, setFilterType } = useSearchStore();

  const handleActionPress = (action: typeof quickActions[0]) => {
    if (action.route) {
      router.push(action.route as any);
    } else {
      setSearchQuery(action.searchQuery);
      setFilterType(action.filterType);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick Actions</Text>
      <View style={styles.actionsGrid}>
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <TouchableOpacity
              key={action.id}
              style={[styles.actionCard, { borderLeftColor: action.color }]}
              onPress={() => handleActionPress(action)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${action.color}15` }]}>
                <IconComponent size={24} color={action.color} />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  actionsGrid: {
    gap: 12,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
  },
});
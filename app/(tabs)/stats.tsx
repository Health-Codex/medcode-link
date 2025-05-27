import React, { useMemo } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart3, FileText, Heart, TrendingUp, Users, DollarSign, Activity } from 'lucide-react-native';
import { mockCodes } from '@/mocks/codes';
import { useFavoriteStore } from '@/store/favoriteStore';
import { useSearchStore } from '@/store/searchStore';
import StatsCard from '@/components/StatsCard';
import QuickActions from '@/components/QuickActions';
import Colors from '@/constants/colors';

export default function StatsScreen() {
  const { favorites } = useFavoriteStore();
  const { recentSearches } = useSearchStore();

  const stats = useMemo(() => {
    const totalCodes = mockCodes.length;
    const cptCodes = mockCodes.filter(code => code.type === 'CPT').length;
    const icdCodes = mockCodes.filter(code => code.type === 'ICD-10').length;
    
    const coveredCodes = mockCodes.filter(code => code.coverage.status === 'Covered').length;
    const notCoveredCodes = mockCodes.filter(code => code.coverage.status === 'Not Covered').length;
    const conditionalCodes = mockCodes.filter(code => code.coverage.status === 'Conditional').length;
    
    const medicareCodes = mockCodes.filter(code => 
      code.coverage.insurance === 'Medicare' || code.coverage.insurance === 'Both'
    ).length;
    const medicaidCodes = mockCodes.filter(code => 
      code.coverage.insurance === 'Medicaid' || code.coverage.insurance === 'Both'
    ).length;
    const bothInsurance = mockCodes.filter(code => 
      code.coverage.insurance === 'Both'
    ).length;

    const coveragePercentage = Math.round((coveredCodes / totalCodes) * 100);

    return {
      totalCodes,
      cptCodes,
      icdCodes,
      coveredCodes,
      notCoveredCodes,
      conditionalCodes,
      medicareCodes,
      medicaidCodes,
      bothInsurance,
      coveragePercentage,
      favoriteCount: favorites?.length || 0,
      recentSearchCount: recentSearches?.length || 0,
    };
  }, [favorites, recentSearches]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Activity size={28} color={Colors.primary} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Analytics Dashboard</Text>
            <Text style={styles.subtitle}>Medical coding insights & statistics</Text>
          </View>
        </View>

        <QuickActions />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Database Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <StatsCard
                title="Total Codes"
                value={stats.totalCodes.toLocaleString()}
                subtitle="In database"
                color={Colors.primary}
                icon={<FileText size={20} color={Colors.primary} />}
              />
              <StatsCard
                title="Coverage Rate"
                value={`${stats.coveragePercentage}%`}
                subtitle="Fully covered"
                color={Colors.success}
                icon={<TrendingUp size={20} color={Colors.success} />}
              />
            </View>
            <View style={styles.statsRow}>
              <StatsCard
                title="CPT Codes"
                value={stats.cptCodes.toLocaleString()}
                subtitle={`${Math.round((stats.cptCodes / stats.totalCodes) * 100)}% of total`}
                color={Colors.secondary}
                icon={<FileText size={20} color={Colors.secondary} />}
              />
              <StatsCard
                title="ICD-10 Codes"
                value={stats.icdCodes.toLocaleString()}
                subtitle={`${Math.round((stats.icdCodes / stats.totalCodes) * 100)}% of total`}
                color={Colors.accent}
                icon={<FileText size={20} color={Colors.accent} />}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coverage Analysis</Text>
          <View style={styles.coverageGrid}>
            <View style={styles.coverageCard}>
              <View style={styles.coverageHeader}>
                <Text style={styles.coverageTitle}>Coverage Distribution</Text>
              </View>
              <View style={styles.coverageStats}>
                <View style={styles.coverageStat}>
                  <View style={[styles.coverageIndicator, { backgroundColor: Colors.success }]} />
                  <Text style={styles.coverageLabel}>Covered</Text>
                  <Text style={styles.coverageValue}>{stats.coveredCodes}</Text>
                </View>
                <View style={styles.coverageStat}>
                  <View style={[styles.coverageIndicator, { backgroundColor: Colors.warning }]} />
                  <Text style={styles.coverageLabel}>Conditional</Text>
                  <Text style={styles.coverageValue}>{stats.conditionalCodes}</Text>
                </View>
                <View style={styles.coverageStat}>
                  <View style={[styles.coverageIndicator, { backgroundColor: Colors.error }]} />
                  <Text style={styles.coverageLabel}>Not Covered</Text>
                  <Text style={styles.coverageValue}>{stats.notCoveredCodes}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insurance Coverage</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <StatsCard
                title="Medicare"
                value={stats.medicareCodes.toLocaleString()}
                subtitle="Codes covered"
                color={Colors.info}
                icon={<Users size={20} color={Colors.info} />}
              />
              <StatsCard
                title="Medicaid"
                value={stats.medicaidCodes.toLocaleString()}
                subtitle="Codes covered"
                color={Colors.secondary}
                icon={<Users size={20} color={Colors.secondary} />}
              />
            </View>
            <View style={styles.statsRow}>
              <StatsCard
                title="Both Programs"
                value={stats.bothInsurance.toLocaleString()}
                subtitle="Medicare & Medicaid"
                color={Colors.primary}
                icon={<DollarSign size={20} color={Colors.primary} />}
              />
              <StatsCard
                title="Dual Coverage"
                value={`${Math.round((stats.bothInsurance / stats.totalCodes) * 100)}%`}
                subtitle="Of all codes"
                color={Colors.accent}
                icon={<TrendingUp size={20} color={Colors.accent} />}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Activity</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <StatsCard
                title="Favorites"
                value={stats.favoriteCount.toString()}
                subtitle="Saved codes"
                color={Colors.error}
                icon={<Heart size={20} color={Colors.error} />}
              />
              <StatsCard
                title="Recent Searches"
                value={stats.recentSearchCount.toString()}
                subtitle="Search history"
                color={Colors.accent}
                icon={<TrendingUp size={20} color={Colors.accent} />}
              />
            </View>
          </View>
        </View>

        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Key Insights</Text>
          <View style={styles.insightCard}>
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <TrendingUp size={16} color={Colors.success} />
              </View>
              <Text style={styles.insightText}>
                {stats.coveragePercentage}% of codes are fully covered by insurance programs
              </Text>
            </View>
            
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Users size={16} color={Colors.primary} />
              </View>
              <Text style={styles.insightText}>
                {stats.bothInsurance} codes are covered by both Medicare and Medicaid
              </Text>
            </View>
            
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <FileText size={16} color={Colors.secondary} />
              </View>
              <Text style={styles.insightText}>
                CPT codes represent {Math.round((stats.cptCodes / stats.totalCodes) * 100)}% of the database
              </Text>
            </View>
            
            <View style={styles.insightItem}>
              <View style={styles.insightIcon}>
                <Activity size={16} color={Colors.warning} />
              </View>
              <Text style={styles.insightText}>
                {stats.conditionalCodes} codes require special documentation for coverage
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  statsGrid: {
    gap: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  coverageGrid: {
    gap: 12,
  },
  coverageCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  coverageHeader: {
    marginBottom: 16,
  },
  coverageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  coverageStats: {
    gap: 12,
  },
  coverageStat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coverageIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  coverageLabel: {
    flex: 1,
    fontSize: 14,
    color: Colors.textLight,
  },
  coverageValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  insightsSection: {
    marginBottom: 24,
  },
  insightCard: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    color: Colors.textLight,
    lineHeight: 20,
  },
});
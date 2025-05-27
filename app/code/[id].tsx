import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Share, 
  Alert,
  Platform
} from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { 
  Heart, 
  Share2, 
  Clipboard, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { mockCodes } from '@/mocks/codes';
import { useFavoriteStore } from '@/store/favoriteStore';
import Colors from '@/constants/colors';

export default function CodeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  
  const [expandedSections, setExpandedSections] = useState({
    documentation: true,
    billing: true,
    coverage: true,
  });
  
  // Find the code by ID
  const code = mockCodes.find(c => c.id === id);
  
  if (!code) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Code not found</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const favorite = isFavorite(code.id);
  
  const handleToggleFavorite = () => {
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    toggleFavorite(code.id);
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `${code.code} - ${code.description}\nType: ${code.type}\nCoverage: ${code.coverage.status}`,
        title: `Medical Code: ${code.code}`,
      });
    } catch (error) {
      Alert.alert('Error', 'Could not share the code');
    }
  };
  
  const handleCopyCode = () => {
    // In a real app, this would copy to clipboard
    Alert.alert('Copied', `Code ${code.code} copied to clipboard`);
    
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  
  const getCoverageIcon = () => {
    switch (code.coverage.status) {
      case 'Covered':
        return <CheckCircle size={20} color={Colors.success} />;
      case 'Not Covered':
        return <XCircle size={20} color={Colors.error} />;
      case 'Conditional':
        return <AlertCircle size={20} color={Colors.warning} />;
      default:
        return null;
    }
  };
  
  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: `${code.type} Code: ${code.code}`,
          headerRight: () => (
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={handleCopyCode}
              >
                <Clipboard size={22} color={Colors.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={handleShare}
              >
                <Share2 size={22} color={Colors.primary} />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.headerButton}
                onPress={handleToggleFavorite}
              >
                <Heart 
                  size={22} 
                  color={favorite ? Colors.error : Colors.primary} 
                  fill={favorite ? Colors.error : 'transparent'}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.codeHeader}>
          <View style={styles.codeTypeContainer}>
            <Text style={[
              styles.codeType, 
              code.type === 'CPT' ? styles.cptType : styles.icdType
            ]}>
              {code.type}
            </Text>
          </View>
          
          <Text style={styles.codeText}>{code.code}</Text>
        </View>
        
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{code.description}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('coverage')}
        >
          <Text style={styles.sectionTitle}>Coverage Information</Text>
          {expandedSections.coverage ? (
            <ChevronUp size={20} color={Colors.textLight} />
          ) : (
            <ChevronDown size={20} color={Colors.textLight} />
          )}
        </TouchableOpacity>
        
        {expandedSections.coverage && (
          <View style={styles.sectionContent}>
            <View style={styles.coverageRow}>
              <Text style={styles.coverageLabel}>Status:</Text>
              <View style={styles.coverageValueContainer}>
                {getCoverageIcon()}
                <Text style={[
                  styles.coverageValue,
                  code.coverage.status === 'Covered' && styles.coveredText,
                  code.coverage.status === 'Not Covered' && styles.notCoveredText,
                  code.coverage.status === 'Conditional' && styles.conditionalText,
                ]}>
                  {code.coverage.status}
                </Text>
              </View>
            </View>
            
            <View style={styles.coverageRow}>
              <Text style={styles.coverageLabel}>Insurance:</Text>
              <Text style={styles.coverageValue}>
                {code.coverage.insurance === 'Both' 
                  ? 'Medicare & Medicaid' 
                  : code.coverage.insurance}
              </Text>
            </View>
            
            {code.coverage.conditions && (
              <View style={styles.conditionsContainer}>
                <Text style={styles.conditionsLabel}>Conditions:</Text>
                <Text style={styles.conditionsText}>{code.coverage.conditions}</Text>
              </View>
            )}
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('documentation')}
        >
          <Text style={styles.sectionTitle}>Documentation Requirements</Text>
          {expandedSections.documentation ? (
            <ChevronUp size={20} color={Colors.textLight} />
          ) : (
            <ChevronDown size={20} color={Colors.textLight} />
          )}
        </TouchableOpacity>
        
        {expandedSections.documentation && (
          <View style={styles.sectionContent}>
            {code.documentation.map((doc, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.listItemText}>{doc}</Text>
              </View>
            ))}
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('billing')}
        >
          <Text style={styles.sectionTitle}>Billing Requirements</Text>
          {expandedSections.billing ? (
            <ChevronUp size={20} color={Colors.textLight} />
          ) : (
            <ChevronDown size={20} color={Colors.textLight} />
          )}
        </TouchableOpacity>
        
        {expandedSections.billing && (
          <View style={styles.sectionContent}>
            {code.billing.map((bill, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bulletPoint} />
                <Text style={styles.listItemText}>{bill}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  scrollContent: {
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: Colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 4,
  },
  codeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  codeTypeContainer: {
    marginRight: 12,
  },
  codeType: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  cptType: {
    backgroundColor: Colors.primaryLight,
    color: Colors.primary,
  },
  icdType: {
    backgroundColor: Colors.secondaryLight,
    color: Colors.secondary,
  },
  codeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  descriptionContainer: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  descriptionText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  sectionContent: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  coverageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  coverageLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textLight,
  },
  coverageValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverageValue: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
  conditionsContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: Colors.warningLight,
    borderRadius: 8,
  },
  conditionsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.warning,
    marginBottom: 4,
  },
  conditionsText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginRight: 12,
  },
  listItemText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
});
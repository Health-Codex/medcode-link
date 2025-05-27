import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, CheckCircle, XCircle, AlertCircle } from 'lucide-react-native';
import { MedicalCode } from '@/types';
import { useFavoriteStore } from '@/store/favoriteStore';
import Colors from '@/constants/colors';
import * as Haptics from 'expo-haptics';

interface CodeItemProps {
  code: MedicalCode;
  showFavorite?: boolean;
}

export default function CodeItem({ code, showFavorite = true }: CodeItemProps) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const favorite = isFavorite(code.id);
  
  // Animation value for press feedback
  const animatedScale = new Animated.Value(1);

  const handlePress = () => {
    // Animate press
    Animated.sequence([
      Animated.timing(animatedScale, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    router.push(`/code/${code.id}`);
  };

  const handleToggleFavorite = (e: any) => {
    e.stopPropagation();
    
    // Provide haptic feedback on iOS/Android
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    toggleFavorite(code.id);
  };

  const getCoverageColor = () => {
    switch (code.coverage.status) {
      case 'Covered':
        return Colors.success;
      case 'Not Covered':
        return Colors.error;
      case 'Conditional':
        return Colors.warning;
      default:
        return Colors.textLight;
    }
  };

  const getCoverageIcon = () => {
    switch (code.coverage.status) {
      case 'Covered':
        return <CheckCircle size={16} color={Colors.success} />;
      case 'Not Covered':
        return <XCircle size={16} color={Colors.error} />;
      case 'Conditional':
        return <AlertCircle size={16} color={Colors.warning} />;
      default:
        return null;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: animatedScale }] }}>
      <TouchableOpacity 
        style={styles.container} 
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.codeTypeContainer}>
          <Text style={[
            styles.codeType, 
            code.type === 'CPT' ? styles.cptType : styles.icdType
          ]}>
            {code.type}
          </Text>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.codeText}>{code.code}</Text>
            <View style={styles.coverageContainer}>
              {getCoverageIcon()}
              <Text style={[styles.coverageStatus, { color: getCoverageColor() }]}>
                {code.coverage.status}
              </Text>
            </View>
          </View>
          
          <Text style={styles.description} numberOfLines={2}>
            {code.description}
          </Text>
          
          <View style={styles.footerRow}>
            <View style={styles.insuranceContainer}>
              <Text style={styles.insuranceText}>
                {code.coverage.insurance === 'Both' 
                  ? 'Medicare & Medicaid' 
                  : code.coverage.insurance}
              </Text>
            </View>
            
            {code.coverage.conditions && (
              <Text style={styles.conditionsText} numberOfLines={1}>
                {code.coverage.conditions}
              </Text>
            )}
          </View>
        </View>
        
        {showFavorite && (
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={handleToggleFavorite}
          >
            <Heart 
              size={22} 
              color={favorite ? Colors.error : Colors.textMuted} 
              fill={favorite ? Colors.error : 'transparent'}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  codeTypeContainer: {
    marginRight: 12,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  codeType: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
    textAlign: 'center',
    minWidth: 50,
  },
  cptType: {
    backgroundColor: Colors.primaryLight,
    color: Colors.primary,
  },
  icdType: {
    backgroundColor: Colors.secondaryLight,
    color: Colors.secondary,
  },
  contentContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  coverageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  coverageStatus: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
    lineHeight: 20,
  },
  footerRow: {
    flexDirection: 'column',
    gap: 4,
  },
  insuranceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insuranceText: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  conditionsText: {
    fontSize: 11,
    color: Colors.warning,
    fontStyle: 'italic',
    flex: 1,
  },
  favoriteButton: {
    justifyContent: 'flex-start',
    paddingLeft: 12,
    paddingTop: 2,
  },
});
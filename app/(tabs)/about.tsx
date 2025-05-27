import React from 'react';
import { StyleSheet, Text, View, ScrollView, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FileText, Stethoscope, DollarSign, ClipboardList, BookOpen, ExternalLink } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Stethoscope size={48} color={Colors.primary} />
          <Text style={styles.title}>Medical Coding Reference</Text>
          <Text style={styles.version}>Version 1.1.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About This App</Text>
          <Text style={styles.sectionText}>
            This application helps healthcare professionals quickly reference CPT and ICD-10 codes, 
            check their coverage status under Medicare and Medicaid, and understand documentation 
            and billing requirements.
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <FileText size={24} color={Colors.primary} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Comprehensive Code Database</Text>
              <Text style={styles.featureText}>
                Access a large collection of CPT and ICD-10 codes with detailed information
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <BookOpen size={24} color={Colors.primary} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Browse by Category</Text>
              <Text style={styles.featureText}>
                Find codes organized by medical specialty and category
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <DollarSign size={24} color={Colors.primary} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Coverage Information</Text>
              <Text style={styles.featureText}>
                Check Medicare and Medicaid coverage status for each code
              </Text>
            </View>
          </View>

          <View style={styles.featureItem}>
            <ClipboardList size={24} color={Colors.primary} style={styles.featureIcon} />
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Documentation Guide</Text>
              <Text style={styles.featureText}>
                View required documentation and billing requirements for proper reimbursement
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <View style={styles.resourceItem}>
            <ExternalLink size={18} color={Colors.primary} style={styles.resourceIcon} />
            <Text 
              style={styles.resourceLink}
              onPress={() => Linking.openURL('https://www.cms.gov/Medicare/Coding/ICD10')}
            >
              CMS ICD-10 Resources
            </Text>
          </View>
          <View style={styles.resourceItem}>
            <ExternalLink size={18} color={Colors.primary} style={styles.resourceIcon} />
            <Text 
              style={styles.resourceLink}
              onPress={() => Linking.openURL('https://www.cms.gov/Medicare/Coding/HCPCSReleaseCodeSets')}
            >
              CMS HCPCS/CPT Resources
            </Text>
          </View>
          <View style={styles.resourceItem}>
            <ExternalLink size={18} color={Colors.primary} style={styles.resourceIcon} />
            <Text 
              style={styles.resourceLink}
              onPress={() => Linking.openURL('https://www.medicaid.gov/medicaid/program-information/medicaid-and-chip-enrollment-data/index.html')}
            >
              Medicaid Coverage Information
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disclaimer</Text>
          <Text style={styles.sectionText}>
            This application is intended as a reference tool only. Always verify coding information 
            with official sources and payer policies. Coverage status and requirements may change 
            over time. Consult with coding specialists for specific billing questions.
          </Text>
          <Text style={styles.sectionText}>
            The information provided in this app is current as of 2025 but may be subject to change 
            as coding guidelines and coverage policies are updated.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2025 Medical Coding Reference
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 12,
  },
  version: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textLight,
    marginBottom: 8,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: Colors.surface,
    padding: 16,
    borderRadius: 8,
  },
  featureIcon: {
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  resourceIcon: {
    marginRight: 8,
  },
  resourceLink: {
    fontSize: 16,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.textLight,
  },
});
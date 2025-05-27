import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  Switch,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  Users, 
  FileText, 
  Settings, 
  Database, 
  RefreshCw, 
  Search,
  Plus,
  Trash,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Bell
} from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';
import { mockCodes } from '@/mocks/codes';
import { MedicalCode, CodeType, CoverageStatus, InsuranceType } from '@/types';
import Colors from '@/constants/colors';

// Mock users for admin panel
const mockUsersList = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@medcodes.com',
    role: 'admin',
    lastActive: '2025-05-27',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    role: 'user',
    lastActive: '2025-05-26',
    status: 'Active'
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john@hospital.org',
    role: 'user',
    lastActive: '2025-05-25',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@clinic.com',
    role: 'user',
    lastActive: '2025-05-24',
    status: 'Inactive'
  }
];

type AdminTab = 'users' | 'codes' | 'settings';

export default function AdminScreen() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<AdminTab>('codes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingCode, setIsAddingCode] = useState(false);
  
  // New code form state
  const [newCode, setNewCode] = useState<Partial<MedicalCode>>({
    code: '',
    description: '',
    type: 'CPT',
    coverage: {
      status: 'Covered',
      insurance: 'Both',
    },
    documentation: [''],
    billing: ['']
  });
  
  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            You do not have permission to access this page
          </Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const handleRefreshData = () => {
    setIsLoading(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Data refreshed successfully');
    }, 1500);
  };
  
  const handleAddCode = () => {
    // Validate form
    if (!newCode.code || !newCode.description) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }
    
    // In a real app, this would add to the database
    Alert.alert('Success', 'Code added successfully');
    setIsAddingCode(false);
    
    // Reset form
    setNewCode({
      code: '',
      description: '',
      type: 'CPT',
      coverage: {
        status: 'Covered',
        insurance: 'Both',
      },
      documentation: [''],
      billing: ['']
    });
  };
  
  const handleAddDocumentationField = () => {
    setNewCode(prev => ({
      ...prev,
      documentation: [...(prev.documentation || []), '']
    }));
  };
  
  const handleAddBillingField = () => {
    setNewCode(prev => ({
      ...prev,
      billing: [...(prev.billing || []), '']
    }));
  };
  
  const handleUpdateDocumentation = (text: string, index: number) => {
    setNewCode(prev => {
      const updatedDocs = [...(prev.documentation || [])];
      updatedDocs[index] = text;
      return {
        ...prev,
        documentation: updatedDocs
      };
    });
  };
  
  const handleUpdateBilling = (text: string, index: number) => {
    setNewCode(prev => {
      const updatedBilling = [...(prev.billing || [])];
      updatedBilling[index] = text;
      return {
        ...prev,
        billing: updatedBilling
      };
    });
  };
  
  const handleRemoveDocumentation = (index: number) => {
    setNewCode(prev => {
      const updatedDocs = [...(prev.documentation || [])];
      updatedDocs.splice(index, 1);
      return {
        ...prev,
        documentation: updatedDocs
      };
    });
  };
  
  const handleRemoveBilling = (index: number) => {
    setNewCode(prev => {
      const updatedBilling = [...(prev.billing || [])];
      updatedBilling.splice(index, 1);
      return {
        ...prev,
        billing: updatedBilling
      };
    });
  };
  
  const renderUsersTab = () => {
    const filteredUsers = mockUsersList.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
      <View style={styles.tabContent}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search users..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textMuted}
          />
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{mockUsersList.length}</Text>
            <Text style={styles.statLabel}>Total Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {mockUsersList.filter(u => u.status === 'Active').length}
            </Text>
            <Text style={styles.statLabel}>Active Users</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {mockUsersList.filter(u => u.role === 'admin').length}
            </Text>
            <Text style={styles.statLabel}>Admins</Text>
          </View>
        </View>
        
        <View style={styles.listHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>
          <Text style={[styles.headerCell, { flex: 2 }]}>Email</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Role</Text>
          <Text style={[styles.headerCell, { flex: 1 }]}>Status</Text>
        </View>
        
        <ScrollView>
          {filteredUsers.map(user => (
            <View key={user.id} style={styles.userRow}>
              <Text style={[styles.userCell, { flex: 2 }]}>{user.name}</Text>
              <Text style={[styles.userCell, { flex: 2 }]}>{user.email}</Text>
              <View style={[styles.userCell, { flex: 1 }]}>
                <Text style={[
                  styles.roleTag,
                  user.role === 'admin' ? styles.adminTag : styles.userTag
                ]}>
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </Text>
              </View>
              <View style={[styles.userCell, { flex: 1 }]}>
                <Text style={[
                  styles.statusTag,
                  user.status === 'Active' ? styles.activeTag : styles.inactiveTag
                ]}>
                  {user.status}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  const renderCodesTab = () => {
    const filteredCodes = mockCodes.filter(code => 
      code.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      code.description.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 20); // Limit to 20 for performance
    
    return (
      <View style={styles.tabContent}>
        <View style={styles.searchContainer}>
          <Search size={20} color={Colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search codes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={Colors.textMuted}
          />
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{mockCodes.length}</Text>
            <Text style={styles.statLabel}>Total Codes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {mockCodes.filter(c => c.type === 'CPT').length}
            </Text>
            <Text style={styles.statLabel}>CPT Codes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {mockCodes.filter(c => c.type === 'ICD-10').length}
            </Text>
            <Text style={styles.statLabel}>ICD-10 Codes</Text>
          </View>
        </View>
        
        <View style={styles.actionBar}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleRefreshData}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <>
                <RefreshCw size={16} color={Colors.primary} />
                <Text style={styles.actionButtonText}>Refresh</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.addButton]}
            onPress={() => setIsAddingCode(true)}
          >
            <Plus size={16} color={Colors.background} />
            <Text style={styles.addButtonText}>Add Code</Text>
          </TouchableOpacity>
        </View>
        
        {isAddingCode ? (
          <View style={styles.addCodeForm}>
            <Text style={styles.formTitle}>Add New Code</Text>
            
            <View style={styles.formRow}>
              <View style={[styles.formField, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.fieldLabel}>Code *</Text>
                <TextInput
                  style={styles.textInput}
                  value={newCode.code}
                  onChangeText={(text) => setNewCode({...newCode, code: text})}
                  placeholder="e.g. 99213"
                />
              </View>
              
              <View style={[styles.formField, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.fieldLabel}>Type *</Text>
                <View style={styles.typeSelector}>
                  <TouchableOpacity
                    style={[
                      styles.typeOption,
                      newCode.type === 'CPT' && styles.selectedType
                    ]}
                    onPress={() => setNewCode({...newCode, type: 'CPT'})}
                  >
                    <Text style={[
                      styles.typeText,
                      newCode.type === 'CPT' && styles.selectedTypeText
                    ]}>CPT</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.typeOption,
                      newCode.type === 'ICD-10' && styles.selectedType
                    ]}
                    onPress={() => setNewCode({...newCode, type: 'ICD-10'})}
                  >
                    <Text style={[
                      styles.typeText,
                      newCode.type === 'ICD-10' && styles.selectedTypeText
                    ]}>ICD-10</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Description *</Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                value={newCode.description}
                onChangeText={(text) => setNewCode({...newCode, description: text})}
                placeholder="Enter code description"
                multiline
                numberOfLines={3}
              />
            </View>
            
            <View style={styles.formRow}>
              <View style={[styles.formField, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.fieldLabel}>Coverage Status *</Text>
                <View style={styles.coverageSelector}>
                  <TouchableOpacity
                    style={[
                      styles.coverageOption,
                      newCode.coverage?.status === 'Covered' && styles.coveredSelected
                    ]}
                    onPress={() => setNewCode({
                      ...newCode, 
                      coverage: {
                        status: 'Covered',
                        insurance: newCode.coverage?.insurance || 'Both'
                      }
                    })}
                  >
                    <CheckCircle size={16} color={
                      newCode.coverage?.status === 'Covered' 
                        ? Colors.background 
                        : Colors.success
                    } />
                    <Text style={[
                      styles.coverageText,
                      newCode.coverage?.status === 'Covered' && styles.selectedCoverageText
                    ]}>Covered</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.coverageOption,
                      newCode.coverage?.status === 'Not Covered' && styles.notCoveredSelected
                    ]}
                    onPress={() => setNewCode({
                      ...newCode, 
                      coverage: {
                        status: 'Not Covered',
                        insurance: newCode.coverage?.insurance || 'Both'
                      }
                    })}
                  >
                    <XCircle size={16} color={
                      newCode.coverage?.status === 'Not Covered' 
                        ? Colors.background 
                        : Colors.error
                    } />
                    <Text style={[
                      styles.coverageText,
                      newCode.coverage?.status === 'Not Covered' && styles.selectedCoverageText
                    ]}>Not Covered</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.coverageOption,
                      newCode.coverage?.status === 'Conditional' && styles.conditionalSelected
                    ]}
                    onPress={() => setNewCode({
                      ...newCode, 
                      coverage: {
                        status: 'Conditional',
                        insurance: newCode.coverage?.insurance || 'Both'
                      }
                    })}
                  >
                    <AlertCircle size={16} color={
                      newCode.coverage?.status === 'Conditional' 
                        ? Colors.background 
                        : Colors.warning
                    } />
                    <Text style={[
                      styles.coverageText,
                      newCode.coverage?.status === 'Conditional' && styles.selectedCoverageText
                    ]}>Conditional</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={[styles.formField, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.fieldLabel}>Insurance *</Text>
                <View style={styles.insuranceSelector}>
                  <TouchableOpacity
                    style={[
                      styles.insuranceOption,
                      newCode.coverage?.insurance === 'Medicare' && styles.selectedInsurance
                    ]}
                    onPress={() => setNewCode({
                      ...newCode, 
                      coverage: {
                        status: newCode.coverage?.status || 'Covered',
                        insurance: 'Medicare'
                      }
                    })}
                  >
                    <Text style={[
                      styles.insuranceText,
                      newCode.coverage?.insurance === 'Medicare' && styles.selectedInsuranceText
                    ]}>Medicare</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.insuranceOption,
                      newCode.coverage?.insurance === 'Medicaid' && styles.selectedInsurance
                    ]}
                    onPress={() => setNewCode({
                      ...newCode, 
                      coverage: {
                        status: newCode.coverage?.status || 'Covered',
                        insurance: 'Medicaid'
                      }
                    })}
                  >
                    <Text style={[
                      styles.insuranceText,
                      newCode.coverage?.insurance === 'Medicaid' && styles.selectedInsuranceText
                    ]}>Medicaid</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.insuranceOption,
                      newCode.coverage?.insurance === 'Both' && styles.selectedInsurance
                    ]}
                    onPress={() => setNewCode({
                      ...newCode, 
                      coverage: {
                        status: newCode.coverage?.status || 'Covered',
                        insurance: 'Both'
                      }
                    })}
                  >
                    <Text style={[
                      styles.insuranceText,
                      newCode.coverage?.insurance === 'Both' && styles.selectedInsuranceText
                    ]}>Both</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.insuranceOption,
                      newCode.coverage?.insurance === 'Neither' && styles.selectedInsurance
                    ]}
                    onPress={() => setNewCode({
                      ...newCode, 
                      coverage: {
                        status: newCode.coverage?.status || 'Covered',
                        insurance: 'Neither'
                      }
                    })}
                  >
                    <Text style={[
                      styles.insuranceText,
                      newCode.coverage?.insurance === 'Neither' && styles.selectedInsuranceText
                    ]}>Neither</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            {newCode.coverage?.status === 'Conditional' && (
              <View style={styles.formField}>
                <Text style={styles.fieldLabel}>Coverage Conditions</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={newCode.coverage?.conditions}
                  onChangeText={(text) => setNewCode({
                    ...newCode, 
                    coverage: {
                      status: newCode.coverage?.status || 'Conditional',
                      insurance: newCode.coverage?.insurance || 'Both',
                      conditions: text
                    }
                  })}
                  placeholder="Enter coverage conditions"
                  multiline
                  numberOfLines={2}
                />
              </View>
            )}
            
            <View style={styles.formField}>
              <View style={styles.fieldHeader}>
                <Text style={styles.fieldLabel}>Documentation Requirements</Text>
                <TouchableOpacity 
                  style={styles.addFieldButton}
                  onPress={handleAddDocumentationField}
                >
                  <Plus size={16} color={Colors.primary} />
                  <Text style={styles.addFieldText}>Add</Text>
                </TouchableOpacity>
              </View>
              
              {newCode.documentation?.map((doc, index) => (
                <View key={index} style={styles.fieldRow}>
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    value={doc}
                    onChangeText={(text) => handleUpdateDocumentation(text, index)}
                    placeholder={`Documentation item ${index + 1}`}
                  />
                  {newCode.documentation && newCode.documentation.length > 1 && (
                    <TouchableOpacity 
                      style={styles.removeFieldButton}
                      onPress={() => handleRemoveDocumentation(index)}
                    >
                      <Trash size={16} color={Colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
            
            <View style={styles.formField}>
              <View style={styles.fieldHeader}>
                <Text style={styles.fieldLabel}>Billing Requirements</Text>
                <TouchableOpacity 
                  style={styles.addFieldButton}
                  onPress={handleAddBillingField}
                >
                  <Plus size={16} color={Colors.primary} />
                  <Text style={styles.addFieldText}>Add</Text>
                </TouchableOpacity>
              </View>
              
              {newCode.billing?.map((bill, index) => (
                <View key={index} style={styles.fieldRow}>
                  <TextInput
                    style={[styles.textInput, { flex: 1 }]}
                    value={bill}
                    onChangeText={(text) => handleUpdateBilling(text, index)}
                    placeholder={`Billing item ${index + 1}`}
                  />
                  {newCode.billing && newCode.billing.length > 1 && (
                    <TouchableOpacity 
                      style={styles.removeFieldButton}
                      onPress={() => handleRemoveBilling(index)}
                    >
                      <Trash size={16} color={Colors.error} />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </View>
            
            <View style={styles.formButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setIsAddingCode(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleAddCode}
              >
                <Text style={styles.saveButtonText}>Add Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.listHeader}>
              <Text style={[styles.headerCell, { flex: 1 }]}>Code</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Type</Text>
              <Text style={[styles.headerCell, { flex: 3 }]}>Description</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Coverage</Text>
            </View>
            
            <ScrollView>
              {filteredCodes.map(code => (
                <View key={code.id} style={styles.codeRow}>
                  <Text style={[styles.codeCell, { flex: 1 }]}>{code.code}</Text>
                  <View style={[styles.codeCell, { flex: 1 }]}>
                    <Text style={[
                      styles.typeTag,
                      code.type === 'CPT' ? styles.cptTag : styles.icdTag
                    ]}>
                      {code.type}
                    </Text>
                  </View>
                  <Text 
                    style={[styles.codeCell, { flex: 3 }]} 
                    numberOfLines={2}
                  >
                    {code.description}
                  </Text>
                  <View style={[styles.codeCell, { flex: 1 }]}>
                    <Text style={[
                      styles.coverageTag,
                      code.coverage.status === 'Covered' && styles.coveredTag,
                      code.coverage.status === 'Not Covered' && styles.notCoveredTag,
                      code.coverage.status === 'Conditional' && styles.conditionalTag,
                    ]}>
                      {code.coverage.status}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    );
  };
  
  const renderSettingsTab = () => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.settingsTitle}>System Settings</Text>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Database</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Database size={20} color={Colors.textLight} />
              <Text style={styles.settingText}>Auto-backup Database</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: Colors.border, true: Colors.primaryLight }}
              thumbColor={true ? Colors.primary : Colors.surface}
            />
          </View>
          
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionText}>Export Database</Text>
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionText}>Import Data</Text>
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionRow}
            onPress={handleRefreshData}
          >
            <Text style={styles.actionText}>Refresh Data Cache</Text>
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>System</Text>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={Colors.textLight} />
              <Text style={styles.settingText}>Enable Notifications</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: Colors.border, true: Colors.primaryLight }}
              thumbColor={true ? Colors.primary : Colors.surface}
            />
          </View>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <RefreshCw size={20} color={Colors.textLight} />
              <Text style={styles.settingText}>Auto-update Codes</Text>
            </View>
            <Switch
              value={true}
              trackColor={{ false: Colors.border, true: Colors.primaryLight }}
              thumbColor={true ? Colors.primary : Colors.surface}
            />
          </View>
          
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionText}>Manage API Keys</Text>
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionRow}>
            <Text style={styles.actionText}>System Logs</Text>
            <ChevronRight size={20} color={Colors.textLight} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.dangerSection}>
          <Text style={styles.dangerTitle}>Danger Zone</Text>
          
          <TouchableOpacity 
            style={styles.dangerButton}
            onPress={() => Alert.alert(
              'Confirm Reset',
              'Are you sure you want to reset all data? This action cannot be undone.',
              [
                { text: 'Cancel', style: 'cancel' },
                { 
                  text: 'Reset', 
                  style: 'destructive',
                  onPress: () => Alert.alert('Success', 'System has been reset')
                }
              ]
            )}
          >
            <Text style={styles.dangerButtonText}>Reset All Data</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'codes' && styles.activeTab]}
          onPress={() => setActiveTab('codes')}
        >
          <FileText size={20} color={activeTab === 'codes' ? Colors.primary : Colors.textLight} />
          <Text style={[styles.tabText, activeTab === 'codes' && styles.activeTabText]}>
            Codes
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}
        >
          <Users size={20} color={activeTab === 'users' ? Colors.primary : Colors.textLight} />
          <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>
            Users
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Settings size={20} color={activeTab === 'settings' ? Colors.primary : Colors.textLight} />
          <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'users' && renderUsersTab()}
      {activeTab === 'codes' && renderCodesTab()}
      {activeTab === 'settings' && renderSettingsTab()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  header: {
    backgroundColor: Colors.background,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
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
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textLight,
    marginLeft: 8,
  },
  activeTabText: {
    color: Colors.primary,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: Colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
  },
  actionBar: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  addButtonText: {
    color: Colors.background,
    marginLeft: 8,
  },
  listHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  userRow: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  userCell: {
    fontSize: 14,
    color: Colors.textLight,
    paddingRight: 8,
  },
  roleTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  adminTag: {
    backgroundColor: Colors.secondaryLight,
    color: Colors.secondary,
  },
  userTag: {
    backgroundColor: Colors.primaryLight,
    color: Colors.primary,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeTag: {
    backgroundColor: Colors.successLight,
    color: Colors.success,
  },
  inactiveTag: {
    backgroundColor: Colors.errorLight,
    color: Colors.error,
  },
  codeRow: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.border,
  },
  codeCell: {
    fontSize: 14,
    color: Colors.textLight,
    paddingRight: 8,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  cptTag: {
    backgroundColor: Colors.primaryLight,
    color: Colors.primary,
  },
  icdTag: {
    backgroundColor: Colors.secondaryLight,
    color: Colors.secondary,
  },
  coverageTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  coveredTag: {
    backgroundColor: Colors.successLight,
    color: Colors.success,
  },
  notCoveredTag: {
    backgroundColor: Colors.errorLight,
    color: Colors.error,
  },
  conditionalTag: {
    backgroundColor: Colors.warningLight,
    color: Colors.warning,
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  settingsSection: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  actionText: {
    fontSize: 16,
    color: Colors.text,
  },
  dangerSection: {
    backgroundColor: Colors.errorLight,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
    marginBottom: 12,
  },
  dangerButton: {
    backgroundColor: Colors.error,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
  },
  addCodeForm: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: Colors.text,
    backgroundColor: Colors.surface,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  typeSelector: {
    flexDirection: 'row',
  },
  typeOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  typeText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  selectedType: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  selectedTypeText: {
    color: Colors.background,
    fontWeight: '600',
  },
  coverageSelector: {
    flexDirection: 'row',
  },
  coverageOption: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 4,
  },
  coverageText: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 4,
  },
  selectedCoverageText: {
    color: Colors.background,
    fontWeight: '600',
  },
  coveredSelected: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  notCoveredSelected: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  conditionalSelected: {
    backgroundColor: Colors.warning,
    borderColor: Colors.warning,
  },
  insuranceSelector: {
    flexDirection: 'row',
  },
  insuranceOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 4,
  },
  insuranceText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  selectedInsurance: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  selectedInsuranceText: {
    color: Colors.background,
    fontWeight: '600',
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addFieldButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addFieldText: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: 4,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  removeFieldButton: {
    padding: 8,
    marginLeft: 8,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.background,
  },
});
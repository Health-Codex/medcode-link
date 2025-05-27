import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, 
  Mail, 
  Building, 
  Stethoscope, 
  LogOut, 
  Moon, 
  Bell, 
  Shield, 
  ChevronRight,
  Edit
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import Colors from '@/constants/colors';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, updateProfile } = useAuthStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [organization, setOrganization] = useState(user?.organization || '');
  const [specialty, setSpecialty] = useState(user?.specialty || '');
  
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            logout();
            router.replace('/(auth)/login');
          },
          style: 'destructive',
        },
      ]
    );
  };
  
  const handleSaveProfile = () => {
    if (user) {
      updateProfile({
        name,
        organization,
        specialty,
      });
      
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    }
  };
  
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Not logged in</Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.loginButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Text style={styles.profileInitials}>
                {user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
              </Text>
            </View>
            {!isEditing && (
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Edit size={16} color={Colors.background} />
              </TouchableOpacity>
            )}
          </View>
          
          <View style={styles.profileInfo}>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={name}
                onChangeText={setName}
                placeholder="Your Name"
              />
            ) : (
              <Text style={styles.userName}>{user.name}</Text>
            )}
            <View style={styles.roleContainer}>
              <Text style={styles.userRole}>
                {user.role === 'admin' ? 'Administrator' : 'Regular User'}
              </Text>
            </View>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>
        </View>
        
        {isEditing ? (
          <View style={styles.editForm}>
            <View style={styles.inputContainer}>
              <Building size={20} color={Colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={organization}
                onChangeText={setOrganization}
                placeholder="Organization"
                placeholderTextColor={Colors.textMuted}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Stethoscope size={20} color={Colors.textLight} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={specialty}
                onChangeText={setSpecialty}
                placeholder="Specialty"
                placeholderTextColor={Colors.textMuted}
              />
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => {
                  setIsEditing(false);
                  setName(user.name);
                  setOrganization(user.organization || '');
                  setSpecialty(user.specialty || '');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Information</Text>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Mail size={20} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{user.email}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Building size={20} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Organization</Text>
                  <Text style={styles.infoValue}>
                    {user.organization || 'Not specified'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Stethoscope size={20} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Specialty</Text>
                  <Text style={styles.infoValue}>
                    {user.specialty || 'Not specified'}
                  </Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIconContainer}>
                  <Shield size={20} color={Colors.primary} />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Account Type</Text>
                  <Text style={styles.infoValue}>
                    {user.role === 'admin' ? 'Administrator' : 'Regular User'}
                  </Text>
                </View>
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              
              <View style={styles.preferenceItem}>
                <View style={styles.preferenceInfo}>
                  <Moon size={20} color={Colors.textLight} />
                  <Text style={styles.preferenceText}>Dark Mode</Text>
                </View>
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                  thumbColor={darkMode ? Colors.primary : Colors.surface}
                />
              </View>
              
              <View style={styles.preferenceItem}>
                <View style={styles.preferenceInfo}>
                  <Bell size={20} color={Colors.textLight} />
                  <Text style={styles.preferenceText}>Notifications</Text>
                </View>
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: Colors.border, true: Colors.primaryLight }}
                  thumbColor={notifications ? Colors.primary : Colors.surface}
                />
              </View>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Help Center</Text>
                <ChevronRight size={20} color={Colors.textLight} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Privacy Policy</Text>
                <ChevronRight size={20} color={Colors.textLight} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuText}>Terms of Service</Text>
                <ChevronRight size={20} color={Colors.textLight} />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <LogOut size={20} color={Colors.error} style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
            
            <Text style={styles.versionText}>Version 1.2.0</Text>
          </>
        )}
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
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  loginButtonText: {
    color: Colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  nameInput: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    paddingBottom: 4,
    marginBottom: 4,
  },
  roleContainer: {
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  userRole: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.secondary,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textLight,
  },
  editForm: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 48,
    backgroundColor: Colors.surface,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textLight,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
  },
  section: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: Colors.text,
  },
  preferenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuText: {
    fontSize: 16,
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.errorLight,
    borderRadius: 8,
    paddingVertical: 16,
    marginBottom: 24,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error,
  },
  versionText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.textMuted,
    marginBottom: 16,
  },
});
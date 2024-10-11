import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router' // Use the router hook for navigation
import { Ionicons } from '@expo/vector-icons'

const Profile: React.FC = () => {
  const router = useRouter()

  // Function to handle sign out
  const handleSignOut = () => {
    // Navigate to the login screen after signing out
    router.replace('/login')
  }

  return (
    <View style={styles.container}>
      {/* Profile and Settings Options */}
      <View style={styles.optionRow}>
        <Ionicons name="person-outline" size={24} color="black" />
        <Text style={styles.optionText}>Profile</Text>
      </View>
      <View style={styles.optionRow}>
        <Ionicons name="settings-outline" size={24} color="black" />
        <Text style={styles.optionText}>Settings</Text>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={24} color="red" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8d7da',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  signOutText: {
    fontSize: 18,
    color: 'red',
    marginLeft: 10,
  },
})

export default Profile

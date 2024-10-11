import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Define the type for request items
interface Request {
  id: string
  name: string
  avatar: string
  message: string
}

// Define the array of requests with typed items
const requestsData: Request[] = [
  {
    id: '1',
    name: 'Ronaldo',
    avatar: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
    message: 'Ronaldo has requested to add you',
  },
  {
    id: '2',
    name: 'Son',
    avatar: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
    message: 'Requested a 2023 Summer album',
  },
  {
    id: '3',
    name: 'Leisha',
    avatar: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg',
    message: "You requested to share Leisha's content",
  },
]

export default function Notifications() {
  const [activeTab, setActiveTab] = useState<'requests' | 'notifications'>(
    'requests'
  ) // Manage active tab state

  // Render each request item in the list
  const renderRequestItem = ({ item }: { item: Request }) => (
    <View style={styles.requestItem}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContainer}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text>{item.message}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.acceptButton}>
          <Ionicons name="checkmark-circle-outline" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton}>
          <Ionicons name="close-circle-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>ACTIVITY</Text>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'requests' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('requests')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'requests' && styles.activeTabText,
            ]}
          >
            Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === 'notifications' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('notifications')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'notifications' && styles.activeTabText,
            ]}
          >
            Notification
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content based on active tab */}
      {activeTab === 'requests' && (
        <FlatList
          data={requestsData}
          renderItem={renderRequestItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      {activeTab === 'notifications' && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notifications available.</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: 'black',
  },
  tabText: {
    fontSize: 16,
    color: '#999',
  },
  activeTabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3, // For slight shadow effect
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  messageContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  acceptButton: {
    marginRight: 10,
  },
  declineButton: {},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
  },
})

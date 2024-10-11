import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import AntDesign from '@expo/vector-icons/AntDesign'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerTintColor: 'black', tabBarShowLabel: false }}>
      <Tabs.Screen
        name="albums/index"
        options={{
          headerTitle: 'Albums',
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="group/index"
        options={{
          headerTitle: 'Group',
          tabBarIcon: ({ color }) => (
            <AntDesign name="team" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add/index"
        options={{
          headerTitle: 'add',
          tabBarIcon: ({ color }) => (
            <AntDesign name="plus" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications/index"
        options={{
          headerTitle: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Entypo name="notification" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          headerTitle: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

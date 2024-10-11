import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import LoginScreen from '../screens/login/LoginScreen'
import { Stack } from 'expo-router'

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import LoginScreen from '../screens/login/LoginScreen'
import { Stack } from 'expo-router'

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="/(routes)/login" />
        <Stack.Screen name="/(routes)/signup" />
        <Stack.Screen name="/(routes)/verify-account" />
        <Stack.Screen name="/(routes)/album-detail/[albumId]" />
        <Stack.Screen name="/(routes)/add-album" />
        <Stack.Screen name="/(routes)/add-group" />
      </Stack>
    </>
  )
}
export default RootLayout

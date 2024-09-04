import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import LoginScreen from '../screens/login/LoginScreen'
import { Stack } from 'expo-router'

const RootLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <>
      {isLoggedIn ? (
        <View></View>
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="/(routes)/login" />
        </Stack>
      )}
    </>
  )
}

export default RootLayout

import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native'
import React, { useState } from 'react'
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'

export default function HomeScreen() {
  let [fontLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
  })
  if (!fontLoaded && !fontError) {
    return null
  }

  const handleLogin = () => {
    const [id, setId] = useState('')
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text
        style={{ fontFamily: 'Raleway_700Bold' }}
        className="font-medium text-3xl font-mono mb-4"
      >
        Memory Sharing
      </Text>
      <TextInput
        className=" bg-gray-100 p-4 mb-4 rounded w-60"
        placeholder="ID"
        placeholderTextColor="#6b7280"
      ></TextInput>
      <TextInput
        className=" bg-gray-100 p-4 mb-4 rounded w-60"
        placeholder="password"
        placeholderTextColor="#6b7280"
      ></TextInput>
      <TouchableOpacity>
        <Text className="ml-24 text-blue-500 mb-4">Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-blue-600 p-3 w-60 rounded-lg justify-center">
        <Text
          className="text-white text-lg self-center"
          style={{ fontFamily: 'Nunito_400Regular' }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  )
}

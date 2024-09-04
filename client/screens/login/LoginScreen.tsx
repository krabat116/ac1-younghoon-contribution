import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from 'react-native'
import { useState } from 'react'
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { router } from 'expo-router'

export default function LogIn() {
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  })
  const handleLogin = () => {
    console.log("You've tried to log in", userInfo.id, userInfo.password)
  }

  return (
    <ScrollView>
      <View className="flex-1 justify-center items-center pt-32">
        <Text
          style={{ fontFamily: 'Raleway_700Bold' }}
          className="font-medium text-3xl mb-4"
        >
          Memory Sharing
        </Text>
        <TextInput
          style={{ fontFamily: 'Nunito_400Regular' }}
          className="bg-gray-200 p-4 mb-4 rounded-lg w-60"
          placeholder="ID"
          placeholderTextColor="#6b7280"
          value={userInfo.id}
          onChangeText={(value) => setUserInfo({ ...userInfo, id: value })}
        ></TextInput>
        <TextInput
          style={{ fontFamily: 'Nunito_400Regular' }}
          className=" bg-gray-200 p-4 mb-4 rounded-lg w-60"
          placeholder="Password"
          placeholderTextColor="#6b7280"
          value={userInfo.password}
          secureTextEntry={true}
          onChangeText={(value) =>
            setUserInfo({ ...userInfo, password: value })
          }
        ></TextInput>
        <TouchableOpacity>
          <Text
            style={{ fontFamily: 'Nunito_400Regular' }}
            className="ml-24 text-blue-500 mb-4"
          >
            Forgot password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-600 p-3 w-60 mb-3 rounded-lg justify-center"
          onPress={handleLogin}
        >
          <Text
            className="text-white text-lg self-center"
            style={{ fontFamily: 'Nunito_700Bold' }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-300 p-3 w-60 rounded-3xl justify-center"
          onPress={() => router.push('/(routes)/singup')}
        >
          <Text
            className="text-white text-lg self-center"
            style={{ fontFamily: 'Nunito_700Bold' }}
          >
            create new account
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

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
      fullname: '',
      username: '',
      password: '',
    })
    const handleSignup = () => {
      console.log("You've tried to sign up", userInfo.id, userInfo.password)
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
            className="bg-gray-200 p-4 mb-4 rounded-lg w-64"
            placeholder="ID"
            placeholderTextColor="#6b7280"
            value={userInfo.id}
            onChangeText={(value) => setUserInfo({ ...userInfo, id: value })}
          ></TextInput>
          <TextInput
            style={{ fontFamily: 'Nunito_400Regular' }}
            className="bg-gray-200 p-4 mb-4 rounded-lg w-64"
            placeholder="Full Name"
            placeholderTextColor="#6b7280"
            value={userInfo.fullname}
            onChangeText={(value) => setUserInfo({ ...userInfo, fullname: value })}
          ></TextInput>
          <TextInput
            style={{ fontFamily: 'Nunito_400Regular' }}
            className="bg-gray-200 p-4 mb-4 rounded-lg w-64"
            placeholder="User Name"
            placeholderTextColor="#6b7280"
            value={userInfo.username}
            onChangeText={(value) => setUserInfo({ ...userInfo, username: value })}
          ></TextInput>
          <TextInput
            style={{ fontFamily: 'Nunito_400Regular' }}
            className=" bg-gray-200 p-4 mb-4 rounded-lg w-64"
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
            className="bg-blue-600 p-3 w-64 mb-3 rounded-lg justify-center"
            onPress={handleSignup}
          >
            <Text
              className="text-white text-lg self-center"
              style={{ fontFamily: 'Nunito_700Bold' }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        <Text style={{ fontFamily: 'Nunito_700Bold' }}>
            You already have an account?{'  '}
            <TouchableOpacity>
            <Text
              className="text-blue-500 text-md"
              style={{ fontFamily: 'Nunito_700Bold' }}
              onPress={() => router.push('/(routes)/login')}
            >
              sign in
            </Text>
            </TouchableOpacity>
        </Text>
        </View>
      </ScrollView>
    )
  }
  
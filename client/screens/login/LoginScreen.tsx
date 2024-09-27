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
import Constants from 'expo-constants';
import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';
import * as SecureStore from 'expo-secure-store';






// Access environment variables with optional chaining and default values
const KINDE_ISSUER_URL = Constants.expoConfig?.extra?.KINDE_ISSUER_URL ?? '';
const KINDE_POST_CALLBACK_URL = Constants.expoConfig?.extra?.KINDE_POST_CALLBACK_URL ?? '';
const KINDE_CLIENT_ID = Constants.expoConfig?.extra?.KINDE_CLIENT_ID ?? '';
const KINDE_POST_LOGOUT_REDIRECT_URL = Constants.expoConfig?.extra?.KINDE_POST_LOGOUT_REDIRECT_URL ?? '';

// Initialize KindeSDK
const client = new KindeSDK(
  KINDE_ISSUER_URL,
  KINDE_POST_CALLBACK_URL,
  KINDE_CLIENT_ID,
  KINDE_POST_LOGOUT_REDIRECT_URL
);


export default function LogIn() {
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  })

  async function saveToken(token: string) {
    await SecureStore.setItemAsync('accessToken', token);
  }  
  
  async function getToken() {
    return await SecureStore.getItemAsync('accessToken');
  }
  
  async function displayToken() {
    const token = await getToken(); // Wait for the promise to resolve
    console.log("Token After saving: ", token);
  }
  
  const handleLogin = async () => {
    console.log("You've tried to log in", userInfo.id, userInfo.password)

    const token = await client.login();
    if (token) {
      // User was authenticated
      console.log("Authentication Successful")
      console.log("Token Before saving: ", token.access_token)
      saveToken(token.access_token)
      displayToken()
      router.push('/(tabs)/home')
      //add redirection here once homepage is setup
    }
    else{
      router.push('/(routes)/login')
    }  
  };
  
  
  
  

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

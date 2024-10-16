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
import { useEffect, useState } from 'react'
import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway'
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'
import { router } from 'expo-router'
import Constants from 'expo-constants';
import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';
import * as SecureStore from 'expo-secure-store';
import { api } from '@/external/fetch';
import { Alert } from 'react-native';
import { LogBox } from 'react-native';



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
  if (__DEV__) {
    const originalWarn = console.warn;
    console.warn = (message, ...args) => {
      if (message && message.includes('fontFamily') && message.includes('has not been loaded')) {
        return; // Don't show font warnings
      }
      originalWarn(message, ...args); // Otherwise, show the warning
    };
  LogBox.ignoreLogs([
    'fontFamily'  // This will ignore all warnings related to missing fonts
  ]);
}
  const[test, setTest] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  })

  const validateEmail = (value: string) => {
    // Regex for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (value: string) => {
    setUserInfo({ ...userInfo, id: value });

    // Check if the email is valid
    if (validateEmail(value)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

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
        <TouchableOpacity>
       
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
          onPress={() => router.push('/(routes)/signup')}
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

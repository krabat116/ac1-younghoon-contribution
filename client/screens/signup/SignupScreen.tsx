import {
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    View,
    Text,
    TextInput,
    ScrollView,
    Alert,
  } from 'react-native'
  import { useEffect, useState } from 'react'
  import { useFonts, Raleway_700Bold } from '@expo-google-fonts/raleway'
  import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito'
  import { router } from 'expo-router'
  import Constants from 'expo-constants';
  import { KindeSDK } from '@kinde-oss/react-native-sdk-0-7x';
  import * as SecureStore from 'expo-secure-store';
  import { api } from '@/external/fetch'
  import { LogBox } from 'react-native';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import moment from 'moment';

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
      email: '',
      firstname: '',
      lastname: '',
      DOB: '',
      phone: '',
      country: '',
      state: '',
    })
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
  
    // Format the selected date as YYYY-MM-DD
    const formattedDateOfBirth = moment(dateOfBirth).format('YYYY-MM-DD');
    const validateEmail = (value: string) => {
      // Regex for validating email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    };
    const handleEmailChange = (value: string) => {
      setUserInfo({ ...userInfo, email: value });
      // Check if the email is valid
      if (validateEmail(value)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    };

    useEffect(()=>{
      const fetchUser = async () =>{
        const {data,error} = await api.GET('/user/{userId}',{
          params:{
            path:{
              userId:'user1'
            }
          }
        })
        setTest(data?.user.firstName || 'no data')
      }
      fetchUser()
    },[]);
    
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

    const handleSignup = async () => {
      //console.log("You've tried to sign up", userInfo.id, userInfo.password)  
      console.log("User signed in with---")
      console.log("Name: ", userInfo.firstname + " " + userInfo.lastname)
      console.log("Email: ", userInfo.email)
      console.log("DOB: ", userInfo.DOB)
      console.log("Phone: ", userInfo.phone)
      
      if(userInfo.email.length<=1 && userInfo.firstname.length<=1 && userInfo.lastname.length<=1 && userInfo.DOB.length<=1 && userInfo.phone.length<=1 && userInfo.country.length<=1 && userInfo.state.length<=1){
          Alert.alert(
            "Sign-up Failed",                // Title of the alert
            "Please complete all fields!", // Message to display
            [{ text: "Retry" }]          // Single button with "OK"
          );
        
      }
      else{
        if(userInfo.phone.length<=9)
        {
          Alert.alert(
            "Sign-up Failed",                // Title of the alert
            "Please enter a valid Phone number!", // Message to display
            [{ text: "Retry" }]          
          );
        }
        else{
          const token = await client.register();
          if (token) {
            // User was authenticated
              console.log("Authentication Successful")
              console.log("Token Before saving: ", token)
              saveToken(token.access_token)
  
              const kindeID = await client.getClaim("sub")
              userInfo.id = String(kindeID.value)
              
  
              const newUser = {
                id: String(kindeID.value),
                firstName: userInfo.firstname,
                lastName: userInfo.lastname,
                dateOfBirth: userInfo.DOB,
                email: userInfo.email,
                phone: userInfo.phone,
                country: userInfo.country,
                state: userInfo.state,
              };
              console.log("Creating user with data: ", newUser)
  
              try {
                const response = await api.POST('/user', {
                  body: newUser,
                });
                
              
                if (response.data?.type == "SUCCESS") {
                  console.log(response.data.message);
                  console.log("User ID: ", response.data.userId);
                } else if (response.error) {
                  console.error('Failed to create user:', response.error.message);
                } else {
                  console.error('Unexpected error occurred.');
                }
              } catch (error) {
                console.error('Error creating user:', error);
              }
           router.push('/(tabs)/home')
          }
          else{
            router.push('/(routes)/singup')
          }  
        }
      }
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
            placeholder="Email"
            placeholderTextColor="#6b7280"
            value={userInfo.email}
            onChangeText={handleEmailChange}
          ></TextInput>
          {!isValidEmail && (
          <Text style={{ color: 'red', fontFamily: 'Nunito_400Regular' }}>
            Please enter a valid email address.
          </Text>
        )}
          <TextInput
            style={{ fontFamily: 'Nunito_400Regular' }}
            className="bg-gray-200 p-4 mb-4 rounded-lg w-64"
            placeholder="First Name"
            placeholderTextColor="#6b7280"
            value={userInfo.firstname}
            onChangeText={(value) => setUserInfo({ ...userInfo, firstname: value })}
          ></TextInput>
          <TextInput
            style={{ fontFamily: 'Nunito_400Regular' }}
            className="bg-gray-200 p-4 mb-4 rounded-lg w-64"
            placeholder="Last Name"
            placeholderTextColor="#6b7280"
            value={userInfo.lastname}
            onChangeText={(value) => setUserInfo({ ...userInfo, lastname: value })}
          ></TextInput>
          <TextInput
                  style={{
                    fontFamily: 'Nunito_400Regular',
                    backgroundColor: '#e5e7eb', // bg-gray-200
                    padding: 16,               // p-4
                    marginBottom: 16,           // mb-4
                    borderRadius: 10,           // rounded-lg
                    width: 256,                 // w-64
                    color: '#000000',           // Text color
                  }}
                  value={formattedDateOfBirth} // Display the formatted date
                  onFocus={() => setShowDatePicker(true)} // Show the date picker when the input is focused
                />

                {/* Show the DateTimePicker when showDatePicker is true */}
                {showDatePicker && (
                  <DateTimePicker
                    value={dateOfBirth}
                    mode="date"
                    display="spinner"
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false); // Hide the picker after selecting a date
                      if (selectedDate) {
                        setDateOfBirth(selectedDate); // Update the selected date
                        setUserInfo({ ...userInfo, DOB: String(moment(selectedDate).format('YYYY-MM-DD'))})
                      }
                    }}
                  />
                )}

          <TextInput
            style={{ fontFamily: 'Nunito_400Regular' }}
            className=" bg-gray-200 p-4 mb-4 rounded-lg w-64"
            placeholder="Phone"
            placeholderTextColor="#6b7280"
            value={userInfo.phone}
            onChangeText={(value) =>
              setUserInfo({ ...userInfo, phone: value })
            }
          ></TextInput>
          <TextInput
            style={{ fontFamily: 'Nunito_400Regular' }}
            className=" bg-gray-200 p-4 mb-4 rounded-lg w-64"
            placeholder="State"
            placeholderTextColor="#6b7280"
            value={userInfo.state}
            onChangeText={(value) =>
              setUserInfo({ ...userInfo, state: value })
            }
          ></TextInput>
          <TextInput
            style={{ fontFamily: 'Nunito_400Regular' }}
            className=" bg-gray-200 p-4 mb-4 rounded-lg w-64"
            placeholder="Country"
            placeholderTextColor="#6b7280"
            value={userInfo.country}
            onChangeText={(value) =>
              setUserInfo({ ...userInfo, country: value })
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

import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
  Button,
} from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import Entypo from 'react-native-vector-icons/Entypo'
import { api } from '../../external/fetch'

export default function LogIn() {
  const [testdata, setTestdata] = useState('')
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })
  const [isLoginEnabled, setIsLoginEnabled] = useState(false)

  useEffect(() => {
    setIsLoginEnabled(
      userInfo.email.trim() !== '' && userInfo.password.trim() !== ''
    )
  }, [userInfo])

  const [required, setRequired] = useState('')
  const handleLogin = async () => {
    // Perform Kinde Login here -
    //TODO:

    // Retrieve unique user id from kinde.
    //TODO:

    // use user id to lookup user details in database
    // const sampleUserId = 'user1'
    // const { data, error } = await api.GET('/user/{userId}', {
    //   params: {
    //     path: {
    //       userId: sampleUserId, //TODO: Change.
    //     },
    //   },
    // })

    // if (error) {
    //   console.log(error)
    // }
    // setTestdata(data?.message.toString() || '')

    router.push('/(tabs)/albums')
  }

  async function testFunc() {
    console.log('TESTING ----')
    const result = await api.POST('/user', {
      body: {
        id: 'user100',
        country: 'australia',
        state: 'vic',
        dateOfBirth: '2000-01-07',
        email: 'some@email.com',
        firstName: 'tyler',
        lastName: 'beaumont',
        phone: '0400593366',
      },
    })

    console.log('RESULT', result)
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

        {/* <Button title='TEST' onPress={testFunc}></Button> */}

        <Text>{testdata}</Text>
        <TextInput
          style={{ fontFamily: 'Nunito_400Regular' }}
          className="bg-gray-200 p-4 mb-4 rounded-lg w-60"
          placeholder="Email"
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
          value={userInfo.email}
          onChangeText={(value) => setUserInfo({ ...userInfo, email: value })}
        >
          {required && (
            <View className="flex-row items-center mx-4 top-11 absolute">
              <Entypo name="cross" size={18} color={'red'} />
            </View>
          )}
        </TextInput>
        <TextInput
          style={{ fontFamily: 'Nunito_400Regular' }}
          className=" bg-gray-200 p-4 mb-4 rounded-lg w-60"
          placeholder="Password"
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
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
            Forgot password
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

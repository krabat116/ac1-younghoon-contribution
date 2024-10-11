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
import Entypo from 'react-native-vector-icons/Entypo'
import { api } from '../../external/fetch'

export default function LogIn() {
  const [testdata, setTestdata] = useState('')
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({
    id: '',
    password: '',
  })
  const [isLoginEnabled, setIsLoginEnabled] = useState(false)
  const [fetchedUserId, setFetchedUserId] = useState('')

  useEffect(() => {
    setIsLoginEnabled(
      userInfo.id.trim() !== '' && userInfo.password.trim() !== ''
    )
  }, [userInfo])

  useEffect(() => {
    // userInfo.id 값이 변경될 때마다 fetchUser 함수 실행
    const fetchUser = async () => {
      if (userInfo.id.trim() === '') return // 빈 ID 값일 때는 API 호출하지 않음

      try {
        const { data, error } = await api.GET('/user/{userId}', {
          params: {
            path: {
              userId: userInfo.id, // userInfo.id 값으로 동적 할당
            },
          },
        })

        if (error) {
          console.error('Error fetching user:', error)
          setTestdata('no data')
          setFetchedUserId('')
          return
        }

        const fetchedId = data?.user?.id || 'no data'
        setTestdata(fetchedId) // API 응답에서 사용자 ID를 testdata로 설정
        setFetchedUserId(fetchedId) // fetchedUserId에 가져온 사용자 ID 저장
      } catch (err) {
        console.error('API call error:', err)
        setTestdata('no data')
        setFetchedUserId('') // API 호출 실패 시 fetchedUserId 초기화
      }
    }

    fetchUser()
  }, [userInfo.id]) // userInfo.id가 변경될 때마다 useEffect 실행
  const [required, setRequired] = useState('')
  const handleLogin = () => {
    // 입력된 password와 fetchedUserId 값이 일치할 때만 로그인 처리
    if (userInfo.password === fetchedUserId && userInfo.password != '') {
      console.log('Login successful')
      router.push({
        pathname: '/(tabs)/albums',
        params: { userId: fetchedUserId },
      })
    } else {
      setError('Password does not match the user ID.')
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
        <Text>{testdata}</Text>
        <TextInput
          style={{ fontFamily: 'Nunito_400Regular' }}
          className="bg-gray-200 p-4 mb-4 rounded-lg w-60"
          placeholder="ID"
          placeholderTextColor="#6b7280"
          autoCapitalize="none"
          value={userInfo.id}
          onChangeText={(value) => setUserInfo({ ...userInfo, id: value })}
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

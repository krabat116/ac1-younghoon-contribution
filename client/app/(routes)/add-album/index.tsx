import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'
import { useRouter } from 'expo-router'
import { api } from '@/external/fetch' // api 모듈 경로에 맞게 수정 필요

const AddAlbum = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const [albumName, setAlbumName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  // 앨범을 추가하는 함수
  const handleAddAlbum = async () => {
    if (!albumName || !description) {
      Alert.alert('Error', 'Album name and description are required.')
      return
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('ownerId', 'user1') // ownerId는 사용자의 ID로 변경
      formData.append('name', albumName)
      formData.append('description', description)

      // 서버로 POST 요청 보내기
      const response = await fetch('http://localhost:8787/album', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      const result = await response.json()
      console.log('Response Status:', response.status)
      console.log('Response Data:', result)
      if (response.status === 201 && result.type === 'SUCCESS') {
        Alert.alert('Success', result.message)
        // navigation.goBack() // 앨범 생성 후 이전 페이지로 이동
        const albumId = result.albumId // 생성된 앨범 ID 받아오기
        console.log('Album ID:', albumId)
        router.push(`/add-image/albumId=${albumId}` as any)
      } else {
        Alert.alert('Failed to add album', result.message)
      }
    } catch (error) {
      console.error('Failed to create new album:', error)
      Alert.alert(
        'Error',
        'Failed to create new album. Please try again later.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 w-full justify-center items-center">
      <Text className="text-2xl mb-4">Create a New Album</Text>
      <TextInput
        placeholder="Enter album name"
        value={albumName}
        onChangeText={setAlbumName}
        className="mb-4 border border-gray-300 w-56 h-12 p-4 rounded-tl-md"
      />
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        className="mb-4 border border-gray-300 w-56 h-12 p-4 rounded-tl-md"
      />
      <TouchableOpacity
        className="bg-blue-500 p-2 w-36 items-center rounded-md"
        onPress={handleAddAlbum}
      >
        <Text className="text-lg text-white">Add Album</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddAlbum

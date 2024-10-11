import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import albumData from '@/assets/data/AlbumData'
import Card from '../../../components/Card'
import { useFonts, Italiana_400Regular } from '@expo-google-fonts/italiana'
import { api } from '@/external/fetch'

const AlbumDetail = () => {
  const [fontsLoaded] = useFonts({
    Italiana_400Regular,
  })
  const items = [
    { id: 1, aspectratio: 150 / 200 },
    { id: 2, aspectratio: 1 },
    { id: 3, aspectratio: 120 / 100 },
    { id: 4, aspectratio: 200 / 150 },
    { id: 5, aspectratio: 375 / 400 },
    { id: 6, aspectratio: 500 / 400 },
    { id: 7, aspectratio: 1040 / 500 },
    { id: 8, aspectratio: 2 / 1 },
    { id: 9, aspectratio: 1 },
    { id: 10, aspectratio: 375 / 400 },
    { id: 11, aspectratio: 1 },
  ]

  const { albumId } = useLocalSearchParams()
  // const [albums, setAlbums] = useState(albumData)
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null)
  const [photos, setPhotos] = useState<any[]>([])

  const fetchAlbumDetails = async () => {
    try {
      // 앨범 정보를 가져오는 API 호출
      const { data, error } = await api.GET('/album/{albumId}', {
        params: {
          path: { albumId: albumId as string },
        },
      })
      if (error) {
        console.error('Failed to fetch album details:', error)
        return
      }

      setSelectedAlbum(data.album) // 앨범 데이터 설정
    } catch (err) {
      console.error('Failed to fetch album details:', err)
    }
  }

  const fetchAlbumPhotos = async () => {
    try {
      const { data, error } = await api.GET('/image/all/{albumId}', {
        params: {
          path: { albumId: albumId as string },
        },
      })

      if (error) {
        console.error('Failed to fetch album photos:', error)
        return
      }

      const formattedPhotos = data.map(async (photo) => {
        const imageUrl = await api.GET('/image/{id}', {
          params: {
            path: {
              id: photo.id,
            },
          },
        })

        return {
          source: imageUrl,
          id: photo.id,
          caption: photo.description || 'No Caption',
          aspectratio: 1,
        }
      })

      const imageData = await Promise.all(formattedPhotos)

      setPhotos(imageData) // 가져온 사진 데이터 설정
    } catch (err) {
      console.error('Failed to fetch album photos:', err)
    }
  }

  useEffect(() => {
    if (albumId) {
      fetchAlbumDetails()
      fetchAlbumPhotos()
    }
  }, [albumId])

  if (!selectedAlbum) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading album details...</Text>
      </View>
    )
  }

  if (!selectedAlbum) {
    return (
      <View>
        <Text>Album not found</Text>
      </View>
    )
  }

  // const takePhoto = async () => {
  //   const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
  //   if (!permissionResult.granted) {
  //     alert('Permission to access camera is required!')
  //     return
  //   }

  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     quality: 1,
  //   })

  //   if (!result.canceled && result.assets && result.assets[0]) {
  //     const newPhotoUri = result.assets[0].uri
  //     handleAddPhoto(newPhotoUri)
  //   }
  // }

  // const handleAddPhoto = (uri: string) => {
  //   const updatedAlbums = albums.map((album) => {
  //     if (album.id === albumId) {
  //       const updatedAlbum = {
  //         ...album,
  //         photos: [
  //           ...album.photos,
  //           {
  //             id: (album.photos.length + 1).toString(),
  //             photoName: `New Photo ${album.photos.length + 1}`,
  //             images: { uri },
  //           },
  //         ],
  //       }

  //       setSelectedAlbum(updatedAlbum)
  //       return updatedAlbum
  //     }
  //     return album
  //   })

  //   setAlbums(updatedAlbums)
  // }

  const photoData = photos.map((photo, index) => ({
    source: photo.source,
    id: photo.id,
    caption: photo.caption,
    aspectratio: items[index % items.length].aspectratio,
  }))

  console.log('Photo Data:', photoData)
  const width = Dimensions.get('window').width / 2

  return (
    <View className="flex-1 p-4 bg-#f5f5f5 ">
      <View className="px-4 mt-10 items-center justify-center">
        <Text
          className="mt-10 text-5xl text-center w-5/6"
          style={{ fontFamily: 'Italiana_400Regular' }}
        >
          {selectedAlbum.name}
        </Text>
        <Text className="mt-4 text-base text-center text-gray-600 mx-6 ">
          {selectedAlbum.description}
        </Text>
      </View>

      <TouchableOpacity className="w-full items-end">
        <Text className="text-md text-gray-400 m-3 flex items-end">
          +Add Photo
        </Text>
      </TouchableOpacity>

      <ScrollView className="flex-1">
        <View className="flex-row">
          <View className="mr-2 ">
            {photoData
              .filter((_, i) => i % 2 === 0)
              .map((item) => (
                <Card
                  source={item.source}
                  aspectratio={item.aspectratio}
                  width={width}
                  key={item.id}
                  caption={item.caption}
                />
              ))}
          </View>
          <View>
            {photoData
              .filter((_, i) => i % 2 !== 0)
              .map((item) => (
                <Card
                  source={item.source}
                  aspectratio={item.aspectratio}
                  width={width}
                  key={item.id}
                  caption={item.caption}
                />
              ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default AlbumDetail

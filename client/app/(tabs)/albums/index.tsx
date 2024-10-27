import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native'

import { Link, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useFonts, Italiana_400Regular } from '@expo-google-fonts/italiana'
import { useNavigation } from '@react-navigation/native'
import albumData from '@/assets/data/AlbumData'
import { Ionicons } from '@expo/vector-icons'
import { api } from '@/external/fetch'

export default function Albums() {
  type ImageData = {
    id: string
    url: string
  }
  type Album = {
    id: string
    name: string
    description?: string
    thumbnailUrl?: string
    images: { id: string; url: string }[]
    numImages?: number
  }

  const [fontsLoaded] = useFonts({
    Italiana_400Regular,
  })
  const navigation = useNavigation()
  const [fetchedUrl, setFetchedUrl] = useState('')
  const [albums, setAlbums] = useState<Album[]>([])
  const { userId } = useLocalSearchParams()
  const userIdString = 'user1' //Array.isArray(userId) ? userId[0] : userId

  const fetchImages = async (albumId: string) => {
    try {
      const { data, error } = await api.GET('/image/all/{albumId}', {
        params: { path: { albumId } },
      })
      console.log(`Fetched images for album ${albumId}:`, data)
      if (error) {
        console.error(`Failed to fetch images for album ${albumId}:`, error)
        return []
      }

      return (data || []).slice(0, 3).map((image: any) => ({
        id: image.id,
        url: image.thumbnailUrl,
      }))
    } catch (err) {
      console.error('API call error:', err)
      return []
    }
  }
  const fetchAlbumDetails = async (albumId: string) => {
    try {
      const { data, error } = await api.GET('/album/{albumId}', {
        params: {
          path: { albumId },
        },
      })

      if (error) {
        console.error(`Failed to fetch album details for ${albumId}:`, error)
        return null
      }

      return {
        id: data.album.id,
        name: data.album.name || 'Unnamed Album',
        description: data.album.description || '',
        thumbnailUrl: data.album.thumbnailUrl || '',
        numImages: data.album.numImages || 0,
      }
    } catch (err) {
      console.error('Failed to fetch album details:', err)
      return null
    }
  }

  useEffect(() => {
    console.log('Albums state:', albums)
    const fetchAlbums = async () => {
      try {
        console.log('Fetching albums for user:', userIdString)
        const { data, error } = await api.GET('/album/all/{userId}', {
          params: {
            path: {
              userId: userIdString,
            },
          },
        })
        console.log('API Response for albums:', data)
        if (error) {
          console.error('Failed to fetch albums:', error)
          return
        }

        const albumList = await Promise.all(
          data.albumIds.map(async (albumId: string) => {
            const albumDetails = await fetchAlbumDetails(albumId)
            if (!albumDetails) return null

            const images = await fetchImages(albumId)

            return {
              ...albumDetails,
              images,
            }
          })
        )
        console.log('Fetched Album List: ', albumList)
        setAlbums(albumList.filter((album) => album !== null) as Album[])
      } catch (err) {
        console.error('Failed to fetch albums:', err)
      }
    }

    if (userIdString) fetchAlbums()
  }, [userIdString])

  return (
    <View className="flex-1">
      <View className="flex-row w-full items-center justify-between px-4 mt-2">
        <Text
          className="text-4xl ml-4 mt-4"
          style={{ fontFamily: 'Italiana_400Regular' }}
        >
          Albums
        </Text>
        <Link href="/(routes)/add-album">
          <Text className="pr-2 mt-4 text-gray-400">+Add Album</Text>
        </Link>
      </View>
      <View className="w-full h-full m-5">
        <FlatList
          numColumns={2}
          data={albums}
          keyExtractor={(album) => album.id}
          renderItem={({ item: album }) => {
            console.log(
              `Rendering album: ${album.id} with images:`,
              album.images
            )
            return (
              <View className="h-60 w-36 ml-4 rounded-lg">
                <FlatList
                  data={album.images}
                  keyExtractor={(photo) => photo.id}
                  numColumns={2}
                  showsVerticalScrollIndicator={false}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  renderItem={({ item: photo, index }) => (
                    <Link href={`/(routes)/album-detail/${album.id}`} asChild>
                      <TouchableOpacity className="flex-1 justify-center items-center h-20 ">
                        <Image
                          source={{ uri: photo.url }}
                          className="flex-1 justify-center max-w-full h-auto rounded-lg"
                          style={{
                            width: '100%',
                            height: 100,
                            borderRadius: 10,
                          }}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </Link>
                  )}
                />

                <Text className="text-left text-xl flex-wrap font-thin ml-2 mt-1">
                  {album.name || 'Album Name'}
                </Text>
                <Text className="text-xs text-gray-400 ml-4">
                  {`${album.numImages || 0} photos`}
                </Text>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

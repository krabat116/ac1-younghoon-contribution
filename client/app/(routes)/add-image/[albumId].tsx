import React, { useState } from 'react'
import { View, Text, Button, Image, Alert } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'

const AddImage = () => {
  const { albumId } = useLocalSearchParams()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    })

    if (!result.canceled) {
      const imageUri = result.assets[0].uri
      console.log('Selected Image URI:', imageUri)
      setSelectedImage(imageUri)

      try {
        // Fetch the image and convert it to a File (Blob with a name)
        const response = await fetch(imageUri)
        const blob = await response.blob()

        const file = new File([blob], 'image.jpg', { type: blob.type })
        setImageFile(file)
      } catch (error) {
        console.error('Failed to fetch the image as Blob:', error)
        Alert.alert('Error', 'Failed to process image. Please try again.')
      }
    } else {
      Alert.alert('No image selected')
    }
  }

  const handleImageUpload = async () => {
    if (!imageFile) {
      Alert.alert('No image selected', 'Please select an image first.')
      return
    }

    const formData = new FormData()
    const albumIdString = Array.isArray(albumId) ? albumId[0] : albumId
    formData.append('ownerId', 'user1')
    formData.append('albumId', albumIdString)
    formData.append('description', 'A photo of a cow. Moo!')
    formData.append('order', '1')
    formData.append('widthPx', '1080')
    formData.append('heightPx', '1920')
    formData.append('image', imageFile, imageFile.name || 'image.jpg')
    console.log('FormData: ', formData)

    try {
      const response = await fetch('http://localhost:8787/image', {
        method: 'POST',
        body: formData,
      })

      console.log('server response status:', response.status)
      const result = await response.json()
      console.log('server response:', result)

      if (response.status === 201) {
        Alert.alert('Success', 'Image uploaded successfully')
      } else {
        Alert.alert('Error', result.message || 'Failed to upload image')
      }
    } catch (error) {
      console.error('Error while uploading:', error)
      Alert.alert('Error', 'Failed to upload image. Please try again.')
    }
  }

  return (
    <View className="flex-1 w-full justify-center items-center">
      <Text className="mb">Add Image to Album {albumId}</Text>
      <Button title="Pick an Image" onPress={handleImagePick} />
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200 }}
        />
      )}
      <Button title="Upload Image" onPress={handleImageUpload} />
    </View>
  )
}

export default AddImage

import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from 'expo-router'

const AddGroup = () => {
  const navigation = useNavigation()
  const [groupName, setGroupName] = useState('')
  const handleAddGroup = () => {
    navigation.goBack()
  }

  return (
    <View className="flex-1 w-full justify-center items-center">
      <Text className="text-2xl mb-4">Create a New Group</Text>
      <TextInput
        placeholder="Enter album name"
        value={groupName}
        onChangeText={setGroupName}
        className="mb-4 border border-gray-300 w-56 h-10 p-4 rounded-tl-md"
      ></TextInput>
      <TouchableOpacity
        className="bg-blue-500 p-2 w-36 items-center rounded-md"
        onPress={handleAddGroup}
      >
        <Text className="text-lg text-white">Add Group</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddGroup

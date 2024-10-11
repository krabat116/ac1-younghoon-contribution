import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import type { FC, ReactElement } from 'react'
import React from 'react'
import { useFonts, Italiana_400Regular } from '@expo-google-fonts/italiana'
import groupData from '@/assets/data/GroupData'
import { Link } from 'expo-router'

export default function Group() {
  const [fontsLoaded] = useFonts({
    Italiana_400Regular,
  })
  return (
    <View className="flex-1">
      <View className="flex-row w-full items-center justify-between px-4 mt-2">
        <Text
          className="text-4xl ml-4 mt-4"
          style={{ fontFamily: 'Italiana_400Regular' }}
        >
          Groups
        </Text>
        <Link href="/(routes)/add-group">
          <Text className="pr-2 mt-4 text-gray-400">+Add Group</Text>
        </Link>
      </View>
      <View className="w-full h-full m-5">
        <FlatList
          numColumns={2}
          data={groupData}
          keyExtractor={(group) => group.id}
          renderItem={({ item: group }) => {
            return (
              <>
                <View className="h-60 w-36 ml-4 rounded-lg">
                  <View className="h-40">
                    <FlatList
                      data={group.members}
                      keyExtractor={(member) => member.id}
                      numColumns={2}
                      showsVerticalScrollIndicator={false}
                      columnWrapperStyle={{ justifyContent: 'space-between' }}
                      renderItem={({ item: member, index }) => (
                        <TouchableOpacity className="flex-1 justify-center items-center h-20 ">
                          <Image
                            source={member.images}
                            className="flex-1 justify-center w-16 h-auto rounded-full m-1"
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                  <Text className="text-left text-xl flex-wrap font-thin ml-2 mt-1">
                    {group.groupName}
                  </Text>
                  <Text className="text-xs text-gray-400 ml-4 ">
                    {group.members.length} members
                  </Text>
                </View>
                <View></View>
              </>
            )
          }}
        />
      </View>
    </View>
  )
}

// const styles = StyleSheet.create({})

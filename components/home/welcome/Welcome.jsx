import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from 'react-native'
import { useRouter } from 'expo-router'

import { icons, SIZES } from '../../../constants'
import styles from './welcome.style'


const jobTypes = ['Full-time', "Part-time", "Contractor"]



const Welcome = ({ searchTerm, setSearchTerm, handleClick, userDetails }) => {

  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState('Full-time');


  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {
          userDetails?.name
        }</Text>

        <Text className='' style={styles.welcomeMessage} >
          Find your perfect job
        </Text>

      </View>

      <View style={styles.searchContainer}>

        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='What are you looking for?'
          >
          </TextInput>
        </View >

        <TouchableOpacity style={styles.searchBtn} onPressIn={handleClick}>
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>

      </View >

      <View styles={styles.tabsContainer}>

        <FlatList style={''} data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.tab(activeJobType, item)}
              onPress={() => {

                setActiveJobType(item);
                router.push(`/search/${item}`)

              }}

            >
              <Text>{item}</Text>
            </TouchableOpacity>

          )}
          keyExtractor={item => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />


      </View >




    </View>
  )
}

export default Welcome
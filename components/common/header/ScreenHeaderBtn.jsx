import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'


import styles from './screenheader.style'

const ScreenHeaderBtn = ({ iconUrl, deviceUri, dimension, handlePress, mstyle }) => {
  return (
    <TouchableOpacity style={mstyle ? styles.btnContainerGreen : styles.btnContainer} onPress={handlePress}>
      {
        deviceUri ? (
          <Image
            source={{ uri: `${deviceUri}` }}
            resizeMode='cover'
            style={styles.btnImg(dimension)}
          />
        ) : (
          <Image
            source={iconUrl}
            resizeMode='cover'
            style={styles.btnImg(dimension)}
          />
        )
      }

    </TouchableOpacity>
  )
}

export default ScreenHeaderBtn
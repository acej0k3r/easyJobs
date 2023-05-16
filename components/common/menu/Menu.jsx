import React from 'react'
import { View, Text, Modal, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router';

import { COLORS, icons, images, SIZES } from '../../../constants';
import styles from '../../../styles/home';




const Menu = ({ menuVisible, setMenuVisible, handleCloseMenu, handleLogout }) => {
   //standard
   const router = useRouter();
   //state

   //function


   return (
      <Modal visible={menuVisible} animationType="slide" >
         <View style={styles.modalContainer}>
            {/* Add your menu content here */}
            <TouchableOpacity style={styles.btnContainerModal} onPress={handleCloseMenu}>
               <Icon name="close" size={30} color={COLORS.primary} />
            </TouchableOpacity>

            <View style={styles.modalContentContainer}>
               <TouchableOpacity style={styles.buttonModal} onPress={() => {
                  setMenuVisible(false);
                  router.push('/profile')


               }}>
                  <Icon name="id-card" size={30} color={COLORS.primary} />
                  <Text>Profile</Text>
               </TouchableOpacity>


               <TouchableOpacity style={styles.buttonModal} onPress={() => {
                  setMenuVisible(false);
                  router.push('/liked')


               }} >
                  <Icon name="heart" size={30} color={COLORS.primary} />
                  <Text>Liked</Text>
               </TouchableOpacity>


               <TouchableOpacity style={styles.buttonModal} onPress={handleLogout}>
                  <Icon name="sign-out" size={30} color={COLORS.primary} />
                  <Text>Log Out</Text>
               </TouchableOpacity>


            </View>



         </View>
      </Modal>
   )
}


export default Menu;
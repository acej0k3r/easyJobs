import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Stack } from 'expo-router'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'expo-image-picker';


import { COLORS, SIZES } from '../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';


const index = () => {
   //standard

   //state
   const [userDetails, setuserDetails] = useState();
   const [reuplaod, setReuplaod] = useState(false);
   const [image, setImage] = useState(null);


   //function



   const pickImage = async () => {
      // No permissions request is necessary for launching the image library

      const options = {
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      }



      let result = await ImagePicker.launchImageLibraryAsync(options);


      if (!result.canceled) {
         console.log(result)
         setImage(result.assets[0].uri);
         updateImageInCache(result.assets[0].uri);

      } else {

         setImage(null);
      }
   };





   async function handleReupload() {

      pickImage();

   };



   async function updateImageInCache(imageUri) {
      const user = await AsyncStorage.getItem('userDetails-easyjobs-999');


      if (user) {
         try {
            const parsedData = JSON.parse(user);
            const uploadItem = { ...parsedData, uri: imageUri };
            console.log(image);
            await AsyncStorage.setItem('userDetails-easyjobs-999', JSON.stringify(uploadItem));

         } catch (error) {
            console.log(error)

         } finally {
            setReuplaod(!reuplaod);
         }

      }
   }




   async function fetchStoredDetails() {
      try {
         const user = await AsyncStorage.getItem('userDetails-easyjobs-999');

         if (user) {
            const parsedData = JSON.parse(user);
            console.log('working');
            setuserDetails(parsedData);
         }



      } catch (error) {
         console.log('profile/ Error at getUserDetails()/ Error: ')

      }

   }



   useEffect(() => {

      fetchStoredDetails();
      console.log('reupload');

   }, [reuplaod]);


   useEffect(() => {
      console.log('runnin');

      fetchStoredDetails();
   }, []);

   return (
      <SafeAreaView className={styles.container}>
         <Stack.Screen options={{
            headerStyle: { backgroundColor: COLORS.secondary },

            headerShadowVisible: false,

            headerTitle: 'Profile'

         }} />


         <View>
            {
               userDetails && (
                  <>

                     <View style={styles.imageBox}>
                        <Image
                           source={{ uri: `${userDetails.uri}` }}
                           resizeMode='cover'
                           style={styles.btnImg('100%')}
                        />

                        <TouchableOpacity
                           activeOpacity={0.9}
                           style={styles.uploadBtn}
                           onPress={() => {

                              handleReupload();

                           }}
                        >
                           <Icon name="camera" size={30} color={COLORS.primary} style={styles.uploadBtnImg} />
                        </TouchableOpacity>
                     </View>

                     <View style={styles.usertextBox}>
                        <Text style={styles.usertext}>User Details</Text>

                        <View style={styles.userInfoBox}>
                           <Text style={styles.userInfo}>{
                              userDetails.name
                           }</Text>

                           <Text>
                              {
                                 userDetails.gender
                              }
                           </Text>
                        </View>
                     </View>
                  </>
               )
            }

         </View>

      </SafeAreaView>
   )
}
const styles = StyleSheet.create({

   container: {

   },

   imageBox: {
      height: '66%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end'

   },

   usertext: {
      marginTop: '10%',
      marginBottom: '10%',
      fontSize: 21,
      paddingLeft: 10,
      color: COLORS.primary

   },
   userInfoBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingRight: 30
   },
   userInfo: {
      fontSize: 30,


   },
   btnImg: (dimension) => ({
      width: dimension,
      height: dimension,
   }),
   uploadBtn: {
      width: 48,
      height: 48,
      marginRight: 1,
      backgroundColor: COLORS.gray2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '6%',
      marginTop: '-6%',
      borderRadius: 5,
      shadowColor: '#000',
      shadowOpacity: 5,
      shadowRadius: 10

   },
   uploadBtnImg: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

   }

})

export default index;
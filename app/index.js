import { View, Text, ActivityIndicator, Image, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { Stack, useRouter, useFocusEffect } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'


import { COLORS, icons, images, SIZES } from '../constants';
import { Popularjobs, ScreenHeaderBtn, Welcome } from '../components';
import Nearbyjobs from '../components/home/nearby/Nearbyjobs';
import useFetch from '../hook/useFetch';
import styles from '../styles/home';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Menu from '../components/common/menu/Menu';

import "expo-router/entry";


const Home = () => {
   //standard
   const router = useRouter();

   //state
   const [initialLoad, setInitialLoad] = useState(true);
   const [searchTerm, setSearchTerm] = useState('');
   const [userDetail, setUserDetail] = useState({});
   const [userDetailTemp, setUserDetailTemp] = useState({});
   const [hasSubmit, setHasSubmit] = useState(false);
   const [isError, setIsError] = useState(false);
   const [image, setImage] = useState(null);
   const [loading, setLoading] = useState(false);
   const [gender, setGender] = useState('');
   const [name, setName] = useState('');
   const [menuVisible, setMenuVisible] = useState(false);






   //function
   const { data, isLoading, error } = useFetch('search', {
      query: 'React developer',
      num_pages: 1
   });





   const handleOpenMenu = () => {
      setMenuVisible(true);
   }

   const handleCloseMenu = () => {
      setMenuVisible(false);
   }




   const pickImage = async () => {
      // No permissions request is necessary for launching the image library

      const options = {
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      }


      setLoading(true);

      let result = await ImagePicker.launchImageLibraryAsync(options);


      if (!result.canceled) {

         setLoading(false);
         setImage(result.assets[0].uri);


      } else {

         setLoading(false);
         setImage(null);
      }
   };


   function handleSelect(itemValue) {

      setGender(itemValue);

   }



   function handleSubmitFirstData() {

      if (name.length == 0 || gender.length == 0) {
         setIsError(true);
         return;
      } else {

         setHasSubmit(true);
         setUserDetailTemp({ ...userDetailTemp, name: name, gender: gender, uri: image });
      }




   }



   //calls initially 
   // calls after handleFirstSubmitData
   useEffect(() => {


      AsyncStorage.getItem('userDetails-easyjobs-999')
         .then(data => {
            if (data !== null) {
               // Parse the data and set it to the state variable
               const parsedData = JSON.parse(data);
               console.log('has data: ', parsedData);


               //in case of data not clearing properly and this would mean the data is bad
               if (data.length == 2) {
                  AsyncStorage.clear();
                  if (hasSubmit) {
                     console.log('setting data');
                     AsyncStorage.setItem("userDetails-easyjobs-999", JSON.stringify(userDetailTemp));
                     fetchStoredDetail();
                  }
                  return;
               }
               setUserDetail(parsedData);
            } else {

               console.log('no data in storage');
               if (hasSubmit) {
                  console.log('setting data');
                  AsyncStorage.setItem("userDetails-easyjobs-999", JSON.stringify(userDetailTemp));
                  fetchStoredDetail();
               }
            }
         })
         .catch(error => console.log(error))
         .finally(() => {

            setInitialLoad(false);

         })



   }, [userDetailTemp]);




   useEffect(() => {
      fetchStoredDetail();
   }, []);






   async function fetchStoredDetail() {
      const data = await AsyncStorage.getItem("userDetails-easyjobs-999");
      const res = JSON.parse(data);
      if (res) {
         setUserDetail(res);
      }


   }


   async function fetchUpdatedDetailOnly() {


      const data = await AsyncStorage.getItem("userDetails-easyjobs-999");
      const res = JSON.parse(data);

      if (res) {



         if (res.uri !== userDetail.uri) {
            console.log('updating after check');
            setUserDetail(res);
         }
      }



   }



   //when ever this component is focused it runs one time with a delay so every single time user presses back button from another path we will redirect the suer to the home page.
   useFocusEffect(() => {
      setTimeout(async () => {
         fetchUpdatedDetailOnly();
      }, 100)


   });


   function resetAllState() {
      setMenuVisible(false);
      setInitialLoad(true);
      setUserDetailTemp({});
      setName('');
      setGender('');
      setImage(null);
      setHasSubmit(false);
      setUserDetail({});
   }


   async function clearStorage() {
      try {
         await AsyncStorage.clear();
         resetAllState();
         console.log('ASYNC STORAGE IS CLEARED and all states reset')

      } catch (error) {
         console.log(error);

      }

   }


   function handleLogOut() {

      clearStorage();

   }




   async function checkKeys() {
      try {
         const keys = await AsyncStorage.getAllKeys();
         console.log(keys);
      } catch (error) {
         console.log(error);
      }

   }





   return (

      <>
         {
            initialLoad ? (
               <SafeAreaView style={styles.initLoad}>
                  <ActivityIndicator style={{
                     marginTop: '50%'
                  }} color={COLORS.primary} size={48} />
               </SafeAreaView>
            ) : (
               Object.keys(userDetail).length !== 0 ? (

                  <SafeAreaView style={{
                     flex: 1, backgroundColor: COLORS.lightWhite
                  }}>
                     <Stack.Screen options={{
                        headerStyle: { backgroundColor: COLORS.lightWhite },

                        headerShadowVisible: false,
                        headerLeft: () => (

                           <View style={{
                              flex: 1, backgroundColor: COLORS.lightWhite,
                           }}>
                              {/* Add your header component here */}
                              <TouchableOpacity style={styles.btnContainer} onPress={handleOpenMenu}>
                                 <Icon name="navicon" size={30} color={COLORS.primary} />
                              </TouchableOpacity>
                              <Menu
                                 handleCloseMenu={handleCloseMenu} menuVisible={menuVisible}
                                 setMenuVisible={setMenuVisible}
                                 handleLogout={handleLogOut}
                              />

                           </View>

                        ),
                        headerRight: () => (
                           userDetail?.uri?.length > 0 ? (
                              <ScreenHeaderBtn deviceUri={userDetail?.uri} dimension="100%"
                                 handlePress={() => {

                                    router.push('/profile')

                                 }}
                              />
                           ) : (
                              userDetail.gender == "Male" ? (
                                 <ScreenHeaderBtn iconUrl={images.profileM} dimension="100%" handlePress={() => {

                                    router.push('/profile')

                                 }} />
                              ) : (
                                 <ScreenHeaderBtn iconUrl={images.profileF} dimension="100%" handlePress={() => {

                                    router.push('/profile')

                                 }} />
                              )
                           )
                        ),
                        headerTitle: ''

                     }} />

                     <ScrollView class='' showsVerticalScrollIndicator={false} >
                        <View class='' style={{ flex: 1, padding: SIZES.medium }} >

                           <Welcome
                              searchTerm={searchTerm}
                              setSearchTerm={setSearchTerm}
                              handleClick={() => {

                                 if (searchTerm) {
                                    router.push(`/search/${searchTerm}`)
                                 }

                              }}
                              userDetails={userDetail}

                           />
                           <Popularjobs data={data} isLoading={isLoading} error={error} />
                           <Nearbyjobs data={data} isLoading={isLoading} error={error} />

                        </View>

                     </ScrollView>

                  </SafeAreaView>
               ) : (
                  <SafeAreaView style={{
                     flex: 1, backgroundColor: COLORS.lightWhite
                  }}>
                     <Stack.Screen options={{
                        headerStyle: { backgroundColor: COLORS.lightWhite },

                        headerShadowVisible: false,

                        headerLeft: () => (

                           <></>
                        ),
                        headerRight: () => (
                           <></>
                        ),
                        headerTitle: () => (

                           <Text>
                              Welcome To Easy Jobs! Please Sign Up.
                           </Text>

                        )

                     }} />

                     {isError && Alert.alert(
                        'Form Not Filled',
                        'Please fill up the entire form',
                        [{ text: 'OK', onPress: () => setIsError(false) }]
                     )}


                     <View style={styles.container}>
                        <View style={styles.section}>
                           <Text style={styles.text}>Your Name</Text>
                           <TextInput style={styles.input}
                              placeholder='Full Name'
                              onChangeText={(text) => {

                                 setName(text)

                              }}
                              value={userDetailTemp.name}
                           />

                        </View>

                        <View style={styles.section}>

                           <SelectDropdown
                              data={["Male", "Female"]}
                              onSelect={(selectedItem) => {

                                 handleSelect(selectedItem);

                              }}

                              defaultButtonText={'Select Gender'}

                              buttonStyle={styles.dropdown1BtnStyle}
                              buttonTextStyle={styles.dropdown1BtnTxtStyle}

                              dropdownIconPosition={'right'}
                              dropdownStyle={styles.dropdown1DropdownStyle}
                              rowStyle={styles.dropdown1RowStyle}
                              rowTextStyle={styles.dropdown1RowTxtStyle}
                           />

                        </View>


                        <View style={styles.sectionCol}>

                           {
                              image ? (
                                 //dispaly if image has been uploaded
                                 <View style={styles.uploadButtonContainer}>
                                    <View style={styles.imgBox}>
                                       <Image source={{ uri: image }} style={styles.image} />
                                    </View>


                                    <TouchableOpacity
                                       style={styles.button}
                                       onPress={pickImage}>


                                       <Text style={styles.buttonText}>Reupload Profile Image</Text>
                                    </TouchableOpacity>
                                 </View>

                              ) : (
                                 <View style={styles.uploadButtonContainer}>

                                    <View style={styles.imgBox}>
                                       {
                                          loading && (
                                             <View>
                                                <ActivityIndicator animating color={'#ff00'} size={"large"} />
                                             </View>
                                          )
                                       }

                                    </View>

                                    <TouchableOpacity
                                       style={styles.button}
                                       onPress={pickImage}>
                                       {


                                          <Text style={styles.buttonText}>Upload Profile Image</Text>
                                       }
                                    </TouchableOpacity>
                                 </View>
                              )
                           }
                        </View>


                        <View style={styles.submitcontainer}>
                           <TouchableOpacity
                              style={styles.submit}
                              onPress={handleSubmitFirstData}>
                              <Text style={styles.submitText}>Submit</Text>
                           </TouchableOpacity>


                        </View>



                     </View>


                  </SafeAreaView>
               )
            )
         }

      </>

   )


}


export default Home;
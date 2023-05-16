import React, { useState, useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native'

import { COLORS, SIZES } from '../../constants'
import useFetch from './../../hook/useFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NearbyJobCard from './../../components/common/cards/nearby/NearbyJobCard';

const index = () => {
   //standard

   const router = useRouter();




   //state

   const [jobData, setjobData] = useState();
   const [selectedJob, setSelectedJob] = useState();

   //function
   const handleCardPress = (item) => {

      router.push(`/job-details/${item[0]}`)

   }


   async function clearStorage() {
      await AsyncStorage.removeItem('liked-ejs-999');
      console.log('cleared liked list');
   }


   useEffect(() => {
      async function getData() {
         try {
            const data = await AsyncStorage.getItem('liked-ejs-999');

            if (data) {

               const parsedData = JSON.parse(data).job_details;
               setjobData(parsedData);

            }


         } catch (error) {

            console.log('like page/ error at getData / error: ', error);
         }



      }

      getData();
      // clearStorage();

   }, []);





   /*   useEffect(() => {
        
     }, []); */

   return (
      <SafeAreaView className={styles.container}>
         <Stack.Screen options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },

            headerShadowVisible: false,

            headerTitle: 'Liked Posts'

         }} />

         <View>

            <View style={styles.textbox}>
               <Text style={styles.text}>Total Posts Liked </Text>
               <Text style={styles.number} >{
                  jobData && (
                     Object.keys(jobData).length || 0
                  )
               }</Text>


            </View>


            {
               jobData && (



                  <FlatList

                     //Object.entries(object) -:> makes it into an array [key, value] to access this we mapped it using flatlist renderItem and each item has those [key, value] where item[0] is the key and item[1] is the value
                     data={Object.entries(jobData)}
                     renderItem={({ item }) => (

                        <NearbyJobCard
                           job={item[1]}
                           selectedJob={selectedJob}
                           handleNavigate={() => {

                              handleCardPress(item)

                           }}

                        />


                     )}
                     keyExtractor={item => item[0]}
                     contentContainerStyle={{ columnGap: SIZES.medium }}
                     horizontal={false}


                  >


                  </FlatList>
               )
            }
         </View>

      </SafeAreaView>


   )
}
const styles = StyleSheet.create({

   container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '9'

   },

   textbox: {
      marginTop: '10%',
      marginBottom: '10%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
   },

   text: {
      fontSize: 18
   },

   number: {
      marginTop: '3%',
      fontSize: 18,
      color: COLORS.tertiary
   }

})

export default index;
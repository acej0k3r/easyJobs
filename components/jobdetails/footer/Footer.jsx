import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './footer.style'
import { icons, COLORS } from '../../../constants'
import AsyncStorage from '@react-native-async-storage/async-storage';




const Footer = ({ url, id, data }) => {

  const [postLiked, setPostLiked] = useState(false);
  const [likedNow, setLikedNow] = useState(false);
  const [savedData, setSavedData] = useState(null);

  useEffect(() => {

    async function wasPostLiked() {
      try {
        const data = await AsyncStorage.getItem('liked-ejs-999');
        setSavedData(JSON.parse(data));

        if (data) {
          const jobIds = JSON.parse(data).job_id;


          jobIds.map((item) => {

            if (item == id) {
              setPostLiked(true);
            } else {
              setPostLiked(false);
            }

          })
        }

      } catch (error) {
        console.log('error getting saved like information', error);

        if (error === 'RangeError: Maximum call stack size exceeded (native stack depth)') {

          console.log('error handle');
          await AsyncStorage.removeItem('liked-ejs-999');
        }

      }


    }

    console.log('was post liked? called');

    wasPostLiked();

  }, [likedNow]);




  async function hanldeLike() {

    try {
      const savedData = await AsyncStorage.getItem('liked-ejs-999');
      let updatedItem;


      //incase the job posting has no data
      if (!data) {
        console.log('unable to like');
        return
      }


      if (postLiked) {
        //delete the post
        if (savedData) {
          const jobIds = JSON.parse(savedData).job_id;
          const jobDetails = JSON.parse(savedData).job_details;

          const idsWithoutCurrentId = jobIds.filter(item => item != id);


          updatedItem = {
            job_id: [idsWithoutCurrentId],
            job_details: {
              ...jobDetails
            }

          }

          //deletes the job details of the current id we could also make it undefined by after spreading it but deleting it is best
          delete updatedItem.job_details[id];

          console.log(updatedItem);

        }


        try {
          AsyncStorage.setItem('liked-ejs-999', JSON.stringify(updatedItem));
        } catch (error) {
          console.log(error);
        } finally {
          setLikedNow(!likedNow);

        }


      } else {
        //like the post

        if (savedData) {
          const parsedData = JSON.parse(savedData);
          updatedItem = {
            ...parsedData, job_id: [parsedData.job_id, id], job_details: {
              ...parsedData.job_details,
              [id]: {

                employer_logo: data?.employer_logo,
                job_title: data?.job_title,
                job_employment_type: data?.job_employment_type,

              }
            }
          };

        } else {

          updatedItem = {
            job_id: [id], job_details: {
              [id]: {

                employer_logo: data?.employer_logo,
                job_title: data?.job_title,
                job_employment_type: data?.job_employment_type,

              }
            }
          };




        }

        try {
          AsyncStorage.setItem('liked-ejs-999', JSON.stringify(updatedItem));
        } catch (error) {
          console.log(error);
        } finally {

          setLikedNow(!likedNow);

        }
      }



    } catch (error) {

      console.log('error at like button at job details footer', error);

    }



  }


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.likeBtn} onPress={() => hanldeLike()
      }>
        {
          postLiked ? (
            <Icon name="heart" size={30} color={COLORS.primary} />
          ) : (
            <Image
              source={icons.heartOutline}
              style={styles.likeBtnImage}
            />
          )
        }
      </TouchableOpacity>

      <TouchableOpacity style={styles.applyBtn} onPress={() => Linking.openURL(url)}>
        <Text style={styles.applyBtnText}>Apply for jobs</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Footer
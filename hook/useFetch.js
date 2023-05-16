import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { getApiKey, swapKey, dirtyKeyCleanup } from '../utils/getApiKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { startClock, endClock } from '../utils/timerStop';

const defaultkey = `${process.env.RAPID_API_KEY}`;


let fetchCounter = 0;
let firstFailure = false;
let isGoodKeysLeft = true;
let rapidApiKey;


const useFetch = (endpoint, query) => {
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [refresh, setRefresh] = useState(false);

   //the query string is the query objects internal value because query is an object we must translate it into a string to use it as an ID for the async storage when we save value for that query.
   const queryString = JSON.stringify(query);



   useEffect(() => {



      const cachedData = async () => {

         try {
            const cachedString = await AsyncStorage.getItem(`cache-${endpoint}-${queryString}`);




            if (cachedString) {

               const { data: cachedItem, timestamp } = JSON.parse(cachedString);



               const now = new Date().getTime();
               const diff = now - timestamp;
               const hour = 60 * 60 * 1000;

               // cache is valid if the difference in time is 
               const isCacheValid = timestamp && diff < hour;

               if (isCacheValid) {

                  console.log('retrieved from cache');
                  setData(cachedItem);
               } else {

                  console.log('cache not valid');

                  fetchData();
               }



            } else {

               console.log('no cache');
               fetchData();
            }

         } catch (error) {
            console.log('error at cache call ', error);

         }



      }



      const fetchData = async () => {

         setIsLoading(true);


         rapidApiKey = await getApiKey();


         const options = {
            method: 'GET',
            url: `https://jsearch.p.rapidapi.com/${endpoint}`,
            headers: {
               'X-RapidAPI-Key': rapidApiKey,
               'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            },
            params: { ...query },
         };



         setIsLoading(true);

         try {

            const response = await axios.request(options);
            setData(response.data.data);


            //cache the data
            const now = new Date().getTime();
            const cachedItem = JSON.stringify({ data: response.data.data, timestamp: now });


            AsyncStorage.setItem(`cache-${endpoint}-${queryString}`, cachedItem);





            //first failure false lets us know the key is valid this only comes to use when the dirtykeys are full then we empty the dirtykeys one last time while firstfailure is true and during the second run if the key is valid we will set the firstFailure back to false.
            firstFailure = false;


         } catch (error) {

            if (fetchCounter == 0) {
               fetchCounter += 1;
               refetchData();
            }
            else if (fetchCounter == 1 && isGoodKeysLeft) {

               console.log('swap attempt');
               fetchCounter = 0;
               isGoodKeysLeft = swapKey();
               refetchData();



            } else if (!isGoodKeysLeft) {

               if (!firstFailure) {
                  firstFailure = true;
                  dirtyKeyCleanup();
                  isGoodKeysLeft = true;
                  refetchData();
                  return;
               }



               setError(error);
               console.log(error);
               alert(error);

            } else {
               setError(error);
               console.log(error);
               alert(error);
            }



         } finally {

            setIsLoading(false);

         }


      };


      async function refetchData() {

         /* if (fetchCounter == 0) {
            fetchCounter += 1;
    
         } else {
            fetchCounter = 0;
            await delay(1200, 'waited');
         } */

         setTimeout(() => {



         }, 500)
         setIsLoading(true);
         fetchData();

      }






      cachedData();

   }, [refresh]);


   /* function delay(ms, resolvedValue) {
      return new Promise(resolve => setTimeout(resolvedValue, ms));
   }
    */

   /*  const memoCache = useMemo(() => {
 
       console.log('using memo');
       fetchData();
 
 r
    }, [endpoint, query]) */


   const refetch = () => {

      setRefresh(!refresh);

   }


   return { data, isLoading, error, refetch };

}

export default useFetch;
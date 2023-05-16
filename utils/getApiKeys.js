import { useCallback, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';



const originalKey = `${process.env.RAPID_API_KEY_BUNDLE_PUBLISHED}`;
let allKeys = [];
let dirtyKeys = [];
let currentKey;


//iife to get all necessary keys 
(() => {

   allKeys = originalKey.split('|').map((item) => item.trim());



})();


async function getStoredKeys() {
   const data = await AsyncStorage.getItem('currentKey-easyjobs-999');

   if (data) {
      currentKey = data;
   } else {
      currentKey = allKeys[0];
   }
}





export async function getApiKey() {

   //initialzation of the key on the first run
   try {
      if (!currentKey) {
         await getStoredKeys();
      }
   } catch (error) {
      console.log(error);
      if (!currentKey) {
         currentKey = allKeys[0];
      }
   }
   console.log('get api key: ', currentKey);
   AsyncStorage.setItem('currentKey-easyjobs-999', currentKey);

   if (!currentKey) {
      currentKey = allKeys[0];
   }


   return currentKey;
}

let i = 0;

export function swapKey() {

   //this function checks for all good keys by comparing the dirty keys to the total keys

   let isGoodKeysLeft = true;
   let goodkeys;
   try {
      dirtyKeys.push(currentKey);
      goodkeys = allKeys.filter(
         (key) => !dirtyKeys.includes(key)
      ).concat(
         dirtyKeys.filter(
            (key) => !allKeys.includes(key)

         )
      ).filter(
         (key) => key.trim().length > 0
      )

   } catch (error) {
      console.log(error)

   }
   console.log('the type is : ', typeof goodkeys);

   const randomIndex = Math.floor(Math.random() * goodkeys.length);


   /*  if (i < 3) {
       i++;
       console.log('ALL KEYS: ', allKeys);
       console.log('DIRTY KEYS: ', dirtyKeys);
       console.log('Goodkeys', goodkeys);
 
    }
  */

   if (goodkeys.length > 0) {
      currentKey = goodkeys[randomIndex];
   } else {

      isGoodKeysLeft = false;
   }

   if (currentKey == "") {
      isGoodKeysLeft = false;
   }

   console.log('swapped: ', currentKey);


   return isGoodKeysLeft;




}


export function dirtyKeyCleanup() {
   dirtyKeys = [];
}


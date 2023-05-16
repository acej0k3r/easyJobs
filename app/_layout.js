import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { useCallback } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


const _layout = () => {
   //standard

   const [fontsLoaded] = useFonts({
      DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
      DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
      DMRegular: require('../assets/fonts/DMSans-Regular.ttf'),
   })

   //state
   const onLayoutRootView = useCallback(async () => {

      if (fontsLoaded) {
         await SplashScreen.hideAsync();
      }

   }, [fontsLoaded])
   //function
   if (!fontsLoaded) return null;

   return <Stack onLayout={onLayoutRootView} />
}


export default _layout;
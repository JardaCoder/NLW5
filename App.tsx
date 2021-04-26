import React, { useEffect } from 'react';
import {Text, View, StyleSheet} from 'react-native'

import { Welcome } from './src/pages/Welcome';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';

import AppLoading from 'expo-app-loading';
import Routes  from './src/routes';

import * as Notification from 'expo-notifications';
import { PlantProps } from './src/libs/storage';



export default function App(){

  const [fontsLoaded] = useFonts({
      Jost_400Regular,
     Jost_600SemiBold
  })

  useEffect(() =>{
    const subscription = Notification.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;

      }
    )

    return () =>  subscription.remove();

    // const notifications = async() =>{
    //   const data = await Notification.getAllScheduledNotificationsAsync();
    //   console.log(data);
    // }
    // notifications();
  },[])


  return(
    !fontsLoaded ?
      <AppLoading/> 
    :
      <Routes />
  )
}


const style = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }


})
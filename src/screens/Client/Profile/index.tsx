import React from 'react'
import { View, Text } from 'react-native'
import Button from '../../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ProfileScreen() {

  const logOut = async () => {
    try {
      await  AsyncStorage.removeItem("isAuth");
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <View style={{flex:1,justifyContent:"center", alignItems:"center",margin:20}}>
      <Button text='Çıkış Yap' onPress={async () => await logOut() } />
    </View>
  )
}
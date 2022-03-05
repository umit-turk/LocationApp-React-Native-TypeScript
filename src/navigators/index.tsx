import React from 'react';
import { StatusBar } from 'react-native'
import RootNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import Colors from '../constants/Colors';
export default function index() {
  return (
    <NavigationContainer>
       <StatusBar barStyle="light-content" backgroundColor={Colors.c90BF00} />
       <RootNavigator />
    </NavigationContainer>
  )
}
import React from 'react'
import { View, Text } from 'react-native'
import MapView from 'react-native-maps';

export default function MapScreen() {
  return (
    <View style={{flex:1}}>
      <Text>Map Screen</Text>
      <MapView
      style={{flex:1,}}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
    </View>
  )
}
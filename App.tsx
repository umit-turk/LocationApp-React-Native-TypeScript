import {View, StyleSheet, Image, Platform, StatusBar, Text} from 'react-native';
import React from 'react';
import Images from './src/constants/Images';
import Colors from './src/constants/Colors';
import Layout from './src/constants/Layout';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          style={styles.image}
          resizeMethod="scale"
          source={Images.logo}
          resizeMode="contain"
        />

        <View
          style={{
            borderTopLeftRadius: 75,
            backgroundColor: Colors.cFFFFFF,
            height: Layout.height / 1.5,
            position: 'absolute',
            right: 0,
            left: 0,
            bottom: 0,
          }}>
          <Text>hello</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: Colors.c90BF00,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default App;

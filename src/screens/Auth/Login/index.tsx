import {View, Image} from 'react-native';
import React from 'react';
import Images from '../../../constants/Images';
import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import Button from '../../../components/Button';
import TextField from '../../../components/TextInput';
import styles from './styles';

const Login = () => {
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
          <View
            style={{flex: 1, marginHorizontal: 20, justifyContent: 'center'}}>
            <TextField label="Kullanıcı adı" />
            <TextField label="Sifre" secureTextEntry />
            <View style={{marginVertical: 70}}>
              <Button text="Login" onPress={() => console.log('hellooo')} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

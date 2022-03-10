import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import AppScreens from '../constants/Screens';
import LoginScreen from '../screens/Auth/Login';
import MapScreen from '../screens/Client/Map';
import HomeScreen from '../screens/Client/Home';
import ProfileScreen from '../screens/Client/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants';

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootStackParamList>();

export default function StackNavigator() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const getIsAuth = async () => {
    const response = await AsyncStorage.getItem('isAuth');

    if(response) {
      const responseObject = JSON.parse(response)
   

    if(responseObject?.isAuth){
      setIsAuth(true);

    }else {
      setIsAuth(false);
    }

    console.log('response',isAuth, response);
  }
  };

  useEffect(() => {
    getIsAuth();
  }, []);

  const initialRouteName = isAuth ? AppScreens.Login : AppScreens.Home;

  return !isAuth ? (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name={AppScreens.Login}
        component={LoginScreen}
        options={{headerShown: false}}
      />

     
    </Stack.Navigator>
  ) : (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName = '';

        const {name} = route;
        if(name === AppScreens.Home) {
          iconName = focused ? 'home' : 'home';
        }
        if(name === AppScreens.Map) {
          iconName = focused ? 'map' : 'map'
        }
        if(name === AppScreens.Profile) {
          iconName = focused ? 'person' : 'person';
        }

        return <Icon name={iconName} size={size} color={Colors.c90BF00} />
      },
      tabBarActiveTintColor:Colors.c90BF00
    }
    
    )}>
      <Tab.Screen name={AppScreens.Home} component={HomeScreen} />
      <Tab.Screen
        name={AppScreens.Map}
        component={MapScreen}
        //options={{headerShown: false}}
      />
      <Tab.Screen name={AppScreens.Profile} component={ProfileScreen} />
     
    </Tab.Navigator>
  );
}

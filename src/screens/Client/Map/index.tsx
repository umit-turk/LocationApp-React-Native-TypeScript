import React from 'react';
import {useState} from 'react';
import {useRef} from 'react';
import {
  View,
  Text,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import MapView, {Circle, Marker} from 'react-native-maps';
import LiveData from '../../../utils/data';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import GeolocationService from 'react-native-geolocation-service';
import styles from './styles';
import {useEffect} from 'react';
import BottomSheet from '../../../components/BottomSheet';

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);

  const [isShowBottomSheet, setIsShowBottomSheet] = useState<boolean>(false);

  const [liveLocation, setLiveLocation] = useState<GeolocationResponse | null>(
    null,
  );

  const mapMakers = () => {
    return LiveData?.length > 0
      ? LiveData.map(markerData => (
          <Marker
            key={markerData.id}
            coordinate={{
              latitude: markerData.latitude,
              longitude: markerData.longitude,
              latitudeDelta: 0.2922,
              longitudeDelta: 0.1421,
            }}
          />
        ))
      : null;
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setLiveLocation(position);

        mapRef?.current?.animateCamera({
          center: {
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          },
          pitch: 0,
          heading: 0,
          altitude: 10000,
          zoom: 45,
        });
        console.warn(JSON.stringify(position, null, 4));
      },
      error => {
        setLiveLocation(null);
        Alert.alert(`Code ${error.code}, ${error.message}`)
      },
      {
        enableHighAccuracy: true,
        timeout:15000,
        maximumAge: 10000,
        distanceFilter:0,

      }
    );
  };

  const closeBottomSheet = () => {
    setIsShowBottomSheet(false);
  };

  //telefon ayarlarina yonlendir
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Ayarlar açılmadı !!');
    });
  };
  //IOS icin izin verme ayarlari
  const hasPermissionIOS = async () => {
    const status = await GeolocationService.requestAuthorization('whenInUse');

    //izin verilmis ise true don
    if (status === 'granted') {
      return true;
    }

    //izin verilmemis ise
    if (status === 'denied') {
      Alert.alert('Konum izni verilmedi.');
    }

    if (status === 'disabled') {
      Alert.alert('Konum izinlerine izin vermelisiniz'), '';
      [
        {text: 'Ayarlara git', onPress: openSetting},
        {text: 'Konumu Kullanma', onPress: () => {}},
      ];
    }

    return false;
  };

  //android icin genel ayarlar
  const hasPermissionAndroid = async () => {
    if (Platform.OS !== 'android') {
      return false;
    }

    if (Platform.Version < 23) {
      return true;
    }

    //izini kontrol et
    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Konum izniniz kapalıdır.', ToastAndroid.LONG);
    }

    if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Konum iznini iptal etmişsiniz.', ToastAndroid.LONG);
    }

    return false;
  };

  //genel bir metod
  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();

      return hasPermission;
    }

    await hasPermissionAndroid();
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapRef}
        loadingEnabled
        style={{flex: 1}}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {mapMakers()}

        {liveLocation?.coords && (
          <Marker
            anchor={{x: 0.5, y: 0.6}}
            coordinate={liveLocation?.coords}
            flat>
            <View style={styles.dotContainer}>
              <View style={styles.arrow} />
              <View style={styles.dot} />
            </View>
          </Marker>
        )}
      </MapView>

      <BottomSheet
        visible={isShowBottomSheet}
        onRequestClose={() => closeBottomSheet()}></BottomSheet>
    </View>
  );
}

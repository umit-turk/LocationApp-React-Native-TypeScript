import { Platform, StatusBar, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

export default StyleSheet.create({
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


import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ComponentProps} from 'react';
import styles from './styles';

type Props = ComponentProps<typeof TouchableOpacity> & {
  text: string;
  onPress: () => {};
};
export default function Button({text, onPress}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buton}
        onPress={onPress}
        activeOpacity={0.9}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

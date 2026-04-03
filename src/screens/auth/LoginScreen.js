import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen — Sprint 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    color: COLORS.primary,
    fontSize: 18,
  },
});
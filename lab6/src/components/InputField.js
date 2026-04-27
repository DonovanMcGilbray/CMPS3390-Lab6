import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export default function InputField({ placeholder, value, onChangeText, error }) {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 5,
    borderRadius: 5
  },
  error: {
    color: 'red',
    marginBottom: 5
  }
});
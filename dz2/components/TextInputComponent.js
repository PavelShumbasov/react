import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextInputComponent = () => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {name ? `Hi ${name}!` : 'What is your name?'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={text => setName(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginVertical: 16,
    fontSize: 18,
  },
  input: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    width: 200,
    textAlign: 'center',
  },
});

export default TextInputComponent;

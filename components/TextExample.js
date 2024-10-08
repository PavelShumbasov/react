import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const TextExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Заголовок</Text>
      <Text style={styles.subtitle}>Текст</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
});

export default TextExample;

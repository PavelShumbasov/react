import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewExample = () => {
  return (
    <View style={styles.container}>
      <Text>Это пример компонента View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
    height: 100,
  },
});

export default ViewExample;

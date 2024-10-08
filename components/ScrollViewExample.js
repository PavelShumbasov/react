import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';

const DATA = Array.from({ length: 30 }, (_, i) => `Элемент ${i + 1}`);

const ScrollViewExample = () => {
  const renderItem = ({ item }) => (
    <Text style={styles.item}>{item}</Text>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ScrollViewExample;

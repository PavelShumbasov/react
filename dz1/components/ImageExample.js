import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const ImageExample = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://i.artfile.ru/2880x1800_729861_[www.ArtFile.ru].jpg' }} 
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ImageExample;

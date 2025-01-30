import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Box = () => {
  const [color, setColor] = useState('blue');
  const [width, setWidth] = useState('100');
  const [height, setHeight] = useState('100');

  return (
    <View style={styles.container}>
      {/* Поля ввода */}
      <TextInput
        style={styles.input}
        placeholder="Цвет (например, red, #ff0000)"
        value={color}
        onChangeText={setColor}
      />
      <TextInput
        style={styles.input}
        placeholder="Ширина (в пикселях)"
        keyboardType="numeric"
        value={width}
        onChangeText={setWidth}
      />
      <TextInput
        style={styles.input}
        placeholder="Высота (в пикселях)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      {/* Кнопка для обновления */}
      <Button title="Обновить квадрат" onPress={() => {}} />

      {/* Квадрат */}
      <View
        style={[
          styles.box,
          {
            backgroundColor: color,
            width: parseInt(width) || 100,
            height: parseInt(height) || 100,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  box: {
    marginTop: 20,
    borderRadius: 5,
  },
});

export default Box;

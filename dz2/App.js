import React, { useState } from 'react';
import { View, Button, StyleSheet, ScrollView } from 'react-native';
import ButtonText from './components/ButtonText';
import TextInputComponent from './components/TextInputComponent';
import LoginForm from './components/LoginForm';
import Box from './components/Box';

const App = () => {
  const [boxes, setBoxes] = useState([]);

  const addBox = () => {
    const newBox = { color: 'blue', width: 100, height: 100 };
    setBoxes([...boxes, newBox]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ButtonText />
      <TextInputComponent />
      <LoginForm />
      <View style={styles.boxContainer}>
        {boxes.map((box, index) => (
          <Box key={index} {...box} />
        ))}
      </View>
      <Button title="Add Box" onPress={addBox} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  boxContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default App;

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ButtonText = () => {
  const [pressedCount, setPressedCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const handlePress = () => {
    setPressedCount(pressedCount + 1);
    if (pressedCount >= 3) {
      setIsDisabled(true);
    }
  };

  const resetPress = () => {
    setPressedCount(0);
    setIsDisabled(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {pressedCount > 0 ? `The button was pressed ${pressedCount} times!` : 'The button isn\'t pressed yet'}
      </Text>
      <Button title="Press me" onPress={handlePress} disabled={isDisabled} />
      <Button title="Reset" onPress={resetPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    margin: 16,
    fontSize: 18,
  },
});

export default ButtonText;

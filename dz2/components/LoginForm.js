import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = () => {
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      {!isLoggedIn ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button title="Login" onPress={handleSubmit} />
        </>
      ) : (
        <Text>Welcome!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    padding: 8,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
    width: 200,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default LoginForm;

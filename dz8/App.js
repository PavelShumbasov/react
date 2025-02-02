import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './components/TodoList';
import store from './viewModels/TodoStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      Home: '',
      TodoList: 'todos',
    },
  },
};

const App = observer(() => {
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      store.addTodo(inputValue);
      setInputValue('');
    }
  };

  useEffect(() => {
    store.fetchTodos();
    
    const handleDeepLink = (event) => {
      const { path } = event;
      if (path === 'todos') {
        store.fetchTodos();
      }
    };
    
    Linking.addEventListener('url', handleDeepLink);

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {({ navigation }) => (
              <View style={styles.container}>
                <Text style={styles.title}>Welcome to My App</Text>
                <Button
                  title="Go to Todo List"
                  onPress={() => navigation.navigate('TodoList')}
                />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="TodoList">
            {() => (
              <View style={styles.container}>
                <Text style={styles.title}>My Custom TODO List</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Add a new task"
                  value={inputValue}
                  onChangeText={setInputValue}
                />
                <Button title="Add Task" onPress={handleAddTodo} />
                <TodoList />
              </View>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default App;

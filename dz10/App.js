import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoList from './components/TodoList';
import store from './viewModels/TodoStore';
import themeStore from './viewModels/ThemeStore';
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

  const isDarkMode = themeStore.theme === 'dark';

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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home">
            {({ navigation }) => (
              <View style={[styles.container, isDarkMode && styles.containerDark]}>
                <Text style={[styles.title, isDarkMode && styles.titleDark]}>Welcome to My App</Text>
                <Button
                  title="Go to Todo List"
                  onPress={() => navigation.navigate('TodoList')}
                />
                <Button
                  title={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Theme`}
                  onPress={() => themeStore.toggleTheme()}
                />
              </View>
            )}
          </Stack.Screen>

          <Stack.Screen name="TodoList">
            {() => (
              <View style={[styles.container, isDarkMode && styles.containerDark]}>
                <Text style={[styles.title, isDarkMode && styles.titleDark]}>My Custom TODO List</Text>
                <TextInput
                  style={[styles.input, isDarkMode && styles.inputDark]}
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
  containerDark: {
    backgroundColor: '#121212',
  },
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
  },
  titleDark: {
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'OpenSans-Regular',
  },
  inputDark: {
    backgroundColor: '#333',
    color: '#fff',
    borderColor: '#666',
    fontFamily: 'OpenSans-Regular',
  },
});

export default App;

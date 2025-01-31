import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import TodoList from './components/TodoList';
import store from './viewModels/TodoStore';

const App = observer(() => {
    const [inputValue, setInputValue] = useState('');
    const handleAddTodo = () => {
        if (inputValue.trim()) {
            console.log('Добавляем задачу:', inputValue); 
            store.addTodo(inputValue);
            setInputValue('');
        }
    };

    return (
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
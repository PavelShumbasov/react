import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import store from './viewModels/TodoStore';

const App = observer(() => {
    const [inputValue, setInputValue] = React.useState('');

    const handleAddTodo = () => {
        if (inputValue.trim()) {
            store.addTodo(inputValue);
            setInputValue('');
        }
    };

    const handleToggleTodo = (id) => {
        store.toggleTodo(id);
    };

    const handleDeleteTodo = (id) => {
        store.deleteTodo(id);
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
            <FlatList
                data={store.todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text
                            style={[
                                styles.todoText,
                                item.completed && styles.completedText
                            ]}
                            onPress={() => handleToggleTodo(item.id)}
                        >
                            {item.title}
                        </Text>
                        <Button title="Remove" onPress={() => handleDeleteTodo(item.id)} />
                    </View>
                )}
            />
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
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    todoText: {
        fontSize: 18,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
});

export default App;
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import store from '../viewModels/TodoStore';

const TodoList = observer(() => {
    return (
        <FlatList
            data={store.todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <View style={styles.todoItem}>
                    <TouchableOpacity onPress={() => store.toggleTodo(item.id)} style={[styles.checkbox, item.completed && styles.checkedCheckbox]}>
                        {item.completed && <Text style={styles.checkmark}>✔</Text>}
                    </TouchableOpacity>
                    <Text style={[styles.todoText, item.completed && styles.completedText]}>
                        {item.title}
                    </Text>
                    <TouchableOpacity onPress={() => store.deleteTodo(item.id)} style={styles.deleteButton}>
                        <Text style={styles.deleteText}>✖</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
});

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkmark: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    todoText: {
        fontSize: 18,
        flex: 1,
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    deleteButton: {
        marginLeft: 10,
    },
    deleteText: {
        fontSize: 18,
        color: 'red',
    },
    checkedCheckbox: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
});

export default TodoList;
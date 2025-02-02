import React, { useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import store from '../viewModels/TodoStore';
import { Modalize } from 'react-native-modalize';

const TodoList = observer(() => {
    const modalizeRef = useRef(null);

    const confirmDelete = (id) => {
        Alert.alert(
            "Подтверждение",
            "Точно удалить?",
            [
                { text: "Нет", style: "cancel" },
                { text: "Да", onPress: () => store.deleteTodo(id) },
            ],
            { cancelable: true }
        );
    };

    const openCompletedTasks = () => {
        modalizeRef.current?.open();
    };

    const completedTodos = store.todos.filter(todo => todo.completed);

    const handleTodoPress = (event, todoId) => {
        event.persist();
        store.toggleTodo(todoId);
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={store.todos}
                keyExtractor={(item) => item.id.toString()}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <TouchableOpacity
                            onPress={(event) => handleTodoPress(event, item.id)}
                            style={[styles.checkbox, item.completed && styles.checkedCheckbox]}
                        >
                            {item.completed && <Text style={styles.checkmark}>✔</Text>}
                        </TouchableOpacity>
                        <Text style={[styles.todoText, item.completed && styles.completedText]}>
                            {item.title}
                        </Text>
                        <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteText}>✖</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity onPress={openCompletedTasks} style={styles.viewCompletedButton}>
                <Text style={styles.buttonText}>Посмотреть завершённые задачи</Text>
            </TouchableOpacity>

            <Modalize
                ref={modalizeRef}
                adjustToContentHeight
                flatListProps={{
                    data: completedTodos,
                    keyExtractor: (item) => item.id.toString(),
                    keyboardShouldPersistTaps: "handled",
                    renderItem: ({ item }) => (
                        <View style={styles.todoItem}>
                            <Text style={[styles.todoText, styles.completedText]}>
                                {item.title}
                            </Text>
                        </View>
                    )
                }}
            />
        </View>
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
    viewCompletedButton: {
        marginTop: 10,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TodoList;

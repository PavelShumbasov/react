import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import store from './viewModels/TodoStore';
import { Modalize } from 'react-native-modalize';  // Импортируем Modalize
import { GestureHandlerRootView } from 'react-native-gesture-handler';  // Импортируем GestureHandlerRootView

const App = observer(() => {
    const [inputValue, setInputValue] = React.useState('');
    const modalRef = React.useRef(null);  // Ссылка на модальное окно

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
        Alert.alert(
            "Подтверждение удаления",
            "Вы точно хотите удалить эту задачу?",
            [
                {
                    text: "Нет",
                    style: "cancel"
                },
                {
                    text: "Да",
                    onPress: () => store.deleteTodo(id) // Удаление задачи при подтверждении
                }
            ]
        );
    };

    const handleShowCompletedTodos = () => {
        modalRef.current?.open(); // Открытие модального окна с завершенными задачами
    };

    const completedTodos = store.todos.filter(todo => todo.completed); // Фильтрация завершенных задач

    return (
        <GestureHandlerRootView style={styles.container}>
            <Text style={styles.title}>My Custom TODO List</Text>
            <TextInput
                style={styles.input}
                placeholder="Add a new task"
                value={inputValue}
                onChangeText={setInputValue}
            />
            <Button title="Add Task" onPress={handleAddTodo} />
            <Button title="Посмотреть завершенные задачи" onPress={handleShowCompletedTodos} />
            <FlatList
                data={store.todos}
                keyExtractor={(item) => item.id.toString() + item.title}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text
                            style={[styles.todoText, item.completed && styles.completedText]}
                            onPress={() => handleToggleTodo(item.id)}
                        >
                            {item.title}
                        </Text>
                        <Button title="Remove" onPress={() => handleDeleteTodo(item.id)} />
                    </View>
                )}
            />

            <Modalize ref={modalRef}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Завершенные задачи</Text>
                    {completedTodos.length > 0 ? (
                        <FlatList
                            data={completedTodos}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.modalTodoItem}>
                                    <Text style={styles.completedText}>{item.title}</Text>
                                </View>
                            )}
                        />
                    ) : (
                        <Text style={styles.modalText}>Нет завершенных задач</Text>
                    )}
                </View>
            </Modalize>
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
    modalContainer: {
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalTodoItem: {
        paddingVertical: 10,
    },
    modalText: {
        fontSize: 16,
        color: 'gray',
    },
});

export default App;

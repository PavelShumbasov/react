import React, { useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, SafeAreaView, ScrollView } from 'react-native';
import { observer } from 'mobx-react-lite';
import store from '../viewModels/TodoStore';
import themeStore from '../viewModels/ThemeStore';
import { Modalize } from 'react-native-modalize';

const TodoList = observer(() => {
    const modalizeRef = useRef(null);
    const isDarkMode = themeStore.theme === 'dark';

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

    return (
        <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
            {/* Кнопка смены темы */}
            <TouchableOpacity onPress={() => themeStore.toggleTheme()} style={styles.themeButton}>
                <Text style={styles.buttonText}>{isDarkMode ? 'Светлая тема' : 'Тёмная тема'}</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <FlatList
                    data={store.todos}
                    keyExtractor={(item) => item.id.toString()}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                        <View style={[styles.todoItem, isDarkMode && styles.todoItemDark]}>
                            <TouchableOpacity
                                onPress={() => store.toggleTodo(item.id)}
                                style={[styles.checkbox, item.completed && styles.checkedCheckbox]}
                            >
                                {item.completed && <Text style={styles.checkmark}>✔</Text>}
                            </TouchableOpacity>
                            <Text style={[styles.todoText, item.completed && styles.completedText, isDarkMode && styles.todoTextDark]}>
                                {item.title}
                            </Text>
                            <TouchableOpacity onPress={() => confirmDelete(item.id)} style={styles.deleteButton}>
                                <Text style={styles.deleteText}>✖</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </ScrollView>

            {/* Кнопка просмотра завершенных задач */}
            <TouchableOpacity onPress={openCompletedTasks} style={styles.viewCompletedButton}>
                <Text style={styles.buttonText}>Посмотреть завершённые задачи</Text>
            </TouchableOpacity>

            {/* Модальное окно с завершёнными задачами */}
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
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10, // Добавляем отступ сверху
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    todoItemDark: {
        borderBottomColor: '#444',
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
        color: '#000',
    },
    todoTextDark: {
        color: '#fff',
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
        marginVertical: 10,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    themeButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TodoList;

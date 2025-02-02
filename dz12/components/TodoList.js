import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import todoStore from '../viewModels/TodoStore';

const TodoList = () => {
  const [inputValue, setInputValue] = useState('');

  // Получение списка задач
  const todos = todoStore.getTodos();

  // Добавление новой задачи
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      todoStore.addTodo(inputValue);
      setInputValue('');
    }
  };

  // Удаление задачи
  const handleDeleteTodo = (id) => {
    todoStore.deleteTodo(id);
  };

  // Переключение статуса задачи
  const handleToggleTodo = (id) => {
    todoStore.toggleTodo(id);
  };

  return (
    <View style={styles.container}>
      {/* Ввод новой задачи */}
      <TextInput
        style={styles.input}
        placeholder="Добавить задачу"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Добавить" onPress={handleAddTodo} />

      {/* Список задач */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={[styles.todoText, item.completed && styles.completedText]}>
              {item.title}
            </Text>
            <Button title={item.completed ? 'Отменить' : 'Завершить'} onPress={() => handleToggleTodo(item.id)} />
            <Button title="Удалить" color="red" onPress={() => handleDeleteTodo(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

export default TodoList;
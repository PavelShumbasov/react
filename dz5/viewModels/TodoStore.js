import { makeAutoObservable } from 'mobx';
import { Todo } from '../models/TodoModel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class TodoStore {
    todos = [];
    apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // Example API endpoint

    constructor() {
        makeAutoObservable(this);
        this.fetchTodos();
    }

    // Сохраняем задачи в AsyncStorage
    saveTodosToAsyncStorage = async () => {
        try {
            await AsyncStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving todos to AsyncStorage:', error);
        }
    };

    // Загружаем задачи из AsyncStorage
    loadTodosFromAsyncStorage = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem('todos');
            if (storedTodos) {
                this.todos = JSON.parse(storedTodos);
            }
        } catch (error) {
            console.error('Error loading todos from AsyncStorage:', error);
        }
    };

    // Загружаем задачи из API и сохраняем их в AsyncStorage
    fetchTodos = async () => {
        try {
            const response = await axios.get(this.apiUrl);
            this.todos = response.data.map(todo => new Todo(todo.id, todo.title, todo.completed));
            this.saveTodosToAsyncStorage(); // Сохраняем после загрузки
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Добавляем новую задачу
    addTodo = (title) => {
        const newTodo = new Todo(Date.now(), title);
        this.todos.push(newTodo);
        this.saveTodosToAsyncStorage(); // Сохраняем после добавления

        axios.post(this.apiUrl, {
            userId: 1,
            title: title,
            completed: false
        })
        .then(response => {
            newTodo.id = response.data.id; // Обновляем ID с сервера
            this.saveTodosToAsyncStorage(); // Сохраняем после обновления ID
        })
        .catch(error => {
            console.error('Error adding todo:', error);
            this.todos.pop(); // Убираем задачу, если не удалось добавить на сервер
            this.saveTodosToAsyncStorage(); // Сохраняем в любом случае
        });
    };

    // Переключаем статус задачи (выполнена/не выполнена)
    toggleTodo = (id) => {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodosToAsyncStorage(); // Сохраняем после изменения

            axios.patch(`${this.apiUrl}/${id}`, {
                completed: todo.completed
            })
            .catch(error => {
                console.error('Error toggling todo:', error);
                todo.completed = !todo.completed; // Откатываем изменение, если ошибка
                this.saveTodosToAsyncStorage(); // Сохраняем откат
            });
        }
    };

    // Удаляем задачу
    deleteTodo = (id) => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveTodosToAsyncStorage(); // Сохраняем после удаления

        axios.delete(`${this.apiUrl}/${id}`)
        .catch(error => {
            console.error('Error deleting todo:', error);
            this.fetchTodos(); // Перезагружаем задачи, если удаление не удалось
        });
    };
}

const store = new TodoStore();
export default store;

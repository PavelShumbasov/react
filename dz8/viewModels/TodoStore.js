import { makeAutoObservable, action } from 'mobx';
import { Todo } from '../models/TodoModel';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; // Используем uuid для генерации уникальных id

class TodoStore {
    todos = [];
    apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // Example API endpoint
    STORAGE_KEY = '@todo_store';

    constructor() {
        makeAutoObservable(this);
        this.fetchTodosFromApi();
        this.loadTodosFromStorage();
    }

    // Загрузка задач из API
    fetchTodosFromApi = async () => {
        try {
            const response = await axios.get(this.apiUrl);
            this.todos = response.data.map(todo => new Todo(todo.id, todo.title, todo.completed));
            this.saveTodosToStorage(); // Сохраняем задачи в AsyncStorage после загрузки
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Загрузка задач из AsyncStorage
    loadTodosFromStorage = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(this.STORAGE_KEY);
            if (jsonValue != null) {
                this.todos = JSON.parse(jsonValue).map(todo => new Todo(todo.id, todo.title, todo.completed));
            }
        } catch (error) {
            console.error('Error loading todos from storage:', error);
        }
    };

    // Сохранение задач в AsyncStorage
    saveTodosToStorage = async () => {
        try {
            const jsonValue = JSON.stringify(this.todos);
            await AsyncStorage.setItem(this.STORAGE_KEY, jsonValue);
        } catch (error) {
            console.error('Error saving todos to storage:', error);
        }
    };

    // Добавление новой задачи
    addTodo = action((title) => {
        const newId = uuidv4(); // Генерация уникального ID с использованием uuid
        const newTodo = new Todo(newId, title, false); // Статус "не выполнена" по умолчанию
        this.todos.push(newTodo); // Добавление новой задачи в список
        // Отправка задачи на сервер
        axios.post(this.apiUrl, {
            userId: 1,
            title: title,
            completed: false
        })
        .then(response => {
            newTodo.id = response.data.id; // Обновляем ID задачи с тем, что возвращен с сервера
            this.saveTodosToStorage(); // Сохраняем изменения в AsyncStorage
        })
        .catch(error => {
            console.error('Error adding todo:', error);
            this.todos.pop(); // Удаляем задачу, если она не добавилась на сервер
        });
    });

    // Переключение статуса выполнения задачи
    toggleTodo = action((id) => {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed; // Переключаем статус выполнения задачи
            // Отправка изменения на сервер
            axios.patch(`${this.apiUrl}/${id}`, {
                completed: todo.completed
            })
            .then(() => this.saveTodosToStorage()) // Сохраняем изменения в AsyncStorage
            .catch(error => {
                console.error('Error toggling todo:', error);
                todo.completed = !todo.completed; // Если запрос не удался, откатываем изменения
            });
        }
    });

    // Удаление задачи
    deleteTodo = action((id) => {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            const [deletedTodo] = this.todos.splice(index, 1); // Удаление задачи по ID
            // Отправка удаления задачи на сервер
            axios.delete(`${this.apiUrl}/${id}`)
            .then(() => this.saveTodosToStorage()) // Сохраняем изменения в AsyncStorage
            .catch(error => {
                console.error('Error deleting todo:', error);
                this.todos.splice(index, 0, deletedTodo); // Восстанавливаем задачу, если удаление не удалось
            });
        }
    });
}

const store = new TodoStore();
export default store;
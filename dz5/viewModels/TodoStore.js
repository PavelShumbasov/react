import { makeAutoObservable } from 'mobx';
import { Todo } from '../models/TodoModel';
import axios from 'axios';

class TodoStore {
    todos = [];
    apiUrl = 'https://jsonplaceholder.typicode.com/todos'; // Example API endpoint

    constructor() {
        makeAutoObservable(this);
        this.fetchTodos();
    }

    fetchTodos = async () => {
        try {
            const response = await axios.get(this.apiUrl);
            this.todos = response.data.map(todo => new Todo(todo.id, todo.title, todo.completed));
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    addTodo(title) {
        const newTodo = new Todo(Date.now(), title);
        this.todos.push(newTodo);

        axios.post(this.apiUrl, {
            userId: 1,
            title: title,
            completed: false
        })
        .then(response => {
            newTodo.id = response.data.id; // Update ID with the one returned by the server
        })
        .catch(error => {
            console.error('Error adding todo:', error);
            this.todos.pop(); // Remove locally added todo if it failed to add on the server
        });
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;

            axios.patch(`${this.apiUrl}/${id}`, {
                completed: todo.completed
            })
            .catch(error => {
                console.error('Error toggling todo:', error);
                todo.completed = !todo.completed; // Revert local change if server request fails
            });
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);

        axios.delete(`${this.apiUrl}/${id}`)
        .catch(error => {
            console.error('Error deleting todo:', error);
            this.fetchTodos(); // Refetch todos if deletion fails
        });
    }
}

const store = new TodoStore();
export default store;
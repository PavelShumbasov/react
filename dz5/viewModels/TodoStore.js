import { makeAutoObservable } from 'mobx';
import api from './api';

class TodoStore {
    todos = [];

    constructor() {
        makeAutoObservable(this);
        this.fetchTodos();
    }

    async fetchTodos() {
        try {
            const response = await api.get('/todos');
            this.todos = response.data;
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    async addTodo(title) {
        try {
            const newTodo = { title, completed: false };
            const response = await api.post('/todos', newTodo);
            this.todos.push(response.data);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    async toggleTodo(id) {
        try {
            const todoIndex = this.todos.findIndex(todo => todo.id === id);
            if (todoIndex !== -1) {
                const updatedTodos = [...this.todos];
                updatedTodos[todoIndex].completed = !updatedTodos[todoIndex].completed;

                await api.put(`/todos/${id}`, updatedTodos[todoIndex]);
                this.todos = updatedTodos;
            }
        } catch (error) {
            console.error("Error toggling todo:", error);
        }
    }

    async deleteTodo(id) {
        try {
            await api.delete(`/todos/${id}`);
            this.todos = this.todos.filter(todo => todo.id !== id);
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    }
}

const store = new TodoStore();
export default store;

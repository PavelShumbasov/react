import { makeAutoObservable } from 'mobx';

class TodoStore {
    todos = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(title) {
        this.todos.push({ id: Date.now(), title, completed: false });
    }

    toggleTodo(id) {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);
        if (todoIndex !== -1) {
            const updatedTodos = [...this.todos];
            updatedTodos[todoIndex].completed = !updatedTodos[todoIndex].completed;
            this.todos = updatedTodos;
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}

const store = new TodoStore();
export default store;
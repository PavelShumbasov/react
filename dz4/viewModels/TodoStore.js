import { makeAutoObservable } from 'mobx';
import { Todo } from '../models/TodoModel';

class TodoStore {
    todos = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(title) {
        const newTodo = new Todo(Date.now(), title);
        this.todos.push(newTodo);
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }
}

const store = new TodoStore();
export default store;
import { makeAutoObservable } from 'mobx';
import Realm from 'realm';
import api from './api';

import { Todo } from '../models/TodoModel';

class TodoStore {
    todos = [];
    realm = null;

    constructor() {
        makeAutoObservable(this);
        this.initRealm();
        this.loadTodosFromRealm();
        this.fetchTodos(); 
    }

    async initRealm() {
        try {
            this.realm = await Realm.open({
                path: 'todo.realm', 
                schema: [Todo], 
                schemaVersion: 1, 
            });
        } catch (error) {
            console.error('Error initializing Realm:', error);
        }
    }

    loadTodosFromRealm() {
        if (this.realm) {
            const todos = this.realm.objects('Todo');
            this.todos = Array.from(todos).map(todo => ({
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
            }));
        }
    }

    async addTodo(title) {
        try {
            const newId = this.todos.length > 0 ? Math.max(...this.todos.map(todo => todo.id)) + 1 : 1;
            this.realm.write(() => {
                this.realm.create('Todo', { id: newId, title, completed: false });
            });
            this.loadTodosFromRealm();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }

    async toggleTodo(id) {
        try {
            this.realm.write(() => {
                const todo = this.realm.objectForPrimaryKey('Todo', id);
                if (todo) {
                    todo.completed = !todo.completed;
                }
            });
            this.loadTodosFromRealm();
        } catch (error) {
            console.error('Error toggling todo:', error);
        }
    }

    async deleteTodo(id) {
        try {
            this.realm.write(() => {
                const todo = this.realm.objectForPrimaryKey('Todo', id);
                if (todo) {
                    this.realm.delete(todo);
                }
            });
            this.loadTodosFromRealm();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }

    saveTodosToStorage() {}

    async fetchTodos() {
        try {
            const response = await api.get('/todos');
            this.realm.write(() => {
                this.realm.deleteAll(); 
                this.realm.create('Todo', response.data, Realm.UpdateMode.Modified); 
            });
            this.loadTodosFromRealm();
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    }
}

const store = new TodoStore();
export default store;
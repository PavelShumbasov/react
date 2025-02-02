import Realm from 'realm';
import { Todo } from '../models/TodoModel';

class TodoStore {
  constructor() {
    this.realm = new Realm({ schema: [Todo] });
  }

  // Получение всех задач
  getTodos() {
    return this.realm.objects('Todo');
  }

  // Добавление новой задачи
  addTodo(title) {
    const id = this.getNextId();
    this.realm.write(() => {
      this.realm.create('Todo', { id, title, completed: false, createdAt: new Date() });
    });
  }

  // Обновление статуса задачи
  toggleTodo(id) {
    this.realm.write(() => {
      const todo = this.realm.objectForPrimaryKey('Todo', id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    });
  }

  // Удаление задачи
  deleteTodo(id) {
    this.realm.write(() => {
      const todo = this.realm.objectForPrimaryKey('Todo', id);
      if (todo) {
        this.realm.delete(todo);
      }
    });
  }

  // Получение следующего ID
  getNextId() {
    const todos = this.getTodos();
    return todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
  }

  // Закрытие Realm
  close() {
    this.realm.close();
  }
}

const todoStore = new TodoStore();
export default todoStore;
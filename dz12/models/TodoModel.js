import Realm from 'realm';

export class Todo extends Realm.Object {
  static schema = {
    name: 'Todo',
    properties: {
      id: 'int',
      title: 'string',
      completed: 'bool',
      createdAt: 'date',
    },
    primaryKey: 'id',
  };
}
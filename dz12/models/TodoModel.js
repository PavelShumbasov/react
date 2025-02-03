import Realm from 'realm';

export class Todo extends Realm.Object {
    static schema = {
        name: 'Todo',
        properties: {
            id: 'int', 
            title: 'string', 
            completed: { type: 'bool', default: false }, // Статус завершения
        },
        primaryKey: 'id', 
    };
}
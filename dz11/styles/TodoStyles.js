import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    containerDark: {
        backgroundColor: '#121212',
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    todoItemDark: {
        borderBottomColor: '#444',
    },
    todoText: {
        fontSize: 18,
        color: '#000',
    },
    todoTextDark: {
        color: '#fff',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    checkbox: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderColor: '#888',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    checkedCheckbox: {
        backgroundColor: '#4CAF50',
        borderColor: '#4CAF50',
    },
    themeButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
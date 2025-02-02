import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    todoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    todoText: {
        fontSize: 18,
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
});

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: 'black'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        width: '100%',
        maxWidth: 1024,
        marginHorizontal: 'auto',
        pointerEvents: 'auto'
    },
    input: {
        flex: 1,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        fontSize: 18,
        minWidth: 0,
        color: 'white'
    },
    addButton: {
        backgroundColor: 'blue',
        borderRadius: 5,
        padding: 10
    },
    addButtonText: {
        fontSize: 18,
        color: 'white'
    },
    todoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 4,
        padding: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        width: '100%',
        maxWidth: 1024,
        marginHorizontal: 'auto',
        pointerEvents: 'auto'
    },
    todoText: {
        flex: 1,
        fontSize: 18,
        color: 'white'
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: 'gray'
    }
})

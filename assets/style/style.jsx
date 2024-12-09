import { StyleSheet } from "react-native";

export function createIndexStyles(theme, colorScheme) { 
    return StyleSheet.create({
        container :{
            flex: 1,
            backgroundColor: theme.background
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
            color: theme.text
        },
        addButton: {
            backgroundColor: theme.button,
            borderRadius: 5,
            padding: 10
        },
        addButtonText: {
            fontSize: 18,
            color: colorScheme === 'dark' ? 'black' : 'white'
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
            color: theme.text
        },
        completedText: {
            textDecorationLine: 'line-through',
            color: 'gray'
        },
        themeIcon: {
            marginLeft: 10
        }
    })
}

export function createShowStyles(theme, colorScheme){
    return StyleSheet.create({
        container:{
            flex: 1,
            width: '100%',
            backgroundColor: theme.background
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            gap: 6,
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
            color: theme.text
        },
        saveButton: {
            backgroundColor: 'green',
            borderRadius: 5,
            padding: 10
        },
        saveButtonText: {
            fontSize: 18,
            color: colorScheme === 'dark' ? 'black' : 'white',
        }
    })
}

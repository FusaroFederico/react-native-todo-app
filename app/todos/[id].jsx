import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";

import { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

import { createShowStyles } from "@/assets/style/style";

export default function EditScreen() {
    const { id } = useLocalSearchParams()
    const [todo, setTodo] = useState({})
    const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
    const router = useRouter()

    const styles = createShowStyles(theme, colorScheme)

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const jsonValue = await AsyncStorage.getItem("TodoApp")
                const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

                if (storageTodos && storageTodos.length) {
                    const actTodo = storageTodos.find(todo => todo.id.toString() === id)
                    setTodo(actTodo)
                }
            } catch (e){
                console.error(e)
            }
        }

        fetchData(id)

    }, [id])

    const saveTodo = async () => {
        try{
            const savedTodo = { ...todo, title: todo.title }

            const jsonValue = await AsyncStorage.getItem('TodoApp')
            const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;

            if (storageTodos && storageTodos.length) {
                    const otherTodos = storageTodos.filter( todo => todo.id !== savedTodo.id)
                    const allTodos = [...otherTodos, savedTodo]
                    await AsyncStorage.setItem('TodoApp', JSON.stringify(allTodos))
            } else {
                await AsyncStorage.setItem('TodoApp', JSON.stringify([savedTodo]))
            }

            router.push('/')
        } catch(e){
            console.error(e)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    maxLength={30}
                    placeholder="Modifica titolo"
                    placeholderTextColor= 'gray'
                    value={todo?.title || ''}
                    onChangeText={(text) => setTodo(prev => ({ ...prev, title: text }))}
                />
                <Pressable 
                    onPress={() => setColorScheme(colorScheme === 'light' ? 'dark' : 'light')}
                    style={styles.themeIcon}>
                    {colorScheme === 'dark' 
                        ? <Octicons name="moon" size={36} color={theme.text}
                        selectable={undefined} style={{ width: 36 }}/>
                        : <Octicons name="sun" size={36} color={theme.text}
                        selectable={undefined} style={{ width: 36 }}/>
                    }
                </Pressable>
            </View>
            <View style={styles.inputContainer}>
                <Pressable
                    onPress={saveTodo}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Salva</Text>
                </Pressable>
                <Pressable
                    onPress={() => router.push('/')}
                    style={[styles.saveButton, { backgroundColor: 'red'}]}
                >
                    <Text style={[styles.saveButtonText, { color: 'white'}]}>Annulla</Text>
                </Pressable>
            </View>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'}/>
        </SafeAreaView>
    )
}
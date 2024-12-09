import { Text, View, TextInput, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "@/context/ThemeContext";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons'
import Animated, { LinearTransition } from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import AsyncStorage from '@react-native-async-storage/async-storage'

import { data } from "@/data/todos"
import { createIndexStyles } from "@/assets/style/style";

export default function Index() {
const [todos, setTodos] = useState([]);
const [text, setText] = useState('');

const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
const styles = createIndexStyles(theme, colorScheme);

const router = useRouter();

// load data
useEffect(() => {
  const fetchData = async () => {
    try{
      const jsonValue = await AsyncStorage.getItem("TodoApp")
      const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null

      if (storageTodos && storageTodos.length) {
        setTodos(storageTodos.sort((a,b) => b.id - a.id))
      } else {
        setTodos(data.sort((a,b) => b.id - a.id))
      }
    } catch (e) {
      console.error(e)
    }
  }

  fetchData()
}, [data])

// save data
useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos)
        await AsyncStorage.setItem("TodoApp", jsonValue)
      } catch(e) {
        console.error(e)
      }
    }

    storeData()
}, [todos])

const addTodo = () => {
  if (text.trim()) {
    const newId = todos.length > 0 ? todos[0] + 1 : 1;
    setTodos([{ id: newId, title: text, completed: false}, ...todos]);
    setText('');
  }
};

const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ))
};

const removeTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id))
};

const handlePress = (id) => {
  router.push(`/todos/${id}`)
}

const renderItem = ({ item }) => (
  <View style={styles.todoItem}>
    <Pressable
      onPress={() => handlePress(item.id)}
      onLongPress={() => toggleTodo(item.id)}
    >
        <Text 
          style={[styles.todoText, item.completed && styles.completedText]}
         >
          {item.title}
        </Text>
    </Pressable>
    <Pressable onPress={() => removeTodo(item.id)}>
      <MaterialCommunityIcons name="delete-circle" size={24} color="red" selectable={undefined}/>
    </Pressable>
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
            style={styles.input}
            maxLength={30}
            placeholder="Aggiungi un nuovo todo"
            placeholderTextColor= "gray"
            value={text}
            onChangeText={setText}
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Text style={styles.addButtonText}>Aggiungi</Text>
        </Pressable>
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
      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode="on-drag"
        >
      </Animated.FlatList>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'}></StatusBar>
    </SafeAreaView>
  );
}

import { Text, View, TextInput, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons'

import { data } from "@/data/todos"
import { createStyles } from "@/assets/style/style";

export default function Index() {
const [todos, setTodos] = useState(data.sort((a,b) => b.id - a.id));
const [text, setText] = useState('');

const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
const styles = createStyles(theme, colorScheme);

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

const renderItem = ({ item }) => (
  <View style={styles.todoItem}>
    <Text 
      style={[styles.todoText, item.completed && styles.completedText]}
      onPress={() => toggleTodo(item.id)}
    >
      {item.title}
    </Text>
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
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => todo.id}
        contentContainerStyle={{ flexGrow: 1 }}>
      </FlatList>
    </SafeAreaView>
  );
}

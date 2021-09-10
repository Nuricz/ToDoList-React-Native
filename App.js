import { Alert, Text, FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import axios from 'axios';
import Header from "./components/Header";
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import ViewTodo from './components/ViewTodo';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default function App() {
  const [todos, setTodos] = useState([]);
  const [actual, setActual] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [id_count, setIdCount] = useState(0);
  const [openTodo, setOpenTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  function incId() {
    setIdCount(id_count + 1);
  }

  function getTodoByID(todo_id) {
    return todos.find((todo) => todo.id = todo_id);
  }

  function openViewTodo(todo_id) {
    setSelectedTodo(todo_id);
    setOpenTodo(true);
  }

  async function getData() {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      );
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const pressHandler = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.id != id);
    })
  }

  async function handleSubmit(todo) {
    if (todo.title != '') {
      try {
        const response = await axios.post(
          'https://jsonplaceholder.typicode.com/todos',
          todo
        );
        setTodos((prev) => {
          const new_todo = response.data;
          new_todo.id = new_todo.id + id_count;
          incId();
          return [new_todo, ...prev];
        });

      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Oops", "Debe agregar un titulo", [
        { text: 'Entendido', onPress: () => console.log('alert closed') }
      ])
      return (null);
    }
  }

  async function handleDelete(todo_id) {
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todo_id}`
      );

      setTodos((prev) => {
        return prev.filter((each) => each.id !== todo_id);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function editTodo(todo) {
    if (todo.title != '') {
      try {

        const response = await axios.patch(
          `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
          todo
        );

        setTodos((prev) => {
          return prev.map((each) => {
            if (each.id === todo.id) {
              return {
                ...response.data,
              };
            } else return each;
          });
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Oops", "Debe agregar un titulo", [
        { text: 'Entendido', onPress: () => console.log('alert closed') }
      ])
      return (null);
    }
    setActual(null);
  }

  async function handleEdit(todo) {
    setActual(todo);
    setModalVisible(true);
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <TouchableOpacity style={styles.addTodoButton} title="Agregar tarea" onPress={() => setModalVisible(true)}>
            <Text style={styles.textAddTodoButton}> Agregar tarea</Text>
          </TouchableOpacity>
          <AddTodo handleSubmit={handleSubmit} actual={actual} modalVisible={modalVisible} setModalVisible={setModalVisible} editTodo={editTodo} setActual={setActual} />
          <ViewTodo openTodo={openTodo} setOpenTodo={setOpenTodo} todo={selectedTodo} getTodoByID={getTodoByID} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} handleDelete={handleDelete} openViewTodo={openViewTodo} handleEdit={handleEdit}></TodoItem>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
  addTodoButton: {
    backgroundColor: 'coral',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textAddTodoButton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

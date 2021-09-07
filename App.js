import { Alert, Button, FlatList, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Header from "./components/Header";
import TodoItem from './components/TodoItem';
import AddTodo from './components/AddTodo';
import ModalTodo from './components/Modal';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [actual, setActual] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      );
      setTodos(response.data);
      setLoading(false);
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
          return [response.data, ...prev];
        });

      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Oops", "Debe agregar un titulo", [
        { text: 'Entendido', onPress: () => console.log('alert closed') }
      ])
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
    try {
      setLoading(true);

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

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEdit(todo) {
    setActual(todo);
    setModal(true);
  }

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <ModalTodo modalVisible={modalVisible} setModalVisible={setModalVisible} />
          <Button title="Agregar tarea" onPress={() => setModalVisible(true)}/>
          <AddTodo handleSubmit={handleSubmit} actual={actual} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} handleDelete={handleDelete}></TodoItem>
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  }
})

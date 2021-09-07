import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View, Switch } from 'react-native';

export default function AddTodo({ handleSubmit }) {


  const todo = {
    title,
    completed,
    id: null,
  };

  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const changeHandler = (val) => {
    setTitle(val);
  }
  const toggleSwitch = () => setCompleted(previousState => !previousState);

  return (
    <View style={styles.formContainer}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='New todo.. '
          onChangeText={changeHandler}
        />
        <Switch
          trackColor={{ false: "#ababab", true: "coral" }}
          thumbColor="#f4f3f4"
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={completed}
        />
      </View>
      <Button onPress={() => handleSubmit({ title: title, completed: false, id: null })} title='Add todo' color='coral' />
    </View>

  )
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  form: {
    flexDirection: 'row',
  },
  formContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  }
})
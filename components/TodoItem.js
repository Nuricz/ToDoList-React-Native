import React from "react";
import { StyleSheet, Text, TouchableOpacity, Button } from 'react-native';

export default function TodoItem({ item, handleDelete, openViewTodo }) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => openViewTodo(item)}>
      <Text>{item.title}</Text>
      <Button title='Borrar' onPress={() => handleDelete(item.id)} color="red"></Button>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 10,
  }
})